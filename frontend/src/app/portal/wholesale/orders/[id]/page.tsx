"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import {
  MOCK_WHOLESALE_ORDERS,
  MOCK_WHOLESALE_ACCOUNT,
  CASE_SIZE,
} from "@/data/wholesale-mock";
import { ArrowLeft, Download, RotateCcw } from "lucide-react";

export default function WholesaleOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const order = MOCK_WHOLESALE_ORDERS.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="max-w-3xl text-center py-20">
        <p className="text-stone">Order not found.</p>
        <Link
          href="/portal/wholesale/orders"
          className="text-gold-700 hover:text-gold-800 text-sm mt-2 inline-block"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  const addr = MOCK_WHOLESALE_ACCOUNT.shipping_address;

  return (
    <div className="max-w-5xl">
      <Link
        href="/portal/wholesale/orders"
        className="flex items-center gap-1.5 text-sm text-olive-600 hover:text-olive-900 mb-6"
      >
        <ArrowLeft size={14} /> Back to Orders
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <div>
          <h1 className="font-serif text-2xl text-olive-900">
            Order {order.po_number}
          </h1>
          <p className="text-sm text-stone">
            Placed{" "}
            {new Date(order.created_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Items + Totals + Tracking */}
        <div className="lg:col-span-2 space-y-5">
          {/* Items Table */}
          <div className="bg-white rounded-sm border border-olive-100 p-5">
            <h2 className="font-medium text-olive-900 text-sm mb-4">Items</h2>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-2 border-b border-olive-50 last:border-0"
                >
                  <div>
                    <p className="text-sm text-charcoal">{item.product_name}</p>
                    <p className="text-xs text-stone">
                      {item.quantity} units ({item.case_qty} case
                      {item.case_qty !== 1 ? "s" : ""}) &middot; $
                      {(item.unit_price_cents / 100).toFixed(2)}/unit
                    </p>
                  </div>
                  <p className="text-sm text-charcoal font-medium">
                    ${(item.line_total_cents / 100).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-4 pt-4 border-t border-olive-100 space-y-1.5 text-sm">
              <div className="flex justify-between text-stone">
                <span>Subtotal</span>
                <span>${(order.subtotal_cents / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone">
                <span>Shipping</span>
                <span>
                  {order.shipping_cents === 0
                    ? "Free"
                    : `$${(order.shipping_cents / 100).toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-stone">
                <span>Tax</span>
                <span>${(order.tax_cents / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium text-olive-900 pt-2 border-t border-olive-100">
                <span>Total</span>
                <span>${(order.total_cents / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Tracking Timeline */}
          {order.tracking_events.length > 0 && (
            <div className="bg-white rounded-sm border border-olive-100 p-5">
              <h2 className="font-medium text-olive-900 text-sm mb-4">
                Tracking
              </h2>
              {order.tracking_number && (
                <p className="text-xs text-stone mb-4">
                  Tracking #: {order.tracking_number}
                </p>
              )}
              <div className="relative pl-6">
                {order.tracking_events.map((event, idx) => {
                  const isLast = idx === order.tracking_events.length - 1;
                  const isCompleted =
                    idx < order.tracking_events.length - 1 ||
                    ["delivered", "cancelled"].includes(
                      event.status.toLowerCase(),
                    );
                  const isCurrent =
                    isLast &&
                    !["delivered", "cancelled"].includes(
                      event.status.toLowerCase(),
                    );

                  return (
                    <div key={idx} className="relative pb-6 last:pb-0">
                      {!isLast && (
                        <div
                          className={`absolute left-[-16px] top-5 bottom-0 w-px ${
                            isCompleted ? "bg-green-300" : "bg-olive-200"
                          }`}
                        />
                      )}
                      <div className="absolute left-[-20px] top-1">
                        {isCompleted ? (
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500 ring-2 ring-green-100" />
                        ) : isCurrent ? (
                          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 ring-2 ring-blue-100" />
                        ) : (
                          <div className="w-2.5 h-2.5 rounded-full bg-olive-200 ring-2 ring-olive-50" />
                        )}
                      </div>
                      <p className="text-sm text-charcoal font-medium">
                        {event.description}
                      </p>
                      <p className="text-xs text-stone">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                        {event.location && ` \u00b7 ${event.location}`}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-5">
          {/* Delivery Notes */}
          {order.delivery_notes && (
            <div className="bg-white rounded-sm border border-olive-100 p-5">
              <h2 className="font-medium text-olive-900 text-sm mb-3">
                Delivery Notes
              </h2>
              <p className="text-sm text-stone">{order.delivery_notes}</p>
            </div>
          )}

          {/* Shipping Info */}
          <div className="bg-white rounded-sm border border-olive-100 p-5">
            <h2 className="font-medium text-olive-900 text-sm mb-3">
              Shipping Address
            </h2>
            <div className="text-sm text-stone space-y-0.5">
              <p>{MOCK_WHOLESALE_ACCOUNT.business_name}</p>
              <p>{addr.line1}</p>
              {addr.line2 && <p>{addr.line2}</p>}
              <p>
                {addr.city}, {addr.state} {addr.postal_code}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-8">
        <button
          onClick={() => alert("Invoice download coming soon.")}
          className="flex items-center gap-2 border border-olive-200 text-olive-700 text-sm px-4 py-2 rounded-sm hover:bg-olive-50 transition-colors"
        >
          <Download size={14} />
          Download Invoice
        </button>
        <button
          onClick={() => alert("Reorder functionality coming soon.")}
          className="flex items-center gap-2 bg-olive-800 text-white text-sm px-4 py-2 rounded-sm hover:bg-olive-900 transition-colors"
        >
          <RotateCcw size={14} />
          Reorder
        </button>
      </div>
    </div>
  );
}
