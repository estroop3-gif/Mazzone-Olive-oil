"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  CheckCircle,
  ArrowLeft,
  ShoppingBag,
  MapPin,
  Truck,
  Package,
  Gift,
  User,
  LogIn,
  Download,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart, CartItem } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

interface ShippingForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
}

const emptyForm: ShippingForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  apartment: "",
  city: "",
  state: "",
  zip: "",
};

const SHIPPING_LABELS = {
  pickup: { icon: MapPin, label: "Local Pickup — Sarasota, FL" },
  flat_rate: { icon: Truck, label: "Flat Rate Shipping" },
  free: { icon: Package, label: "Free Shipping" },
} as const;

interface OrderSnapshot {
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  shippingLabel: string;
  total: number;
  itemCount: number;
}

export default function CheckoutPage() {
  const {
    items,
    subtotal,
    formatPrice,
    clearCart,
    itemCount,
    shippingMethod,
    shippingCost,
    total,
  } = useCart();
  const { user, profile } = useAuth();

  const [form, setForm] = useState<ShippingForm>(emptyForm);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber] = useState(
    () => `MZN-${Date.now().toString(36).toUpperCase()}`
  );
  const orderSnapshot = useRef<OrderSnapshot | null>(null);

  const isPickup = shippingMethod === "pickup";

  function update(field: keyof ShippingForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    // Snapshot order before clearing
    orderSnapshot.current = {
      items: [...items],
      subtotal,
      shippingCost,
      shippingLabel: SHIPPING_LABELS[shippingMethod].label,
      total,
      itemCount,
    };
    setOrderPlaced(true);
    clearCart();
  }

  // Empty cart + not just placed an order
  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="pt-20 pb-section">
        <div className="container-narrow text-center py-section">
          <div className="w-16 h-16 bg-olive-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={28} className="text-olive-600" />
          </div>
          <h1 className="font-serif text-heading text-olive-900 mb-4">
            Your cart is empty
          </h1>
          <p className="text-stone max-w-md mx-auto mb-8 leading-relaxed">
            Add some items to your cart before checking out.
          </p>
          <Link href="/shop">
            <Button variant="primary">Browse the Market</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Order confirmation
  if (orderPlaced) {
    const snap = orderSnapshot.current;
    const orderDate = new Date();
    const estDelivery = new Date(orderDate);
    estDelivery.setDate(estDelivery.getDate() + 7);
    const fmtDate = (d: Date) =>
      d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

    const placeholderShipping = {
      name: form.firstName && form.lastName
        ? `${form.firstName} ${form.lastName}`
        : "Marco Mazzone",
      email: form.email || "marco@example.com",
      address: isPickup
        ? "Local Pickup — Sarasota, FL"
        : form.address
          ? `${form.address}${form.apartment ? `, ${form.apartment}` : ""}, ${form.city || "Sarasota"}, ${form.state || "FL"} ${form.zip || "34236"}`
          : "123 Grove Street, Sarasota, FL 34236",
    };

    async function downloadReceipt() {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const pw = doc.internal.pageSize.getWidth();
      const margin = 24;
      const right = pw - margin;
      let y = 0;

      // Brand colors (RGB)
      const olive900: [number, number, number] = [31, 51, 31];
      const olive700: [number, number, number] = [61, 100, 61];
      const olive100: [number, number, number] = [230, 237, 230];
      const gold500: [number, number, number] = [196, 150, 60];
      const cream: [number, number, number] = [253, 248, 240];
      const stone: [number, number, number] = [107, 107, 107];

      // --- Cream header band ---
      doc.setFillColor(...cream);
      doc.rect(0, 0, pw, 52, "F");

      // Olive accent line at top
      doc.setFillColor(...olive900);
      doc.rect(0, 0, pw, 2, "F");

      // Brand name
      y = 20;
      doc.setFont("times", "normal");
      doc.setFontSize(28);
      doc.setTextColor(...olive900);
      doc.text("Mazzone", pw / 2, y, { align: "center" });

      // Tagline
      y += 9;
      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.setTextColor(...gold500);
      doc.text("Dal cuore della Sicilia, alla tua tavola.", pw / 2, y, {
        align: "center",
      });

      // Gold divider
      y += 7;
      doc.setDrawColor(...gold500);
      doc.setLineWidth(0.4);
      doc.line(pw / 2 - 30, y, pw / 2 + 30, y);

      // "ORDER RECEIPT" title
      y += 12;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(...olive900);
      doc.setCharSpace(3);
      doc.text("ORDER RECEIPT", pw / 2, y, { align: "center" });
      doc.setCharSpace(0);

      // --- Order info grid ---
      y += 14;
      doc.setFillColor(...olive100);
      doc.roundedRect(margin, y - 5, pw - margin * 2, 24, 2, 2, "F");

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(...stone);

      const col1 = margin + 6;
      const col2 = margin + 52;
      const col3 = pw / 2 + 10;
      const col4 = pw / 2 + 52;

      doc.text("Order Number", col1, y + 2);
      doc.text("Date", col2, y + 2);
      doc.text(isPickup ? "Pickup" : "Est. Delivery", col3, y + 2);
      doc.text("Status", col4, y + 2);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(...olive900);
      doc.text(orderNumber, col1, y + 9);
      doc.text(fmtDate(orderDate), col2, y + 9);
      doc.text(
        isPickup ? "Ready in 1\u20132 days" : fmtDate(estDelivery),
        col3,
        y + 9
      );
      doc.setTextColor(61, 140, 61);
      doc.text("Confirmed", col4, y + 9);

      // --- Customer / Shipping ---
      y += 30;
      doc.setDrawColor(...olive100);
      doc.setLineWidth(0.3);
      doc.line(margin, y, right, y);
      y += 8;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(...olive900);
      doc.text(isPickup ? "PICKUP DETAILS" : "SHIP TO", margin, y);
      doc.text("CONTACT", pw / 2 + 10, y);

      y += 7;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(...olive900);
      doc.text(placeholderShipping.name, margin, y);
      doc.text(placeholderShipping.email, pw / 2 + 10, y);
      y += 5;
      doc.setTextColor(...stone);
      doc.setFontSize(8.5);
      const addrLines = doc.splitTextToSize(
        placeholderShipping.address,
        pw / 2 - margin - 10
      );
      doc.text(addrLines, margin, y);
      doc.text(form.phone || "(941) 555-0100", pw / 2 + 10, y);

      y += Math.max(addrLines.length * 4.5, 5) + 6;

      // --- Items table ---
      doc.setDrawColor(...olive900);
      doc.setLineWidth(0.5);
      doc.line(margin, y, right, y);
      y += 7;

      // Table header
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(...olive700);
      doc.text("ITEM", margin, y);
      doc.text("QTY", right - 52, y, { align: "center" });
      doc.text("PRICE", right - 28, y, { align: "right" });
      doc.text("TOTAL", right, y, { align: "right" });

      y += 3;
      doc.setDrawColor(...olive100);
      doc.setLineWidth(0.3);
      doc.line(margin, y, right, y);

      // Table rows
      if (snap) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        for (const { product, quantity } of snap.items) {
          y += 7;
          doc.setTextColor(...olive900);
          const nameLines = doc.splitTextToSize(product.name, right - margin - 75);
          doc.text(nameLines, margin, y);
          doc.setTextColor(...stone);
          doc.text(String(quantity), right - 52, y, { align: "center" });
          doc.text(
            `$${(product.price_cents / 100).toFixed(2)}`,
            right - 28,
            y,
            { align: "right" }
          );
          doc.setTextColor(...olive900);
          doc.text(
            `$${((product.price_cents * quantity) / 100).toFixed(2)}`,
            right,
            y,
            { align: "right" }
          );
          y += (nameLines.length - 1) * 4;

          // Light row divider
          y += 2;
          doc.setDrawColor(...olive100);
          doc.line(margin, y, right, y);
        }
      }

      // --- Totals ---
      y += 8;
      const totalsX = right - 55;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(...stone);
      doc.text("Subtotal", totalsX, y);
      doc.setTextColor(...olive900);
      doc.text(
        snap ? `$${(snap.subtotal / 100).toFixed(2)}` : "$0.00",
        right,
        y,
        { align: "right" }
      );

      y += 6;
      doc.setTextColor(...stone);
      doc.text(snap?.shippingLabel || "Shipping", totalsX, y);
      doc.setTextColor(...olive900);
      doc.text(
        snap
          ? snap.shippingCost === 0
            ? "FREE"
            : `$${(snap.shippingCost / 100).toFixed(2)}`
          : "$0.00",
        right,
        y,
        { align: "right" }
      );

      y += 4;
      doc.setDrawColor(...olive900);
      doc.setLineWidth(0.5);
      doc.line(totalsX - 5, y, right, y);

      y += 7;
      doc.setFont("times", "bold");
      doc.setFontSize(13);
      doc.setTextColor(...olive900);
      doc.text("Total", totalsX, y);
      doc.text(
        snap ? `$${(snap.total / 100).toFixed(2)}` : "$0.00",
        right,
        y,
        { align: "right" }
      );

      // --- Footer ---
      const footerY = doc.internal.pageSize.getHeight() - 28;

      // Gold line
      doc.setDrawColor(...gold500);
      doc.setLineWidth(0.3);
      doc.line(margin, footerY, right, footerY);

      doc.setFont("times", "italic");
      doc.setFontSize(10);
      doc.setTextColor(...olive700);
      doc.text(
        "Grazie for choosing Mazzone Olive Oil.",
        pw / 2,
        footerY + 8,
        { align: "center" }
      );

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(...stone);
      doc.text(
        "hello@mazzoneoliveoil.com  |  mazzoneoliveoil.com  |  Sarasota, FL",
        pw / 2,
        footerY + 14,
        { align: "center" }
      );

      // Olive bottom bar
      doc.setFillColor(...olive900);
      doc.rect(
        0,
        doc.internal.pageSize.getHeight() - 3,
        pw,
        3,
        "F"
      );

      doc.save(`Mazzone-Receipt-${orderNumber}.pdf`);
    }

    return (
      <div className="pt-20 pb-section">
        <div className="container-narrow py-section max-w-2xl mx-auto">
          {/* Confirmation header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} className="text-green-700" />
            </div>
            <p className="text-gold-400 uppercase tracking-[0.3em] text-xs mb-3">
              Grazie Mille
            </p>
            <h1 className="font-serif text-heading text-olive-900 mb-3">
              Order Confirmed
            </h1>
            <p className="text-stone max-w-md mx-auto leading-relaxed">
              Thank you for your order. A confirmation has been sent to{" "}
              <span className="text-olive-800 font-medium">
                {placeholderShipping.email}
              </span>
            </p>
          </div>

          {/* Order info bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-olive-50/50 border border-olive-100 rounded-sm p-4 text-center">
              <p className="text-xs text-stone uppercase tracking-wider mb-1">
                Order Number
              </p>
              <p className="text-olive-900 font-serif font-medium">
                {orderNumber}
              </p>
            </div>
            <div className="bg-olive-50/50 border border-olive-100 rounded-sm p-4 text-center">
              <p className="text-xs text-stone uppercase tracking-wider mb-1">
                Order Date
              </p>
              <p className="text-olive-900 font-medium text-sm">
                {fmtDate(orderDate)}
              </p>
            </div>
            <div className="bg-olive-50/50 border border-olive-100 rounded-sm p-4 text-center col-span-2 sm:col-span-1">
              <p className="text-xs text-stone uppercase tracking-wider mb-1">
                {isPickup ? "Pickup" : "Est. Delivery"}
              </p>
              <p className="text-olive-900 font-medium text-sm">
                {isPickup ? "Ready in 1–2 days" : fmtDate(estDelivery)}
              </p>
            </div>
          </div>

          {/* Shipping details */}
          <div className="bg-olive-50/50 border border-olive-100 rounded-sm p-5 mb-6">
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-stone uppercase tracking-wider mb-1.5">
                  {isPickup ? "Pickup Location" : "Ship To"}
                </p>
                <p className="text-olive-900 font-medium">
                  {placeholderShipping.name}
                </p>
                <p className="text-stone text-sm">
                  {placeholderShipping.address}
                </p>
              </div>
              <div>
                <p className="text-xs text-stone uppercase tracking-wider mb-1.5">
                  Contact
                </p>
                <p className="text-olive-900 flex items-center gap-1.5">
                  <Mail size={13} className="text-stone" />
                  {placeholderShipping.email}
                </p>
                {(form.phone || true) && (
                  <p className="text-stone text-sm mt-0.5">
                    {form.phone || "(941) 555-0100"}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Order details card */}
          {snap && (
            <div className="bg-olive-50/50 border border-olive-100 rounded-sm p-6 mb-6">
              <h2 className="font-serif text-lg text-olive-900 mb-4">
                Order Details
              </h2>
              <div className="space-y-3 mb-5">
                {snap.items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-3">
                    <div className="w-10 h-12 bg-olive-100 rounded-sm overflow-hidden shrink-0">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-[7px] text-olive-300 italic font-serif">
                            {product.name}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-olive-900 font-medium truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-stone">Qty: {quantity}</p>
                    </div>
                    <span className="text-sm text-olive-900 font-medium shrink-0">
                      {formatPrice(product.price_cents * quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-olive-200 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone">Subtotal</span>
                  <span className="text-olive-900">
                    {formatPrice(snap.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone">{snap.shippingLabel}</span>
                  <span className="text-olive-900">
                    {snap.shippingCost === 0 ? (
                      <span className="text-green-700">Free</span>
                    ) : (
                      formatPrice(snap.shippingCost)
                    )}
                  </span>
                </div>
                <div className="border-t border-olive-200 pt-2 flex justify-between font-medium">
                  <span className="text-olive-900">Total Charged</span>
                  <span className="text-olive-900 font-serif text-lg">
                    {formatPrice(snap.total)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Download receipt */}
          <div className="text-center mb-8">
            <button
              onClick={downloadReceipt}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-olive-300 rounded-sm text-sm text-olive-800 hover:bg-olive-50 transition-colors"
            >
              <Download size={15} />
              Download Receipt
            </button>
          </div>

          {/* Auth-aware CTA */}
          {user ? (
            <div className="bg-olive-50/50 border border-olive-100 rounded-sm p-6 text-center">
              <User size={20} className="text-olive-600 mx-auto mb-3" />
              <p className="text-sm text-olive-900 font-medium mb-1">
                Welcome back
                {profile?.full_name ? `, ${profile.full_name}` : ""}
              </p>
              <p className="text-xs text-stone mb-4">
                Track this order and manage your account from your dashboard.
              </p>
              <Link href="/account">
                <Button variant="primary" size="sm">
                  Go to My Account
                </Button>
              </Link>
            </div>
          ) : (
            <div className="bg-olive-50/50 border border-olive-100 rounded-sm p-6 text-center">
              <Gift size={20} className="text-olive-600 mx-auto mb-3" />
              <p className="text-sm text-olive-900 font-medium mb-1">
                Track your order & earn rewards
              </p>
              <p className="text-xs text-stone mb-5">
                Create an account to track orders, earn loyalty points, and get
                early access to seasonal releases.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/login?redirect=/account">
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    <span className="flex items-center gap-1.5">
                      <LogIn size={14} />
                      Log In
                    </span>
                  </Button>
                </Link>
                <Link href="/login?tab=signup&redirect=/account">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Back to shop */}
          <div className="text-center mt-8">
            <Link
              href="/shop"
              className="text-sm text-olive-700 hover:text-olive-900 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Demo notice */}
          <p className="text-center text-xs text-stone/60 mt-6 italic">
            This is a demo — no payment was processed.
          </p>
        </div>
      </div>
    );
  }

  const ShippingIcon = SHIPPING_LABELS[shippingMethod].icon;

  const inputClass =
    "w-full px-4 py-3 border border-olive-200 rounded-sm text-sm text-olive-900 placeholder:text-stone/50 focus:outline-none focus:ring-2 focus:ring-olive-600/20 focus:border-olive-600 transition-colors";

  return (
    <div className="pt-20 pb-section">
      <div className="container-wide py-12">
        <Link
          href="/cart"
          className="inline-flex items-center gap-1 text-sm text-olive-700 hover:text-olive-900 transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Back to Cart
        </Link>

        <p className="text-gold-400 uppercase tracking-[0.3em] text-xs mb-2">
          Cassa
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-olive-900 mb-10">
          Checkout
        </h1>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact */}
              <div>
                <h2 className="font-serif text-xl text-olive-900 mb-5">
                  Contact Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-stone mb-1.5">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={(e) => update("firstName", e.target.value)}
                      className={inputClass}
                      placeholder="Marco"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-stone mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={(e) => update("lastName", e.target.value)}
                      className={inputClass}
                      placeholder="Mazzone"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-stone mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className={inputClass}
                      placeholder="marco@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-stone mb-1.5">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className={inputClass}
                      placeholder="(941) 555-0100"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping address — hidden for pickup */}
              {isPickup ? (
                <div className="bg-olive-50/80 border border-olive-100 rounded-sm p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin size={18} className="text-olive-700" />
                    <h2 className="font-serif text-xl text-olive-900">
                      Local Pickup
                    </h2>
                  </div>
                  <p className="text-sm text-stone leading-relaxed">
                    Your order will be ready for pickup in Sarasota, FL.
                    We&apos;ll email you when it&apos;s ready.
                  </p>
                </div>
              ) : (
                <div>
                  <h2 className="font-serif text-xl text-olive-900 mb-5">
                    Shipping Address
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-stone mb-1.5">
                        Street Address
                      </label>
                      <input
                        type="text"
                        value={form.address}
                        onChange={(e) => update("address", e.target.value)}
                        className={inputClass}
                        placeholder="123 Grove Street"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-stone mb-1.5">
                        Apartment, suite, etc.
                      </label>
                      <input
                        type="text"
                        value={form.apartment}
                        onChange={(e) => update("apartment", e.target.value)}
                        className={inputClass}
                        placeholder="Apt 4B"
                      />
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm text-stone mb-1.5">
                          City
                        </label>
                        <input
                          type="text"
                          value={form.city}
                          onChange={(e) => update("city", e.target.value)}
                          className={inputClass}
                          placeholder="Sarasota"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-stone mb-1.5">
                          State
                        </label>
                        <input
                          type="text"
                          value={form.state}
                          onChange={(e) => update("state", e.target.value)}
                          className={inputClass}
                          placeholder="FL"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-stone mb-1.5">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          value={form.zip}
                          onChange={(e) => update("zip", e.target.value)}
                          className={inputClass}
                          placeholder="34236"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-xs text-stone italic">
                This is a demo checkout. No payment will be processed.
              </p>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-olive-50/50 border border-olive-100 rounded-sm p-6 sticky top-28">
                <h2 className="font-serif text-xl text-olive-900 mb-5">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-5 max-h-64 overflow-y-auto">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex items-center gap-3">
                      <div className="w-12 h-14 bg-olive-100 rounded-sm overflow-hidden shrink-0">
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-[8px] text-olive-300 italic font-serif">
                              {product.name}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-olive-900 font-medium truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-stone">Qty: {quantity}</p>
                      </div>
                      <span className="text-sm text-olive-900 font-medium shrink-0">
                        {formatPrice(product.price_cents * quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-olive-200 pt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-stone">
                      Subtotal ({itemCount}{" "}
                      {itemCount === 1 ? "item" : "items"})
                    </span>
                    <span className="text-olive-900 font-medium">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone flex items-center gap-1.5">
                      <ShippingIcon size={14} />
                      {SHIPPING_LABELS[shippingMethod].label}
                    </span>
                    <span className="text-olive-900 font-medium">
                      {shippingCost === 0 ? (
                        <span className="text-green-700">Free</span>
                      ) : (
                        formatPrice(shippingCost)
                      )}
                    </span>
                  </div>
                  <div className="border-t border-olive-200 pt-3 flex justify-between">
                    <span className="text-olive-900 font-medium">Total</span>
                    <span className="text-olive-900 font-serif text-lg">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full mt-6"
                >
                  Place Order
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
