from fastapi import APIRouter, HTTPException
from app.db import get_supabase
from app.models.schemas import CustomerProfile, CustomerUpdate, Address, AddressCreate

router = APIRouter(prefix="/customers", tags=["customers"])


@router.get("/{customer_id}", response_model=CustomerProfile)
async def get_customer(customer_id: str):
    result = (
        get_supabase().table("customers").select("*").eq("id", customer_id).execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Customer not found")
    return result.data[0]


@router.patch("/{customer_id}", response_model=CustomerProfile)
async def update_customer(customer_id: str, updates: CustomerUpdate):
    data = updates.model_dump(exclude_none=True)
    result = (
        get_supabase().table("customers").update(data).eq("id", customer_id).execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Customer not found")
    return result.data[0]


@router.get("/{customer_id}/addresses", response_model=list[Address])
async def list_addresses(customer_id: str):
    result = (
        get_supabase()
        .table("addresses")
        .select("*")
        .eq("customer_id", customer_id)
        .execute()
    )
    return result.data


@router.post("/{customer_id}/addresses", response_model=Address, status_code=201)
async def create_address(customer_id: str, address: AddressCreate):
    data = address.model_dump()
    data["customer_id"] = customer_id
    result = get_supabase().table("addresses").insert(data).execute()
    return result.data[0]
