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

/* ── Wholesale Portal ──────────────────────────────────── */

export interface WholesaleAccount {
  id: string;
  business_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  tax_id: string;
  payment_terms: "net_15" | "net_30" | "net_60" | "prepaid";
  account_status: "active" | "suspended" | "pending";
  rep_name: string;
  rep_email: string;
  rep_phone: string;
  shipping_address: Address;
  billing_address: Address;
  created_at: string;
}

export interface WholesalePriceTier {
  min_qty: number;
  max_qty: number | null;
  label: string;
  discount_pct: number;
}

export interface WholesaleOrderItem {
  id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  case_qty: number;
  unit_price_cents: number;
  line_total_cents: number;
}

export interface WholesaleOrder {
  id: string;
  account_id: string;
  po_number: string;
  status: "draft" | "submitted" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  items: WholesaleOrderItem[];
  subtotal_cents: number;
  shipping_cents: number;
  tax_cents: number;
  total_cents: number;
  tracking_number?: string | null;
  tracking_events: TrackingEvent[];
  delivery_notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface WholesaleFAQ {
  question: string;
  answer: string;
}

/* ── Employee Portal ───────────────────────────────────── */

export type EmployeeDepartment = "production" | "sales" | "operations" | "tasting_room" | "admin";

export interface Employee {
  id: string;
  full_name: string;
  role: string;
  department: EmployeeDepartment;
  email: string;
  phone: string;
  hire_date: string;
  is_active: boolean;
}

export interface TimeEntry {
  id: string;
  date: string;
  clock_in: string;
  clock_out: string | null;
  break_minutes: number;
  total_hours: number;
}

export interface Timecard {
  id: string;
  employee_id: string;
  week_start: string;
  week_end: string;
  status: "draft" | "submitted" | "approved" | "rejected";
  entries: TimeEntry[];
  total_hours: number;
  submitted_at?: string | null;
}

export interface PTOBalance {
  type: "vacation" | "sick" | "personal";
  accrued_hours: number;
  used_hours: number;
  available_hours: number;
}

export interface PTORequest {
  id: string;
  type: "vacation" | "sick" | "personal";
  start_date: string;
  end_date: string;
  hours: number;
  status: "pending" | "approved" | "rejected";
  notes?: string | null;
  created_at: string;
}

export interface Shift {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  department: EmployeeDepartment;
  location: string;
}

export interface PayStub {
  id: string;
  period_start: string;
  period_end: string;
  pay_date: string;
  gross_cents: number;
  deductions_cents: number;
  taxes_cents: number;
  net_cents: number;
  hours: number;
  overtime_hours: number;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  author: string;
  priority: "normal" | "important" | "urgent";
  created_at: string;
}
