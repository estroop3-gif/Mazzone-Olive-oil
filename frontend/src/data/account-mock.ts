import type { Order, Subscription, Address, TrackingEvent, CommunityThread, CommunityReply, EventRegistration } from "@/types";

export const MOCK_ORDERS: (Order & { tracking_events: TrackingEvent[] })[] = [
  {
    id: "ord-001",
    customer_id: "cust-1",
    status: "delivered",
    subtotal_cents: 8400,
    shipping_cents: 0,
    tax_cents: 672,
    total_cents: 9072,
    items: [
      { id: "li-1", product_id: "nocellara-500", product_name: "Nocellara EVOO 500ml", quantity: 2, price_cents: 3200 },
      { id: "li-2", product_id: "biancolilla-250", product_name: "Biancolilla EVOO 250ml", quantity: 1, price_cents: 2000 },
    ],
    tracking_number: "1Z999AA10123456784",
    created_at: "2026-04-10T14:30:00Z",
    updated_at: "2026-04-15T09:00:00Z",
    tracking_events: [
      { status: "ordered", description: "Order placed", date: "2026-04-10T14:30:00Z" },
      { status: "processing", description: "Preparing your order", date: "2026-04-11T08:00:00Z" },
      { status: "shipped", description: "Shipped via UPS Ground", date: "2026-04-12T10:15:00Z", location: "Brooklyn, NY" },
      { status: "in_transit", description: "In transit", date: "2026-04-13T16:00:00Z", location: "Newark, NJ" },
      { status: "delivered", description: "Delivered — left at front door", date: "2026-04-15T09:00:00Z", location: "Philadelphia, PA" },
    ],
  },
  {
    id: "ord-002",
    customer_id: "cust-1",
    status: "shipped",
    subtotal_cents: 12600,
    shipping_cents: 800,
    tax_cents: 1008,
    total_cents: 14408,
    items: [
      { id: "li-3", product_id: "gift-set-classic", product_name: "Classic Gift Set", quantity: 1, price_cents: 7500 },
      { id: "li-4", product_id: "aged-balsamic", product_name: "Aged Balsamic Vinegar", quantity: 2, price_cents: 2550 },
    ],
    tracking_number: "1Z999AA10123456785",
    created_at: "2026-04-22T11:00:00Z",
    updated_at: "2026-04-24T14:00:00Z",
    tracking_events: [
      { status: "ordered", description: "Order placed", date: "2026-04-22T11:00:00Z" },
      { status: "processing", description: "Preparing your order", date: "2026-04-23T08:00:00Z" },
      { status: "shipped", description: "Shipped via USPS Priority", date: "2026-04-24T14:00:00Z", location: "Brooklyn, NY" },
    ],
  },
  {
    id: "ord-003",
    customer_id: "cust-1",
    status: "processing",
    subtotal_cents: 4800,
    shipping_cents: 0,
    tax_cents: 384,
    total_cents: 5184,
    items: [
      { id: "li-5", product_id: "cerasuola-500", product_name: "Cerasuola EVOO 500ml", quantity: 1, price_cents: 3400 },
      { id: "li-6", product_id: "olive-soap", product_name: "Olive Oil Soap Bar", quantity: 2, price_cents: 700 },
    ],
    created_at: "2026-04-28T16:45:00Z",
    updated_at: "2026-04-29T08:00:00Z",
    tracking_events: [
      { status: "ordered", description: "Order placed", date: "2026-04-28T16:45:00Z" },
      { status: "processing", description: "Preparing your order", date: "2026-04-29T08:00:00Z" },
    ],
  },
  {
    id: "ord-004",
    customer_id: "cust-1",
    status: "delivered",
    subtotal_cents: 6400,
    shipping_cents: 800,
    tax_cents: 512,
    total_cents: 7712,
    items: [
      { id: "li-7", product_id: "nocellara-500", product_name: "Nocellara EVOO 500ml", quantity: 2, price_cents: 3200 },
    ],
    tracking_number: "1Z999AA10123456786",
    created_at: "2026-03-05T09:20:00Z",
    updated_at: "2026-03-10T11:00:00Z",
    tracking_events: [
      { status: "ordered", description: "Order placed", date: "2026-03-05T09:20:00Z" },
      { status: "processing", description: "Preparing your order", date: "2026-03-06T08:00:00Z" },
      { status: "shipped", description: "Shipped via UPS Ground", date: "2026-03-07T10:00:00Z", location: "Brooklyn, NY" },
      { status: "delivered", description: "Delivered", date: "2026-03-10T11:00:00Z", location: "Philadelphia, PA" },
    ],
  },
  {
    id: "ord-005",
    customer_id: "cust-1",
    status: "cancelled",
    subtotal_cents: 2000,
    shipping_cents: 800,
    tax_cents: 160,
    total_cents: 2960,
    items: [
      { id: "li-8", product_id: "biancolilla-250", product_name: "Biancolilla EVOO 250ml", quantity: 1, price_cents: 2000 },
    ],
    created_at: "2026-02-14T20:00:00Z",
    updated_at: "2026-02-15T08:00:00Z",
    tracking_events: [
      { status: "ordered", description: "Order placed", date: "2026-02-14T20:00:00Z" },
      { status: "cancelled", description: "Cancelled by customer", date: "2026-02-15T08:00:00Z" },
    ],
  },
];

