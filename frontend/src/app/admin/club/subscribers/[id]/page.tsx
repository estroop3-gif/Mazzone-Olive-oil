"use client";

import { useState } from "react";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminTable, Column } from "@/components/admin/ui/AdminTable";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { TabNav } from "@/components/admin/ui/TabNav";
import { User, DollarSign, Package, Clock, Mail, Calendar } from "lucide-react";

const SUBSCRIBER = {
  id: "1",
  name: "Maria Conti",
  email: "maria.conti@email.it",
  phone: "+39 333 456 7890",
  plan: "Duo",
  status: "active",
  started: "November 15, 2024",
  nextBilling: "June 15, 2026",
  address: "Via Roma 42, 90100 Palermo, Italy",
  totalSpent: "$1,178",
  lifetimeMonths: 19,
  notes: "Prefers Nocellara over blends. Mentioned interest in Collezione upgrade.",
};

const PAYMENTS = [
  { id: "PAY-001", date: "May 15, 2026", amount: "$62.00", status: "paid", method: "Visa •••• 4242" },
  { id: "PAY-002", date: "Apr 15, 2026", amount: "$62.00", status: "paid", method: "Visa •••• 4242" },
  { id: "PAY-003", date: "Mar 15, 2026", amount: "$62.00", status: "paid", method: "Visa •••• 4242" },
  { id: "PAY-004", date: "Feb 15, 2026", amount: "$62.00", status: "paid", method: "Visa •••• 4242" },
  { id: "PAY-005", date: "Jan 15, 2026", amount: "$62.00", status: "paid", method: "Visa •••• 4242" },
  { id: "PAY-006", date: "Dec 15, 2025", amount: "$62.00", status: "paid", method: "Visa •••• 4242" },
  { id: "PAY-007", date: "Nov 15, 2025", amount: "$62.00", status: "paid", method: "Visa •••• 4242" },
  { id: "PAY-008", date: "Oct 15, 2025", amount: "$62.00", status: "paid", method: "Visa •••• 4242" },
  { id: "PAY-009", date: "Sep 15, 2025", amount: "$62.00", status: "paid", method: "Visa •••• 4242" },
  { id: "PAY-010", date: "Aug 15, 2025", amount: "$35.00", status: "paid", method: "Visa •••• 4242" },
  { id: "PAY-011", date: "Jul 15, 2025", amount: "$35.00", status: "paid", method: "Visa •••• 4242" },
  { id: "PAY-012", date: "Jun 15, 2025", amount: "$35.00", status: "paid", method: "Visa •••• 4242" },
];

const SHIPMENTS = [
  { id: "SHP-019", date: "May 16, 2026", items: "Nocellara EVOO + Olio al Limone", status: "shipped", tracking: "1Z999AA10123456784" },
  { id: "SHP-018", date: "Apr 16, 2026", items: "Blend Classico + Olio Nuovo", status: "delivered", tracking: "1Z999AA10123456783" },
  { id: "SHP-017", date: "Mar 16, 2026", items: "Nocellara EVOO + Blend Classico", status: "delivered", tracking: "1Z999AA10123456782" },
  { id: "SHP-016", date: "Feb 16, 2026", items: "Olio al Limone + Nocellara EVOO", status: "delivered", tracking: "1Z999AA10123456781" },
  { id: "SHP-015", date: "Jan 16, 2026", items: "Blend Classico + Olio al Peperoncino", status: "delivered", tracking: "1Z999AA10123456780" },
  { id: "SHP-014", date: "Dec 16, 2025", items: "Nocellara EVOO + Holiday Blend", status: "delivered", tracking: "1Z999AA10123456779" },
  { id: "SHP-013", date: "Nov 16, 2025", items: "Olio Nuovo 2025 + Nocellara EVOO", status: "delivered", tracking: "1Z999AA10123456778" },
  { id: "SHP-012", date: "Oct 16, 2025", items: "Nocellara EVOO + Blend Classico", status: "delivered", tracking: "1Z999AA10123456777" },
  { id: "SHP-011", date: "Sep 16, 2025", items: "Blend Classico + Olio al Limone", status: "delivered", tracking: "1Z999AA10123456776" },
  { id: "SHP-010", date: "Aug 16, 2025", items: "Nocellara EVOO (Singolo)", status: "delivered", tracking: "1Z999AA10123456775" },
];

