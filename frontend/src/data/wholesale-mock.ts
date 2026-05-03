import type {
  Product,
  WholesaleAccount,
  WholesalePriceTier,
  WholesaleOrder,
  WholesaleOrderItem,
  WholesaleFAQ,
  TrackingEvent,
} from "@/types";
import { ALL_PRODUCTS } from "@/data/products";

/* ── Price Tiers ─────────────────────────────────────────── */

export const WHOLESALE_PRICE_TIERS: WholesalePriceTier[] = [
  { min_qty: 1, max_qty: 11, label: "Retail", discount_pct: 0 },
  { min_qty: 12, max_qty: 47, label: "Wholesale", discount_pct: 15 },
  { min_qty: 48, max_qty: null, label: "Bulk", discount_pct: 25 },
];

export const CASE_SIZE = 12;

/** Minimum wholesale order total — $500 */
export const WHOLESALE_MIN_ORDER_CENTS = 50000;

/* ── Pricing Helper ──────────────────────────────────────── */

export function getWholesalePrice(product: Product, quantity: number): number {
  const tier = WHOLESALE_PRICE_TIERS.find(
    (t) => quantity >= t.min_qty && (t.max_qty === null || quantity <= t.max_qty),
  );
  if (!tier) return product.price_cents;
  return Math.round(product.price_cents * (1 - tier.discount_pct / 100));
}

/* ── Helpers ─────────────────────────────────────────────── */

function findProduct(name: string): Product {
  const p = ALL_PRODUCTS.find((p) => p.name === name);
  if (!p) throw new Error(`Product not found: ${name}`);
  return p;
}

function makeItem(
  id: string,
  productName: string,
  quantity: number,
  caseQty: number,
): WholesaleOrderItem {
  const product = findProduct(productName);
  const unitPrice = getWholesalePrice(product, quantity);
  return {
    id,
    product_id: product.id,
    product_name: product.name,
    quantity,
    case_qty: caseQty,
    unit_price_cents: unitPrice,
    line_total_cents: unitPrice * quantity,
  };
}

/* ── Mock Account ────────────────────────────────────────── */

export const MOCK_WHOLESALE_ACCOUNT: WholesaleAccount = {
  id: "ws-acct-001",
  business_name: "Osteria della Valle",
  contact_name: "Lucia Moretti",
  contact_email: "lucia@osteriadellavalle.com",
  contact_phone: "(212) 555-0178",
  tax_id: "IT12345678901",
  payment_terms: "net_30",
  account_status: "active",
  rep_name: "Marco Bianchi",
  rep_email: "marco@mazzoneoliveoil.com",
  rep_phone: "(555) 234-5678",
  shipping_address: {
    id: "addr-ws-ship-001",
    customer_id: "ws-acct-001",
    type: "shipping",
    line1: "142 Mulberry Street",
    line2: null,
    city: "New York",
    state: "NY",
    postal_code: "10013",
    country: "US",
    is_default: true,
    created_at: "2025-09-15T10:00:00Z",
  },
  billing_address: {
    id: "addr-ws-bill-001",
    customer_id: "ws-acct-001",
    type: "billing",
    line1: "142 Mulberry Street",
    line2: "Suite 2F",
    city: "New York",
    state: "NY",
    postal_code: "10013",
    country: "US",
    is_default: true,
    created_at: "2025-09-15T10:00:00Z",
  },
  created_at: "2025-09-15T10:00:00Z",
};

/* ── Mock Orders ─────────────────────────────────────────── */

