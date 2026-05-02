"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Package,
  MapPin,
  User,
  FileText,
  ScanBarcode,
  Check,
  Circle,
  AlertCircle,
  Printer,
  Truck,
} from "lucide-react";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { MOCK_ADMIN_ORDERS, AdminOrder, AdminOrderItem } from "@/data/admin-orders";

const STATUS_OPTIONS: AdminOrder["status"][] = [
  "pending",
  "paid",
  "processing",
  "packed",
  "shipped",
  "delivered",
  "cancelled",
];

const SHIPPING_LABELS: Record<string, string> = {
  pickup: "Local Pickup",
  flat_rate: "Flat Rate Shipping",
  free: "Free Shipping",
};

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const base = MOCK_ADMIN_ORDERS.find((o) => o.id === orderId);

  const [order, setOrder] = useState<AdminOrder | null>(null);
  const [trackingInput, setTrackingInput] = useState("");
  const [notesInput, setNotesInput] = useState("");
  const [scanInput, setScanInput] = useState("");
  const [scanFeedback, setScanFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const scanInputRef = useRef<HTMLInputElement>(null);
  const feedbackTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (base) {
      setOrder({ ...base, items: base.items.map((i) => ({ ...i })) });
      setTrackingInput(base.tracking_number ?? "");
      setNotesInput(base.notes ?? "");
    }
  }, [base]);

  const showFeedback = useCallback(
    (type: "success" | "error", message: string) => {
      if (feedbackTimeout.current) clearTimeout(feedbackTimeout.current);
      setScanFeedback({ type, message });
      feedbackTimeout.current = setTimeout(() => setScanFeedback(null), 2500);
    },
    []
  );

  const handleScan = useCallback(
    (sku: string) => {
      if (!order) return;
      const trimmed = sku.trim().toUpperCase();
      if (!trimmed) return;

      const itemIdx = order.items.findIndex(
        (i) => i.sku.toUpperCase() === trimmed
      );
      if (itemIdx === -1) {
        showFeedback("error", `SKU "${trimmed}" not found in this order`);
        setScanInput("");
        return;
      }

      const item = order.items[itemIdx];
      if (item.packed_quantity >= item.quantity) {
        showFeedback("error", `"${item.product_name}" already fully packed`);
        setScanInput("");
        return;
      }

      const updated = { ...order, items: order.items.map((i) => ({ ...i })) };
      updated.items[itemIdx] = {
        ...item,
        packed_quantity: item.packed_quantity + 1,
      };
      setOrder(updated);
      showFeedback(
        "success",
        `Scanned ${item.product_name} (${
          item.packed_quantity + 1
        }/${item.quantity})`
      );
      setScanInput("");
    },
    [order, showFeedback]
  );

  const handleScanKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleScan(scanInput);
    }
  };

  if (!order) {
    return (
      <div className="p-12 text-center text-stone text-sm">
        Order not found.{" "}
        <button
          onClick={() => router.push("/admin/orders")}
          className="text-olive-700 underline"
        >
          Back to orders
        </button>
      </div>
    );
  }

  const allPacked = order.items.every(
    (i) => i.packed_quantity >= i.quantity
  );
  const showFulfillment =
    order.status === "processing" || order.status === "packed";

  const updateStatus = (newStatus: AdminOrder["status"]) => {
    setOrder({ ...order, status: newStatus });
  };

  const totalPacked = order.items.reduce((s, i) => s + i.packed_quantity, 0);
  const totalExpected = order.items.reduce((s, i) => s + i.quantity, 0);

  return (
    <div>
      {/* Back link */}
      <button
        onClick={() => router.push("/admin/orders")}
        className="flex items-center gap-1.5 text-sm text-olive-600 hover:text-olive-900 mb-4 transition-colors"
      >
        <ArrowLeft size={14} />
        Back to Orders
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <h1 className="font-serif text-heading-sm text-olive-900">
            Order #{order.order_number}
          </h1>
          <StatusBadge status={order.status} />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={order.status}
            onChange={(e) =>
              updateStatus(e.target.value as AdminOrder["status"])
            }
            className="px-3 py-2 border border-olive-200 rounded-sm text-sm bg-white focus:outline-none focus:ring-2 focus:ring-olive-500"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 border border-olive-200 rounded-sm text-sm text-olive-700 hover:bg-olive-50 transition-colors"
          >
            <Printer size={14} />
            Print
          </button>
        </div>
      </div>

      <p className="text-stone text-xs mb-6">
        Placed{" "}
        {new Date(order.created_at).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })}
      </p>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left column */}
        <div className="space-y-4">
          {/* Customer */}
          <div className="bg-white border border-olive-100 rounded-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <User size={16} className="text-olive-600" />
              <h2 className="font-medium text-olive-900 text-sm">Customer</h2>
            </div>
            <div className="space-y-1.5 text-sm">
              <p className="text-olive-900 font-medium">
                {order.customer_name}
              </p>
              <p className="text-stone">{order.customer_email}</p>
              <p className="text-stone">{order.customer_phone}</p>
            </div>
          </div>

          {/* Shipping */}
          <div className="bg-white border border-olive-100 rounded-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={16} className="text-olive-600" />
              <h2 className="font-medium text-olive-900 text-sm">Shipping</h2>
            </div>
            <div className="space-y-2 text-sm">
              <StatusBadge status={order.shipping_method === "pickup" ? "pickup" : order.shipping_method === "free" ? "free" : "flat_rate"} />
              <p className="text-olive-800">
                {SHIPPING_LABELS[order.shipping_method]}
              </p>
              {order.shipping_address ? (
                <p className="text-stone">{order.shipping_address}</p>
              ) : (
                <p className="text-stone italic">
                  Local Pickup — Sarasota, FL
                </p>
              )}
              <div className="pt-2">
                <label className="text-xs text-stone uppercase tracking-wider block mb-1">
                  Tracking Number
                </label>
                <input
                  type="text"
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  onBlur={() =>
                    setOrder({ ...order, tracking_number: trackingInput || null })
                  }
                  placeholder="Enter tracking number…"
                  className="w-full px-3 py-2 border border-olive-200 rounded-sm text-sm bg-white focus:outline-none focus:ring-2 focus:ring-olive-500"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white border border-olive-100 rounded-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <FileText size={16} className="text-olive-600" />
              <h2 className="font-medium text-olive-900 text-sm">
                Order Notes
              </h2>
            </div>
            <textarea
              value={notesInput}
              onChange={(e) => setNotesInput(e.target.value)}
              onBlur={() =>
                setOrder({ ...order, notes: notesInput || null })
              }
              rows={3}
              placeholder="Add internal notes…"
              className="w-full px-3 py-2 border border-olive-200 rounded-sm text-sm bg-white focus:outline-none focus:ring-2 focus:ring-olive-500 resize-none"
            />
          </div>
        </div>

        {/* Right column — items + totals */}
        <div className="lg:col-span-2 space-y-4">
          {/* Items table */}
          <div className="bg-white border border-olive-100 rounded-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-olive-100">
              <Package size={16} className="text-olive-600" />
              <h2 className="font-medium text-olive-900 text-sm">
                Order Items
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-olive-100 bg-olive-50/50">
                    <th className="text-left px-4 py-3 text-xs font-medium text-stone uppercase tracking-wider">
                      Product
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-stone uppercase tracking-wider">
                      SKU
                    </th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-stone uppercase tracking-wider">
                      Qty
                    </th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-stone uppercase tracking-wider">
                      Unit Price
                    </th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-stone uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-olive-50 last:border-0"
                    >
                      <td className="px-4 py-3 text-olive-900">
                        {item.product_name}
                      </td>
                      <td className="px-4 py-3 text-stone font-mono text-xs">
                        {item.sku}
                      </td>
                      <td className="px-4 py-3 text-right">{item.quantity}</td>
                      <td className="px-4 py-3 text-right">
                        ${(item.unit_price_cents / 100).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right font-medium">
                        $
                        {(
                          (item.unit_price_cents * item.quantity) /
                          100
                        ).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="bg-white border border-olive-100 rounded-sm p-5">
            <div className="space-y-2 text-sm max-w-xs ml-auto">
              <div className="flex justify-between">
                <span className="text-stone">Subtotal</span>
                <span className="text-olive-900">
                  ${(order.subtotal_cents / 100).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone">Shipping</span>
                <span className="text-olive-900">
                  {order.shipping_cents === 0
                    ? "Free"
                    : `$${(order.shipping_cents / 100).toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between border-t border-olive-100 pt-2">
                <span className="font-medium text-olive-900">Total</span>
                <span className="font-serif text-lg text-olive-900">
                  ${(order.total_cents / 100).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fulfillment / Pack & Scan */}
      {(order.status === "paid" || showFulfillment) && (
        <div className="bg-white border border-olive-100 rounded-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ScanBarcode size={18} className="text-olive-600" />
              <h2 className="font-medium text-olive-900">
                Pack &amp; Scan
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-stone">
              <span>
                {totalPacked}/{totalExpected} items scanned
              </span>
              <div className="w-24 h-1.5 bg-olive-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-olive-600 transition-all duration-300 rounded-full"
                  style={{
                    width: `${
                      totalExpected > 0
                        ? (totalPacked / totalExpected) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Start packing prompt */}
          {order.status === "paid" && (
            <div className="text-center py-6 border border-dashed border-olive-200 rounded-sm mb-4">
              <p className="text-stone text-sm mb-3">
                Ready to fulfill this order?
              </p>
              <button
                onClick={() => updateStatus("processing")}
                className="bg-olive-800 text-white px-5 py-2 rounded-sm text-sm font-medium hover:bg-olive-700 transition-colors"
              >
                Start Packing
              </button>
            </div>
          )}

          {/* Scanner + checklist */}
          {showFulfillment && (
            <>
              {/* Scan input */}
              <div className="mb-4">
                <label className="text-xs text-stone uppercase tracking-wider block mb-1">
                  Scan or enter SKU
                </label>
                <div className="flex gap-2">
                  <input
                    ref={scanInputRef}
                    type="text"
                    value={scanInput}
                    onChange={(e) => setScanInput(e.target.value)}
                    onKeyDown={handleScanKeyDown}
                    placeholder="Scan barcode or type SKU…"
                    autoFocus
                    className="flex-1 px-3 py-2.5 border border-olive-200 rounded-sm text-sm font-mono bg-white focus:outline-none focus:ring-2 focus:ring-olive-500"
                  />
                  <button
                    onClick={() => handleScan(scanInput)}
                    className="bg-olive-800 text-white px-4 py-2.5 rounded-sm text-sm font-medium hover:bg-olive-700 transition-colors shrink-0"
                  >
                    Scan
                  </button>
                </div>

                {/* Scan feedback */}
                {scanFeedback && (
                  <div
                    className={`mt-2 flex items-center gap-2 px-3 py-2 rounded-sm text-sm ${
                      scanFeedback.type === "success"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-600 border border-red-200"
                    }`}
                  >
                    {scanFeedback.type === "success" ? (
                      <Check size={14} />
                    ) : (
                      <AlertCircle size={14} />
                    )}
                    {scanFeedback.message}
                  </div>
                )}
              </div>

              {/* Packing checklist */}
              <div className="border border-olive-100 rounded-sm divide-y divide-olive-50">
                {order.items.map((item) => {
                  const full = item.packed_quantity >= item.quantity;
                  const partial =
                    item.packed_quantity > 0 && !full;
                  return (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between px-4 py-3 transition-colors ${
                        full
                          ? "bg-green-50/60"
                          : partial
                          ? "bg-gold-50/40"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {full ? (
                          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                            <Check size={12} className="text-white" />
                          </div>
                        ) : partial ? (
                          <div className="w-5 h-5 rounded-full border-2 border-gold-500 flex items-center justify-center">
                            <div className="w-2 h-2 bg-gold-500 rounded-full" />
                          </div>
                        ) : (
                          <Circle
                            size={20}
                            className="text-olive-300"
                          />
                        )}
                        <div>
                          <p
                            className={`text-sm ${
                              full
                                ? "text-green-800 line-through"
                                : "text-olive-900"
                            }`}
                          >
                            {item.product_name}
                          </p>
                          <p className="text-xs text-stone font-mono">
                            {item.sku}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`text-sm font-medium ${
                            full
                              ? "text-green-700"
                              : partial
                              ? "text-gold-700"
                              : "text-stone"
                          }`}
                        >
                          {item.packed_quantity} / {item.quantity}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 mt-4">
                {order.status === "processing" && (
                  <button
                    onClick={() => {
                      if (allPacked) updateStatus("packed");
                    }}
                    disabled={!allPacked}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-medium transition-colors ${
                      allPacked
                        ? "bg-purple-700 text-white hover:bg-purple-600"
                        : "bg-olive-100 text-olive-400 cursor-not-allowed"
                    }`}
                  >
                    <Package size={14} />
                    Mark as Packed
                  </button>
                )}
                {order.status === "packed" && (
                  <button
                    onClick={() => updateStatus("shipped")}
                    className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-sm text-sm font-medium hover:bg-blue-500 transition-colors"
                  >
                    <Truck size={14} />
                    Mark as Shipped
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
