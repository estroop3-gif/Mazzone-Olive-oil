from fastapi import APIRouter, Request, HTTPException
import stripe
from app.config import settings
from app.db import get_supabase

router = APIRouter(prefix="/webhooks", tags=["webhooks"])

stripe.api_key = settings.STRIPE_SECRET_KEY


@router.post("/stripe")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.error.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid signature")

    db = get_supabase()

    if event["type"] == "payment_intent.succeeded":
        pi = event["data"]["object"]
        # Mark order as paid
        db.table("orders").update({"status": "paid"}).eq(
            "stripe_payment_intent_id", pi["id"]
        ).execute()

    elif event["type"] == "invoice.payment_succeeded":
        invoice = event["data"]["object"]
        sub_id = invoice.get("subscription")
        if sub_id:
            db.table("subscriptions").update({"status": "active"}).eq(
                "stripe_subscription_id", sub_id
            ).execute()

    elif event["type"] == "customer.subscription.deleted":
        sub = event["data"]["object"]
        db.table("subscriptions").update({"status": "cancelled"}).eq(
            "stripe_subscription_id", sub["id"]
        ).execute()

    return {"received": True}