export const MOCK_WHOLESALE_ORDERS: WholesaleOrder[] = [
  // Order 1 — Delivered
  {
    id: "ws-ord-001",
    account_id: "ws-acct-001",
    po_number: "PO-2026-0112",
    status: "delivered",
    items: [
      makeItem("wsi-001a", "Nocellara Extra Vergine", 48, 4),
      makeItem("wsi-001b", "Balsamico Tradizionale", 24, 2),
      makeItem("wsi-001c", "Olio al Limone", 12, 1),
    ],
    subtotal_cents:
      getWholesalePrice(findProduct("Nocellara Extra Vergine"), 48) * 48 +
      getWholesalePrice(findProduct("Balsamico Tradizionale"), 24) * 24 +
      getWholesalePrice(findProduct("Olio al Limone"), 12) * 12,
    shipping_cents: 0,
    tax_cents: 10608,
    total_cents:
      getWholesalePrice(findProduct("Nocellara Extra Vergine"), 48) * 48 +
      getWholesalePrice(findProduct("Balsamico Tradizionale"), 24) * 24 +
      getWholesalePrice(findProduct("Olio al Limone"), 12) * 12 +
      10608,
    tracking_number: "1Z999AA10123456784",
    tracking_events: [
      { status: "Label Created", description: "Shipping label created", date: "2026-01-14T08:00:00Z", location: "Brooklyn, NY" },
      { status: "Picked Up", description: "Package picked up by carrier", date: "2026-01-14T14:30:00Z", location: "Brooklyn, NY" },
      { status: "In Transit", description: "Package in transit", date: "2026-01-15T06:00:00Z", location: "Newark, NJ" },
      { status: "Out for Delivery", description: "Out for delivery", date: "2026-01-16T07:45:00Z", location: "New York, NY" },
      { status: "Delivered", description: "Delivered — signed by L. Moretti", date: "2026-01-16T11:20:00Z", location: "New York, NY" },
    ] as TrackingEvent[],
    delivery_notes: "Leave with kitchen manager if front is closed.",
    created_at: "2026-01-12T15:30:00Z",
    updated_at: "2026-01-16T11:20:00Z",
  },
  // Order 2 — Shipped
  {
    id: "ws-ord-002",
    account_id: "ws-acct-001",
    po_number: "PO-2026-0205",
    status: "shipped",
    items: [
      makeItem("wsi-002a", "Blend Classico", 48, 4),
      makeItem("wsi-002b", "Crema di Balsamico al Fico", 24, 2),
    ],
    subtotal_cents:
      getWholesalePrice(findProduct("Blend Classico"), 48) * 48 +
      getWholesalePrice(findProduct("Crema di Balsamico al Fico"), 24) * 24,
    shipping_cents: 0,
    tax_cents: 8892,
    total_cents:
      getWholesalePrice(findProduct("Blend Classico"), 48) * 48 +
      getWholesalePrice(findProduct("Crema di Balsamico al Fico"), 24) * 24 +
      8892,
    tracking_number: "1Z999AA10234567891",
    tracking_events: [
      { status: "Label Created", description: "Shipping label created", date: "2026-02-06T09:00:00Z", location: "Brooklyn, NY" },
      { status: "Picked Up", description: "Package picked up by carrier", date: "2026-02-06T15:00:00Z", location: "Brooklyn, NY" },
      { status: "In Transit", description: "Package in transit", date: "2026-02-07T10:30:00Z", location: "Edison, NJ" },
    ] as TrackingEvent[],
    delivery_notes: null,
    created_at: "2026-02-05T10:00:00Z",
    updated_at: "2026-02-07T10:30:00Z",
  },
  // Order 3 — Processing
  {
    id: "ws-ord-003",
    account_id: "ws-acct-001",
    po_number: "PO-2026-0301",
    status: "processing",
    items: [
      makeItem("wsi-003a", "Nocellara Extra Vergine", 24, 2),
      makeItem("wsi-003b", "Olio Nuovo", 12, 1),
      makeItem("wsi-003c", "Sale Marino di Trapani", 48, 4),
      makeItem("wsi-003d", "Pasta di Semola", 48, 4),
    ],
    subtotal_cents:
      getWholesalePrice(findProduct("Nocellara Extra Vergine"), 24) * 24 +
      getWholesalePrice(findProduct("Olio Nuovo"), 12) * 12 +
      getWholesalePrice(findProduct("Sale Marino di Trapani"), 48) * 48 +
      getWholesalePrice(findProduct("Pasta di Semola"), 48) * 48,
    shipping_cents: 4500,
    tax_cents: 11340,
    total_cents:
      getWholesalePrice(findProduct("Nocellara Extra Vergine"), 24) * 24 +
      getWholesalePrice(findProduct("Olio Nuovo"), 12) * 12 +
      getWholesalePrice(findProduct("Sale Marino di Trapani"), 48) * 48 +
      getWholesalePrice(findProduct("Pasta di Semola"), 48) * 48 +
      4500 +
      11340,
    tracking_number: null,
    tracking_events: [],
    delivery_notes: "Please pack oils and vinegars separately.",
    created_at: "2026-03-01T09:15:00Z",
    updated_at: "2026-03-02T14:00:00Z",
  },
  // Order 4 — Confirmed
  {
    id: "ws-ord-004",
    account_id: "ws-acct-001",
    po_number: "PO-2026-0318",
    status: "confirmed",
    items: [
      makeItem("wsi-004a", "Balsamico Bianco", 24, 2),
      makeItem("wsi-004b", "Sugo alla Norma", 48, 4),
    ],
    subtotal_cents:
      getWholesalePrice(findProduct("Balsamico Bianco"), 24) * 24 +
      getWholesalePrice(findProduct("Sugo alla Norma"), 48) * 48,
    shipping_cents: 0,
    tax_cents: 6348,
    total_cents:
      getWholesalePrice(findProduct("Balsamico Bianco"), 24) * 24 +
      getWholesalePrice(findProduct("Sugo alla Norma"), 48) * 48 +
      6348,
    tracking_number: null,
    tracking_events: [],
    delivery_notes: null,
    created_at: "2026-03-18T11:45:00Z",
    updated_at: "2026-03-19T08:30:00Z",
  },
  // Order 5 — Draft
  {
    id: "ws-ord-005",
    account_id: "ws-acct-001",
    po_number: "PO-2026-0410",
    status: "draft",
    items: [
      makeItem("wsi-005a", "Nocellara Extra Vergine", 48, 4),
      makeItem("wsi-005b", "Blend Classico", 24, 2),
      makeItem("wsi-005c", "Balsamico Tradizionale", 12, 1),
    ],
    subtotal_cents:
      getWholesalePrice(findProduct("Nocellara Extra Vergine"), 48) * 48 +
      getWholesalePrice(findProduct("Blend Classico"), 24) * 24 +
      getWholesalePrice(findProduct("Balsamico Tradizionale"), 12) * 12,
    shipping_cents: 0,
    tax_cents: 0,
    total_cents:
      getWholesalePrice(findProduct("Nocellara Extra Vergine"), 48) * 48 +
      getWholesalePrice(findProduct("Blend Classico"), 24) * 24 +
      getWholesalePrice(findProduct("Balsamico Tradizionale"), 12) * 12,
    tracking_number: null,
    tracking_events: [],
    delivery_notes: null,
    created_at: "2026-04-10T16:00:00Z",
    updated_at: "2026-04-10T16:00:00Z",
  },
];

