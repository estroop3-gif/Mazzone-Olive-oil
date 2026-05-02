from fastapi import APIRouter, HTTPException
from app.db import get_supabase
from app.models.schemas import Product, ProductCreate, ProductUpdate

router = APIRouter(prefix="/products", tags=["products"])


@router.get("", response_model=list[Product])
async def list_products(
    category: str | None = None,
    featured: bool | None = None,
    active_only: bool = True,
):
    query = get_supabase().table("products").select("*")
    if active_only:
        query = query.eq("is_active", True)
    if category:
        query = query.eq("category", category)
    if featured is not None:
        query = query.eq("is_featured", featured)
    result = query.order("created_at", desc=True).execute()
    return result.data


@router.get("/{slug}", response_model=Product)
async def get_product(slug: str):
    result = (
        get_supabase().table("products").select("*").eq("slug", slug).execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Product not found")
    return result.data[0]


@router.post("", response_model=Product, status_code=201)
async def create_product(product: ProductCreate):
    data = product.model_dump(exclude_none=True)
    if data.get("tasting_notes"):
        data["tasting_notes"] = product.tasting_notes.model_dump()
    result = get_supabase().table("products").insert(data).execute()
    return result.data[0]


@router.patch("/{product_id}", response_model=Product)
async def update_product(product_id: str, updates: ProductUpdate):
    data = updates.model_dump(exclude_none=True)
    if "tasting_notes" in data and data["tasting_notes"]:
        data["tasting_notes"] = updates.tasting_notes.model_dump()
    result = (
        get_supabase().table("products").update(data).eq("id", product_id).execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Product not found")
    return result.data[0]
