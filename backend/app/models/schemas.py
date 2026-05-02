from pydantic import BaseModel
from datetime import datetime
from typing import Optional


# --- Products ---

class TastingNotes(BaseModel):
    aroma: str = ""
    flavor: str = ""
    finish: str = ""


class ProductBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    short_description: Optional[str] = None
    price_cents: int
    compare_price_cents: Optional[int] = None
    category: str  # oil, vinegar, pantry, wellness, home, gift_set
    subcategory: Optional[str] = None
    tags: Optional[list[str]] = None
    size_ml: Optional[int] = None
    origin: Optional[str] = None
    harvest_year: Optional[int] = None
    tasting_notes: Optional[TastingNotes] = None
    image_url: Optional[str] = None
    gallery_urls: Optional[list[str]] = None
    stock_quantity: int = 0
    is_featured: bool = False
    is_active: bool = True


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    short_description: Optional[str] = None
    price_cents: Optional[int] = None
    compare_price_cents: Optional[int] = None
    size_ml: Optional[int] = None
    tasting_notes: Optional[TastingNotes] = None
    image_url: Optional[str] = None
    gallery_urls: Optional[list[str]] = None
    stock_quantity: Optional[int] = None
    is_featured: Optional[bool] = None
    is_active: Optional[bool] = None


class Product(ProductBase):
    id: str
    created_at: datetime
    updated_at: datetime


# --- Orders ---

class OrderItemCreate(BaseModel):
    product_id: str
    quantity: int


class OrderCreate(BaseModel):
    items: list[OrderItemCreate]
    shipping_address_id: Optional[str] = None
    billing_address_id: Optional[str] = None
    notes: Optional[str] = None


class OrderItem(BaseModel):
    id: str
    product_id: str
    product_name: str
    quantity: int
    price_cents: int


class Order(BaseModel):
    id: str
    customer_id: str
    status: str
    subtotal_cents: int
    shipping_cents: int
    tax_cents: int
    total_cents: int
    items: list[OrderItem] = []
    tracking_number: Optional[str] = None
    notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime


class OrderStatusUpdate(BaseModel):
    status: str
    tracking_number: Optional[str] = None


# --- Customers ---

class AddressCreate(BaseModel):
    type: str  # shipping, billing
    line1: str
    line2: Optional[str] = None
    city: str
    state: Optional[str] = None
    postal_code: str
    country: str = "US"
    is_default: bool = False


class Address(AddressCreate):
    id: str
    customer_id: str
    created_at: datetime


class CustomerProfile(BaseModel):
    id: str
    full_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    created_at: datetime


class CustomerUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None


# --- Subscriptions ---

class SubscriptionCreate(BaseModel):
    plan: str  # monthly_single, monthly_duo, quarterly_collection


class Subscription(BaseModel):
    id: str
    customer_id: str
    plan: str
    status: str
    stripe_subscription_id: Optional[str] = None
    current_period_start: Optional[datetime] = None
    current_period_end: Optional[datetime] = None
    created_at: datetime
    cancelled_at: Optional[datetime] = None


# --- Blog ---

class BlogPostCreate(BaseModel):
    title: str
    slug: str
    content: Optional[str] = None
    excerpt: Optional[str] = None
    image_url: Optional[str] = None
    category: Optional[str] = None  # recipes, pairings, farm_life, culture
    is_published: bool = False


class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    image_url: Optional[str] = None
    category: Optional[str] = None
    is_published: Optional[bool] = None


class BlogPost(BaseModel):
    id: str
    title: str
    slug: str
    content: Optional[str] = None
    excerpt: Optional[str] = None
    image_url: Optional[str] = None
    category: Optional[str] = None
    author_name: str
    is_published: bool
    published_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime


# --- Inventory ---

class InventoryAdjustment(BaseModel):
    product_id: str
    change_quantity: int
    reason: Optional[str] = None


class StockLevel(BaseModel):
    product_id: str
    product_name: str
    stock_quantity: int
    is_low: bool  # below threshold


# --- Events ---

class EventBase(BaseModel):
    title: str
    slug: str
    description: Optional[str] = None
    short_description: Optional[str] = None
    date: str  # YYYY-MM-DD
    time: Optional[str] = None  # HH:MM
    end_time: Optional[str] = None
    location: Optional[str] = None
    event_type: str  # wine_tasting, cooking_class, language_class, private_event, market, other
    image_url: Optional[str] = None
    capacity: Optional[int] = None
    price_cents: int = 0
    is_active: bool = True
    is_featured: bool = False


class EventCreate(EventBase):
    pass


class EventUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    short_description: Optional[str] = None
    date: Optional[str] = None
    time: Optional[str] = None
    end_time: Optional[str] = None
    location: Optional[str] = None
    event_type: Optional[str] = None
    image_url: Optional[str] = None
    capacity: Optional[int] = None
    price_cents: Optional[int] = None
    is_active: Optional[bool] = None
    is_featured: Optional[bool] = None


class Event(EventBase):
    id: str
    created_at: datetime
    updated_at: datetime


# --- Newsletter ---

class NewsletterSubscribe(BaseModel):
    email: str
    first_name: Optional[str] = None
