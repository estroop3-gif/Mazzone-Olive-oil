from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import products, orders, customers, subscriptions, blog, inventory, webhooks, events

app = FastAPI(
    title="Mazzone Olive Oil API",
    description="Dal cuore della Sicilia, alla tua tavola.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router, prefix="/api/v1")
app.include_router(orders.router, prefix="/api/v1")
app.include_router(customers.router, prefix="/api/v1")
app.include_router(subscriptions.router, prefix="/api/v1")
app.include_router(blog.router, prefix="/api/v1")
app.include_router(inventory.router, prefix="/api/v1")
app.include_router(webhooks.router, prefix="/api/v1")
app.include_router(events.router, prefix="/api/v1")


@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "mazzone-olive-oil-api"}
