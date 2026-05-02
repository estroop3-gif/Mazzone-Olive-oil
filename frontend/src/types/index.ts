export interface TastingNotes {
  aroma: string;
  flavor: string;
  finish: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  short_description?: string | null;
  price_cents: number;
  compare_price_cents?: number | null;
  category: "oil" | "vinegar" | "pantry" | "wellness" | "home" | "gift_set";
  subcategory?: string | null;
  tags?: string[] | null;
  size_ml?: number | null;
  origin?: string | null;
  harvest_year?: number | null;
  tasting_notes?: TastingNotes | null;
  image_url?: string | null;
  gallery_urls?: string[] | null;
  stock_quantity: number;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price_cents: number;
}

export interface Order {
  id: string;
  customer_id: string;
  status: "pending" | "paid" | "processing" | "shipped" | "delivered" | "cancelled";
  subtotal_cents: number;
  shipping_cents: number;
  tax_cents: number;
  total_cents: number;
  items: OrderItem[];
  tracking_number?: string | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  customer_id: string;
  plan: "monthly_single" | "monthly_duo" | "quarterly_collection";
  status: "active" | "paused" | "cancelled";
  stripe_subscription_id?: string | null;
  current_period_start?: string | null;
  current_period_end?: string | null;
  created_at: string;
  cancelled_at?: string | null;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content?: string | null;
  excerpt?: string | null;
  image_url?: string | null;
  category?: "recipes" | "italian_culture" | "from_the_grove" | "local" | null;
  author_name: string;
  is_published: boolean;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CustomerProfile {
  id: string;
  full_name?: string | null;
  email?: string | null;
  phone?: string | null;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  short_description?: string | null;
  date: string;
  time?: string | null;
  end_time?: string | null;
  location?: string | null;
  event_type: "wine_tasting" | "cooking_class" | "language_class" | "private_event" | "market" | "other";
  image_url?: string | null;
  capacity?: number | null;
  price_cents: number;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Address {
  id: string;
  customer_id: string;
  type: "shipping" | "billing";
  line1: string;
  line2?: string | null;
  city: string;
  state?: string | null;
  postal_code: string;
  country: string;
  is_default: boolean;
  created_at: string;
}

export interface TrackingEvent {
  status: string;
  description: string;
  date: string;
  location?: string;
}

export interface Episode {
  id: string;
  title: string;
  description: string;
  season: number;
  episode_number: number;
  duration_minutes: number;
  status: "draft" | "published" | "scheduled";
  is_featured: boolean;
  published_at?: string | null;
  thumbnail_url?: string | null;
  video_url?: string | null;
  category?: string;
}

export interface MediaSubscription {
  id: string;
  customer_id: string;
  status: "active" | "cancelled" | "past_due";
  plan: "monthly" | "annual";
  price_cents: number;
  current_period_start: string;
  current_period_end: string;
}

export interface CommunityThread {
  id: string;
  category: "recipes" | "tasting_notes" | "pairings" | "general";
  title: string;
  body: string;
  author_name: string;
  reply_count: number;
  is_pinned: boolean;
  created_at: string;
}

export interface CommunityReply {
  id: string;
  thread_id: string;
  body: string;
  author_name: string;
  created_at: string;
}

export interface EventRegistration {
  id: string;
  event_id: string;
  event_title: string;
  event_date: string;
  event_location?: string;
  registered_at: string;
  status: "confirmed" | "waitlisted" | "cancelled";
}