/* ── FAQ ─────────────────────────────────────────────────── */

export const WHOLESALE_FAQ: WholesaleFAQ[] = [
  {
    question: "What is the minimum order for wholesale?",
    answer:
      "The minimum wholesale order is $500 (before tax and shipping). Orders of any size are welcome at retail pricing, but wholesale tier discounts begin at 12 units per product.",
  },
  {
    question: "How does shipping work?",
    answer:
      "Shipping is free on orders over $1,000. For orders under $1,000 we charge a flat rate of $45. Orders ship via temperature-controlled ground freight from our Brooklyn warehouse.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We accept returns within 30 days of delivery for unopened, undamaged products. Please contact your account representative to initiate a return. Opened or damaged products may be eligible for credit on a case-by-case basis.",
  },
  {
    question: "What payment terms are available?",
    answer:
      "We offer Net 15, Net 30, and Net 60 payment terms depending on your account history and order volume. New accounts start on Net 15 or prepaid terms. Speak with your rep about upgrading your terms.",
  },
  {
    question: "Can I request samples before placing a large order?",
    answer:
      "Absolutely. New wholesale accounts receive a complimentary tasting kit with up to six products. Contact your account representative or fill out the sample request form on the portal.",
  },
  {
    question: "Do you offer custom labeling or private-label products?",
    answer:
      "Yes, custom labeling is available for orders of 100 cases or more per SKU. We can apply your restaurant or shop branding to our standard bottles. Lead time for custom labels is approximately 4-6 weeks.",
  },
  {
    question: "How long does it take to fulfill an order?",
    answer:
      "Standard orders ship within 3-5 business days of confirmation. During peak harvest season (October-December), lead times may extend to 7-10 business days. Rush processing is available upon request.",
  },
];