export const MOCK_SUBSCRIPTION: Subscription & {
  price_cents: number;
  next_shipment_date: string;
  oil_preferences: string[];
  shipment_history: { id: string; date: string; items: string[]; status: string }[];
} = {
  id: "sub-001",
  customer_id: "cust-1",
  plan: "monthly_duo",
  status: "active",
  created_at: "2025-11-01T00:00:00Z",
  current_period_start: "2026-04-01T00:00:00Z",
  current_period_end: "2026-05-01T00:00:00Z",
  price_cents: 6200,
  next_shipment_date: "2026-05-08",
  oil_preferences: ["nocellara-500", "biancolilla-250", "cerasuola-500"],
  shipment_history: [
    { id: "sh-1", date: "2026-04-08", items: ["Nocellara EVOO 500ml", "Cerasuola EVOO 500ml"], status: "delivered" },
    { id: "sh-2", date: "2026-03-08", items: ["Nocellara EVOO 500ml", "Biancolilla EVOO 250ml"], status: "delivered" },
    { id: "sh-3", date: "2026-02-08", items: ["Nocellara EVOO 500ml", "Cerasuola EVOO 500ml"], status: "delivered" },
    { id: "sh-4", date: "2026-01-08", items: ["Biancolilla EVOO 250ml", "Cerasuola EVOO 500ml"], status: "delivered" },
  ],
};

export const MOCK_OIL_OPTIONS = [
  { id: "nocellara-500", name: "Nocellara EVOO 500ml", description: "Bold & peppery" },
  { id: "biancolilla-250", name: "Biancolilla EVOO 250ml", description: "Delicate & fruity" },
  { id: "cerasuola-500", name: "Cerasuola EVOO 500ml", description: "Herbaceous & balanced" },
  { id: "blend-harvest", name: "Harvest Blend 500ml", description: "Smooth & versatile" },
  { id: "lemon-infused", name: "Lemon Infused EVOO 250ml", description: "Bright & citrusy" },
  { id: "chili-infused", name: "Chili Infused EVOO 250ml", description: "Warm & spicy" },
];

export const MOCK_EVENT_REGISTRATIONS: EventRegistration[] = [
  {
    id: "reg-001",
    event_id: "evt-spring-tasting",
    event_title: "Spring Olive Oil Tasting",
    event_date: "2026-05-15T18:00:00Z",
    event_location: "Mazzone Tasting Room, Brooklyn",
    registered_at: "2026-04-20T10:00:00Z",
    status: "confirmed",
  },
  {
    id: "reg-002",
    event_id: "evt-pasta-class",
    event_title: "Sicilian Pasta Making Workshop",
    event_date: "2026-05-22T14:00:00Z",
    event_location: "Mazzone Kitchen, Brooklyn",
    registered_at: "2026-04-25T16:00:00Z",
    status: "confirmed",
  },
  {
    id: "reg-003",
    event_id: "evt-harvest-tour",
    event_title: "Sicily Harvest Tour 2026",
    event_date: "2026-10-01T09:00:00Z",
    event_location: "Mazzone Groves, Castelvetrano, Sicily",
    registered_at: "2026-03-10T12:00:00Z",
    status: "waitlisted",
  },
];

export const MOCK_BROWSE_EVENTS = [
  {
    id: "evt-summer-tasting",
    title: "Summer EVOO & Wine Pairing",
    date: "2026-06-12T18:00:00Z",
    location: "Mazzone Tasting Room, Brooklyn",
    price_cents: 4500,
    capacity: 24,
    spots_left: 8,
  },
  {
    id: "evt-italian-night",
    title: "Italian Language & Dinner Night",
    date: "2026-06-20T19:00:00Z",
    location: "Mazzone Kitchen, Brooklyn",
    price_cents: 6500,
    capacity: 16,
    spots_left: 3,
  },
  {
    id: "evt-kids-cooking",
    title: "Kids Cooking Class: Pizza & Focaccia",
    date: "2026-07-05T11:00:00Z",
    location: "Mazzone Kitchen, Brooklyn",
    price_cents: 3500,
    capacity: 12,
    spots_left: 12,
  },
];