const EMAILS = [
  { subject: "Your June shipment is on its way!", date: "May 16, 2026", status: "sent", opened: "Yes" },
  { subject: "May Club Pairing Reveal: Summer Caprese", date: "May 1, 2026", status: "sent", opened: "Yes" },
  { subject: "Your May shipment is on its way!", date: "Apr 16, 2026", status: "sent", opened: "Yes" },
  { subject: "Summer Sale: 20% Off for Club Members", date: "Apr 10, 2026", status: "sent", opened: "No" },
  { subject: "April Club Pairing Reveal", date: "Apr 1, 2026", status: "sent", opened: "Yes" },
  { subject: "Your subscription has been upgraded to Duo!", date: "Sep 15, 2025", status: "sent", opened: "Yes" },
  { subject: "Welcome to Il Club Mazzone!", date: "Jun 15, 2025", status: "sent", opened: "Yes" },
];

const PLAN_HISTORY = [
  { date: "Sep 15, 2025", change: "Upgraded from Singolo to Duo", by: "Customer" },
  { date: "Jun 15, 2025", change: "Subscribed to Singolo plan", by: "Customer" },
];

const TABS = [
  { label: "Overview", value: "overview" },
  { label: "Payments", value: "payments" },
  { label: "Shipments", value: "shipments" },
  { label: "Emails", value: "emails" },
  { label: "History", value: "history" },
];

const paymentCols: Column<(typeof PAYMENTS)[0]>[] = [
  { key: "id", label: "Payment ID", render: (p) => <span className="font-mono text-xs">{p.id}</span> },
  { key: "date", label: "Date" },
  { key: "amount", label: "Amount", render: (p) => <span className="font-medium">{p.amount}</span> },
  { key: "status", label: "Status", render: (p) => <StatusBadge status={p.status} /> },
  { key: "method", label: "Method" },
];

const shipmentCols: Column<(typeof SHIPMENTS)[0]>[] = [
  { key: "id", label: "Shipment ID", render: (s) => <span className="font-mono text-xs">{s.id}</span> },
  { key: "date", label: "Shipped" },
  { key: "items", label: "Contents" },
  { key: "status", label: "Status", render: (s) => <StatusBadge status={s.status} /> },
  { key: "tracking", label: "Tracking", render: (s) => <span className="font-mono text-xs">{s.tracking}</span> },
];

const emailCols: Column<(typeof EMAILS)[0]>[] = [
  { key: "subject", label: "Subject", render: (e) => <span className="font-medium text-olive-900">{e.subject}</span> },
  { key: "date", label: "Sent" },
  { key: "status", label: "Status", render: (e) => <StatusBadge status={e.status} /> },
  { key: "opened", label: "Opened", render: (e) => (
    <span className={e.opened === "Yes" ? "text-green-600" : "text-stone"}>{e.opened}</span>
  )},
];

