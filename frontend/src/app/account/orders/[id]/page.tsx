"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { MOCK_ORDERS, MOCK_ADDRESSES } from "@/data/account-mock";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { ArrowLeft, Check, Truck, Circle } from "lucide-react";

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const order = MOCK_ORDERS.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="max-w-3xl text-center py-20">
        <p className="text-stone">Order not found.</p>
        <Link href="/account/orders" className="text-gold-700 hover:text-gold-800 text-sm mt-2 inline-block">
          Back to Orders
        </Link>
      </div>
    );
  }

  const shippingAddress = MOCK_ADDRESSES.find((a) => a.type === "shipping");
  const lastEventIdx = order.tracking_events.findIndex((e) => !["delivered", "cancelled"].includes(e.status) && order.tracking_events.indexOf(e) === order.tracking_events.length - 1) !== -1
    ? order.tracking_events.length - 1
    : order.tracking_events.length - 1;

  return (
    <div className="max-w-3xl">
      <Link href="/account/orders" className="flex items-center gap-1.5 text-sm text-olive-600 hover:text-olive-900 mb-6">
        <ArrowLeft size={14} /> Back to Orders
      </Link>

      {/* Order Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <div>
          <h1 className="font-serif text-2xl text-olive-900">
            Order #{order.id.replace("ord-", "").toUpperCase()}
          </h1>
          <p className="text-sm text-stone">
            Placed {new Date(order.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Items + Totals */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-sm border border-olive-100 p-5">
            <h2 className="font-medium text-olive-900 text-sm mb-4">Items</h2>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-olive-50 last:border-0">
                  <div>
                    <p className="text-sm text-charcoal">{item.product_name}</p>
                    <p className="text-xs text-stone">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm text-charcoal font-medium">
                    ${((item.price_cents * item.quantity) / 100).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-olive-100 space-y-1.5 text-sm">
              <div className="flex justify-between text-stone">
                <span>Subtotal</span>
                <span>${(order.subtotal_cents / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone">
                <span>Shipping</span>
                <span>{order.shipping_cents === 0 ? "Free" : `$${(order.shipping_cents / 100).toFixed(2)}`}</span>
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
              <h2 className="font-medium text-olive-900 text-sm mb-4">Tracking</h2>
              {order.tracking_number && (
                <p className="text-xs text-stone mb-4">Tracking #: {order.tracking_number}</p>
              )}
              <div className="relative pl-6">
                {order.tracking_events.map((event, idx) => {
                  const isLast = idx === order.tracking_events.length - 1;
                  const isCompleted = idx < order.tracking_events.length - 1 || ["delivered", "cancelled"].includes(event.status);
                  const isCurrent = isLast && !["delivered", "cancelled"].includes(event.status);

                  return (
                    <div key={idx} className="relative pb-6 last:pb-0">
                      {/* Vertical line */}
                      {!isLast && (
                        <div className={`absolute left-[-16px] top-5 bottom-0 w-px ${isCompleted ? "bg-green-300" : "bg-olive-200"}`} />
                      )}
                      {/* Dot */}
                      <div className="absolute left-[-20px] top-1">
                        {isCompleted ? (
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500 ring-2 ring-green-100" />
                        ) : isCurrent ? (
                          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 ring-2 ring-blue-100" />
                        ) : (
                          <div className="w-2.5 h-2.5 rounded-full bg-olive-200 ring-2 ring-olive-50" />
                        )}
                      </div>
                      <p className="text-sm text-charcoal font-medium">{event.description}</p>
                      <p className="text-xs text-stone">
                        {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                        {event.location && ` · ${event.location}`}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {shippingAddress && (
            <div className="bg-white rounded-sm border border-olive-100 p-5">
              <h2 className="font-medium text-olive-900 text-sm mb-3">Shipping Address</h2>
              <div className="text-sm text-stone space-y-0.5">
                <p>{shippingAddress.line1}</p>
                {shippingAddress.line2 && <p>{shippingAddress.line2}</p>}
                <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.postal_code}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