export const MOCK_THREADS: CommunityThread[] = [
  {
    id: "thr-001",
    category: "recipes",
    title: "Best pasta aglio e olio with Nocellara?",
    body: "I've been experimenting with different finishing oils for aglio e olio. The Nocellara adds this incredible peppery kick at the end. Anyone else tried this? What's your technique?",
    author_name: "Marco R.",
    reply_count: 12,
    is_pinned: true,
    created_at: "2026-04-28T10:00:00Z",
  },
  {
    id: "thr-002",
    category: "tasting_notes",
    title: "2025 vs 2024 harvest — anyone notice the difference?",
    body: "Just got my April shipment and the Cerasuola tastes different from last year. More herbaceous, less bitter. Is it just me?",
    author_name: "Sarah L.",
    reply_count: 8,
    is_pinned: false,
    created_at: "2026-04-25T14:30:00Z",
  },
  {
    id: "thr-003",
    category: "pairings",
    title: "EVOO + vanilla ice cream. Trust me.",
    body: "I know it sounds wild, but drizzle a little Biancolilla over good vanilla gelato. The fruitiness plays off the cream beautifully. You're welcome.",
    author_name: "Chef Antonio M.",
    reply_count: 23,
    is_pinned: false,
    created_at: "2026-04-20T09:15:00Z",
  },
  {
    id: "thr-004",
    category: "general",
    title: "Shipping to Canada?",
    body: "Has anyone ordered from Canada? Wondering about customs duties and shipping times.",
    author_name: "David K.",
    reply_count: 5,
    is_pinned: false,
    created_at: "2026-04-18T16:00:00Z",
  },
  {
    id: "thr-005",
    category: "recipes",
    title: "Olive oil cake recipe that actually works",
    body: "After 6 failed attempts I finally nailed it. The secret: use the Biancolilla (milder flavor) and don't overmix. Happy to share the full recipe if anyone's interested.",
    author_name: "Lisa T.",
    reply_count: 31,
    is_pinned: false,
    created_at: "2026-04-15T11:00:00Z",
  },
  {
    id: "thr-006",
    category: "tasting_notes",
    title: "Storing opened bottles — how long is too long?",
    body: "I opened a bottle of Nocellara about 6 weeks ago and it still tastes fine. Is there a point where quality drops off noticeably?",
    author_name: "Rachel W.",
    reply_count: 9,
    is_pinned: false,
    created_at: "2026-04-10T08:45:00Z",
  },
  {
    id: "thr-007",
    category: "pairings",
    title: "Chili infused oil + dark chocolate",
    body: "Just tried the chili EVOO drizzled over 85% dark chocolate. The heat + bitterness + richness is unreal. Anyone else pairing oils with sweets?",
    author_name: "James P.",
    reply_count: 14,
    is_pinned: false,
    created_at: "2026-04-05T19:00:00Z",
  },
  {
    id: "thr-008",
    category: "general",
    title: "Thank you Mazzone family!",
    body: "Just wanted to say how much I appreciate the care that goes into every bottle. Been a subscriber for over a year now and it's been a revelation for our family meals.",
    author_name: "Patricia G.",
    reply_count: 7,
    is_pinned: false,
    created_at: "2026-03-28T12:00:00Z",
  },
];

export const MOCK_REPLIES: Record<string, CommunityReply[]> = {
  "thr-001": [
    { id: "rep-001", thread_id: "thr-001", body: "The trick is to add the oil OFF heat so it stays raw. The pepper notes really shine that way.", author_name: "Chef Antonio M.", created_at: "2026-04-28T10:30:00Z" },
    { id: "rep-002", thread_id: "thr-001", body: "I do 50/50 Nocellara and Biancolilla. Best of both worlds!", author_name: "Lisa T.", created_at: "2026-04-28T11:15:00Z" },
    { id: "rep-003", thread_id: "thr-001", body: "Don't forget a squeeze of lemon at the end. Game changer with the Nocellara.", author_name: "Sarah L.", created_at: "2026-04-28T14:00:00Z" },
  ],
  "thr-003": [
    { id: "rep-004", thread_id: "thr-003", body: "OK I just tried this and I'm a convert. The fruity notes are incredible with the cream.", author_name: "Marco R.", created_at: "2026-04-20T10:00:00Z" },
    { id: "rep-005", thread_id: "thr-003", body: "Add a pinch of flaky sea salt too. Chef's kiss.", author_name: "Rachel W.", created_at: "2026-04-20T12:30:00Z" },
  ],
};

export const MOCK_NOTIFICATION_PREFS = {
  order_updates: true,
  shipping_notifications: true,
  subscription_reminders: true,
  community_replies: true,
  event_reminders: true,
  marketing_emails: false,
  new_product_alerts: true,
};

export const MOCK_ADDRESSES: Address[] = [
  {
    id: "addr-001",
    customer_id: "cust-1",
    type: "shipping",
    line1: "123 Olive Street",
    line2: "Apt 4B",
    city: "Philadelphia",
    state: "PA",
    postal_code: "19103",
    country: "US",
    is_default: true,
    created_at: "2025-11-01T00:00:00Z",
  },
  {
    id: "addr-002",
    customer_id: "cust-1",
    type: "billing",
    line1: "123 Olive Street",
    line2: "Apt 4B",
    city: "Philadelphia",
    state: "PA",
    postal_code: "19103",
    country: "US",
    is_default: true,
    created_at: "2025-11-01T00:00:00Z",
  },
];

export const MOCK_CUSTOMER_PROFILE = {
  id: "cust-1",
  full_name: "Maria Russo",
  email: "maria@example.com",
  phone: "(215) 555-0142",
  created_at: "2025-11-01T00:00:00Z",
};
