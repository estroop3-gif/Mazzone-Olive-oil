from fastapi import APIRouter, HTTPException
from app.db import get_supabase
from app.models.schemas import Order, OrderCreate, OrderStatusUpdate

router = APIRouter(prefix="/orders", tags=["orders"])


@router.post("", response_model=Order, status_code=201)
async def create_order(order: OrderCreate, customer_id: str):
    db = get_supabase()

    # Calculate totals from product prices
    subtotal = 0
    order_items = []
    for item in order.items:
        product = db.table("products").select("*").eq("id", item.product_id).execute()
        if not product.data:
            raise HTTPException(status_code=400, detail=f"Product {item.product_id} not found")
        p = product.data[0]
        line_total = p["price_cents"] * item.quantity
        subtotal += line_total
        order_items.append({
            "product_id": item.product_id,
            "product_name": p["name"],
            "quantity": item.quantity,
            "price_cents": p["price_cents"],
        })

    shipping_cents = 0 if subtotal >= 7500 else 995  # Free shipping over $75
    tax_cents = int(subtotal * 0.08)  # ~8% tax estimate
    total_cents = subtotal + shipping_cents + tax_cents

    # Create order
    order_data = {
        "customer_id": customer_id,
        "subtotal_cents": subtotal,
        "shipping_cents": shipping_cents,
        "tax_cents": tax_cents,
        "total_cents": total_cents,
        "shipping_address_id": order.shipping_address_id,
        "billing_address_id": order.billing_address_id,
        "notes": order.notes,
    }
    result = db.table("orders").insert(order_data).execute()
    order_id = result.data[0]["id"]

    # Create order items
    for item in order_items:
        item["order_id"] = order_id
    db.table("order_items").insert(order_items).execute()

    # Return full order
    return {**result.data[0], "items": order_items}


@router.get("/{order_id}", response_model=Order)
async def get_order(order_id: str):
    db = get_supabase()
    order = db.table("orders").select("*").eq("id", order_id).execute()
    if not order.data:
        raise HTTPException(status_code=404, detail="Order not found")
    items = db.table("order_items").select("*").eq("order_id", order_id).execute()
    return {**order.data[0], "items": items.data}


@router.get("/customer/{customer_id}")
async def list_customer_orders(customer_id: str):
    result = (
        get_supabase()
        .table("orders")
        .select("*")
        .eq("customer_id", customer_id)
        .order("created_at", desc=True)
        .execute()
    )
    return result.data


@router.patch("/{order_id}/status", response_model=Order)
async def update_order_status(order_id: str, update: OrderStatusUpdate):
    db = get_supabase()
    data = {"status": update.status}
    if update.tracking_number:
        data["tracking_number"] = update.tracking_number
    result = db.table("orders").update(data).eq("id", order_id).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Order not found")
    items = db.table("order_items").select("*").eq("order_id", order_id).execute()
    return {**result.data[0], "items": items.data}
