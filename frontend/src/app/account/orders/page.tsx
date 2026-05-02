"use client";

import Link from "next/link";
import { MOCK_ORDERS } from "@/data/account-mock";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";

export default function OrdersPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="font-serif text-2xl text-olive-900 mb-6">Order History</h1>

      <div className="bg-white rounded-sm border border-olive-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-olive-100 bg-olive-50/50">
                <th className="text-left px-4 py-3 text-xs font-medium text-stone uppercase tracking-wider">Order</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-stone uppercase tracking-wider hidden sm:table-cell">Date</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-stone uppercase tracking-wider hidden md:table-cell">Items</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-stone uppercase tracking-wider">Total</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-stone uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ORDERS.map((order) => (
                <tr key={order.id} className="border-b border-olive-50 last:border-0">
                  <td className="px-4 py-3">
                    <Link href={`/account/orders/${order.id}`} className="text-gold-700 hover:text-gold-800 font-medium">
                      #{order.id.replace("ord-", "").toUpperCase()}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-stone hidden sm:table-cell">
                    {new Date(order.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td className="px-4 py-3 text-charcoal hidden md:table-cell">
                    {order.items.length} item{order.items.length > 1 ? "s" : ""}
                  </td>
                  <td className="px-4 py-3 text-charcoal font-medium">
                    ${(order.total_cents / 100).toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
