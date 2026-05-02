from fastapi import APIRouter, HTTPException
from app.db import get_supabase
from app.models.schemas import InventoryAdjustment, StockLevel

router = APIRouter(prefix="/inventory", tags=["inventory"])

LOW_STOCK_THRESHOLD = 10


@router.get("/levels", response_model=list[StockLevel])
async def get_stock_levels():
    result = (
        get_supabase()
        .table("products")
        .select("id, name, stock_quantity")
        .eq("is_active", True)
        .order("stock_quantity")
        .execute()
    )
    return [
        {
            "product_id": p["id"],
            "product_name": p["name"],
            "stock_quantity": p["stock_quantity"],
            "is_low": p["stock_quantity"] < LOW_STOCK_THRESHOLD,
        }
        for p in result.data
    ]


@router.get("/low-stock", response_model=list[StockLevel])
async def get_low_stock():
    result = (
        get_supabase()
        .table("products")
        .select("id, name, stock_quantity")
        .eq("is_active", True)
        .lt("stock_quantity", LOW_STOCK_THRESHOLD)
        .order("stock_quantity")
        .execute()
    )
    return [
        {
            "product_id": p["id"],
            "product_name": p["name"],
            "stock_quantity": p["stock_quantity"],
            "is_low": True,
        }
        for p in result.data
    ]


@router.post("/adjust")
async def adjust_inventory(adjustment: InventoryAdjustment):
    db = get_supabase()

    # Get current stock
    product = (
        db.table("products")
        .select("stock_quantity")
        .eq("id", adjustment.product_id)
        .execute()
    )
    if not product.data:
        raise HTTPException(status_code=404, detail="Product not found")

    new_qty = product.data[0]["stock_quantity"] + adjustment.change_quantity
    if new_qty < 0:
        raise HTTPException(status_code=400, detail="Insufficient stock")

    # Update product stock
    db.table("products").update({"stock_quantity": new_qty}).eq(
        "id", adjustment.product_id
    ).execute()

    # Log the adjustment
    db.table("inventory_log").insert(
        {
            "product_id": adjustment.product_id,
            "change_quantity": adjustment.change_quantity,
            "reason": adjustment.reason,
        }
    ).execute()

    return {"product_id": adjustment.product_id, "new_quantity": new_qty}
