from fastapi import APIRouter, HTTPException
import stripe
from app.config import settings
from app.db import get_supabase
from app.models.schemas import Subscription, SubscriptionCreate

router = APIRouter(prefix="/subscriptions", tags=["subscriptions"])

stripe.api_key = settings.STRIPE_SECRET_KEY

PLAN_PRICES = {
    "monthly_single": "price_monthly_single",  # Replace with real Stripe price IDs
    "monthly_duo": "price_monthly_duo",
    "quarterly_collection": "price_quarterly_collection",
}


@router.post("", response_model=Subscription, status_code=201)
async def create_subscription(sub: SubscriptionCreate, customer_id: str):
    if sub.plan not in PLAN_PRICES:
        raise HTTPException(status_code=400, detail="Invalid plan")

    # In production, create Stripe subscription here
    data = {
        "customer_id": customer_id,
        "plan": sub.plan,
        "status": "active",
    }
    result = get_supabase().table("subscriptions").insert(data).execute()
    return result.data[0]


@router.get("/customer/{customer_id}", response_model=list[Subscription])
async def list_subscriptions(customer_id: str):
    result = (
        get_supabase()
        .table("subscriptions")
        .select("*")
        .eq("customer_id", customer_id)
        .execute()
    )
    return result.data


@router.post("/{sub_id}/pause")
async def pause_subscription(sub_id: str):
    result = (
        get_supabase()
        .table("subscriptions")
        .update({"status": "paused"})
        .eq("id", sub_id)
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Subscription not found")
    return {"status": "paused"}


@router.post("/{sub_id}/resume")
async def resume_subscription(sub_id: str):
    result = (
        get_supabase()
        .table("subscriptions")
        .update({"status": "active"})
        .eq("id", sub_id)
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Subscription not found")
    return {"status": "active"}


@router.post("/{sub_id}/cancel")
async def cancel_subscription(sub_id: str):
    from datetime import datetime

    result = (
        get_supabase()
        .table("subscriptions")
        .update({"status": "cancelled", "cancelled_at": datetime.utcnow().isoformat()})
        .eq("id", sub_id)
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Subscription not found")
    return {"status": "cancelled"}