export default function SubscriberDetail() {
  const [tab, setTab] = useState("overview");
  const s = SUBSCRIBER;

  return (
    <div>
      <PageHeader title={s.name} description={`${s.plan} plan subscriber`} backHref="/admin/club/subscribers" />

      <TabNav tabs={TABS} active={tab} onChange={setTab} />

      {tab === "overview" && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <AdminCard icon={DollarSign} value={s.totalSpent} label="Total Spent" />
            <AdminCard icon={Clock} value={`${s.lifetimeMonths} mo`} label="Member Since" />
            <AdminCard icon={Package} value="19" label="Shipments Sent" />
            <AdminCard icon={Mail} value="7" label="Emails Sent" />
          </div>

          {/* Profile info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-sm border border-olive-100 p-6">
              <h3 className="font-serif text-lg text-olive-900 mb-4 flex items-center gap-2">
                <User size={18} className="text-olive-600" />
                Subscriber Details
              </h3>
              <dl className="space-y-3">
                {[
                  ["Name", s.name],
                  ["Email", s.email],
                  ["Phone", s.phone],
                  ["Address", s.address],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between py-2 border-b border-olive-50 last:border-0">
                    <dt className="text-sm text-stone">{label}</dt>
                    <dd className="text-sm text-charcoal font-medium text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="bg-white rounded-sm border border-olive-100 p-6">
              <h3 className="font-serif text-lg text-olive-900 mb-4 flex items-center gap-2">
                <Calendar size={18} className="text-olive-600" />
                Subscription
              </h3>
              <dl className="space-y-3">
                {[
                  ["Plan", s.plan],
                  ["Status", null],
                  ["Started", s.started],
                  ["Next Billing", s.nextBilling],
                  ["Monthly Rate", "$62.00"],
                ].map(([label, value]) => (
                  <div key={label as string} className="flex justify-between items-center py-2 border-b border-olive-50 last:border-0">
                    <dt className="text-sm text-stone">{label}</dt>
                    <dd className="text-sm text-charcoal font-medium">
                      {value === null ? <StatusBadge status={s.status} /> : value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-sm border border-olive-100 p-6">
            <h3 className="font-serif text-lg text-olive-900 mb-3">Notes</h3>
            <p className="text-sm text-stone">{s.notes}</p>
            <textarea
              defaultValue={s.notes}
              className="mt-3 w-full px-3 py-2 border border-olive-200 rounded-sm text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-olive-500"
            />
            <button
              onClick={() => alert("Notes saved (demo)")}
              className="mt-2 bg-olive-800 text-white px-4 py-1.5 rounded-sm text-sm hover:bg-olive-700"
            >
              Save Notes
            </button>
          </div>
        </div>
      )}

      {tab === "payments" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-stone">{PAYMENTS.length} payments totaling {s.totalSpent}</p>
          </div>
          <AdminTable columns={paymentCols} data={PAYMENTS} />
        </div>
      )}

      {tab === "shipments" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-stone">{SHIPMENTS.length} shipments sent</p>
          </div>
          <AdminTable columns={shipmentCols} data={SHIPMENTS} />
        </div>
      )}

      {tab === "emails" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-stone">{EMAILS.length} emails sent to this subscriber</p>
            <button
              onClick={() => alert("Compose email to Maria (demo)")}
              className="bg-olive-800 text-white px-4 py-1.5 rounded-sm text-sm hover:bg-olive-700"
            >
              Send Email
            </button>
          </div>
          <AdminTable columns={emailCols} data={EMAILS} />
        </div>
      )}

      {tab === "history" && (
        <div className="space-y-6">
          {/* Plan changes */}
          <div className="bg-white rounded-sm border border-olive-100 p-6">
            <h3 className="font-serif text-lg text-olive-900 mb-4">Plan History</h3>
            <div className="space-y-4">
              {PLAN_HISTORY.map((h, i) => (
                <div key={i} className="flex items-start gap-4 pb-4 border-b border-olive-50 last:border-0">
                  <div className="w-2 h-2 rounded-full bg-olive-500 mt-2 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-charcoal font-medium">{h.change}</p>
                    <p className="text-xs text-stone mt-0.5">{h.date} &middot; {h.by}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-sm border border-olive-100 p-6">
            <h3 className="font-serif text-lg text-olive-900 mb-4">Actions</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => alert("Plan changed (demo)")}
                className="bg-olive-50 text-olive-800 px-4 py-2 rounded-sm text-sm hover:bg-olive-100"
              >
                Change Plan
              </button>
              <button
                onClick={() => alert("Subscription paused (demo)")}
                className="bg-gold-50 text-gold-800 px-4 py-2 rounded-sm text-sm hover:bg-gold-100"
              >
                Pause Subscription
              </button>
              <button
                onClick={() => alert("Subscription cancelled (demo)")}
                className="bg-red-50 text-red-600 px-4 py-2 rounded-sm text-sm hover:bg-red-100"
              >
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
