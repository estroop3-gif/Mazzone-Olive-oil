"use client";

import { useState } from "react";
import { MOCK_CUSTOMER_PROFILE, MOCK_ADDRESSES, MOCK_NOTIFICATION_PREFS } from "@/data/account-mock";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { Pencil, Plus } from "lucide-react";

export default function SettingsPage() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState(MOCK_CUSTOMER_PROFILE);
  const [notifPrefs, setNotifPrefs] = useState(MOCK_NOTIFICATION_PREFS);

  const toggleNotif = (key: keyof typeof MOCK_NOTIFICATION_PREFS) => {
    setNotifPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const NOTIF_LABELS: Record<string, string> = {
    order_updates: "Order Updates",
    shipping_notifications: "Shipping Notifications",
    subscription_reminders: "Subscription Reminders",
    community_replies: "Community Replies",
    event_reminders: "Event Reminders",
    marketing_emails: "Marketing Emails",
    new_product_alerts: "New Product Alerts",
  };

  return (
    <div className="max-w-3xl">
      <h1 className="font-serif text-2xl text-olive-900 mb-6">Settings</h1>

      {/* Profile */}
      <div className="bg-white rounded-sm border border-olive-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-medium text-olive-900">Profile</h2>
          <button
            onClick={() => setEditing(!editing)}
            className="flex items-center gap-1.5 text-sm text-olive-600 hover:text-olive-900 transition-colors"
          >
            <Pencil size={14} /> {editing ? "Cancel" : "Edit"}
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-stone mb-1">Full Name</label>
            {editing ? (
              <input
                type="text"
                value={profile.full_name}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                className="w-full px-3 py-2 border border-olive-200 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-olive-500"
              />
            ) : (
              <p className="text-sm text-charcoal">{profile.full_name}</p>
            )}
          </div>
          <div>
            <label className="block text-xs text-stone mb-1">Email</label>
            {editing ? (
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-3 py-2 border border-olive-200 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-olive-500"
              />
            ) : (
              <p className="text-sm text-charcoal">{profile.email}</p>
            )}
          </div>
          <div>
            <label className="block text-xs text-stone mb-1">Phone</label>
            {editing ? (
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-3 py-2 border border-olive-200 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-olive-500"
              />
            ) : (
              <p className="text-sm text-charcoal">{profile.phone}</p>
            )}
          </div>
          {editing && (
            <button
              onClick={() => setEditing(false)}
              className="px-4 py-2 bg-olive-800 text-white rounded-sm text-sm hover:bg-olive-900 transition-colors"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>

      {/* Addresses */}
      <div className="bg-white rounded-sm border border-olive-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-medium text-olive-900">Addresses</h2>
          <button className="flex items-center gap-1.5 text-sm text-olive-600 hover:text-olive-900 transition-colors">
            <Plus size={14} /> Add Address
          </button>
        </div>
        <div className="space-y-4">
          {MOCK_ADDRESSES.map((addr) => (
            <div key={addr.id} className="flex items-start justify-between p-4 bg-olive-50 rounded-sm">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <StatusBadge status={addr.type} />
                  {addr.is_default && (
                    <span className="text-xs text-gold-600 font-medium">Default</span>
                  )}
                </div>
                <p className="text-sm text-charcoal">{addr.line1}</p>
                {addr.line2 && <p className="text-sm text-charcoal">{addr.line2}</p>}
                <p className="text-sm text-charcoal">{addr.city}, {addr.state} {addr.postal_code}</p>
              </div>
              <button className="text-olive-500 hover:text-olive-900 transition-colors">
                <Pencil size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-sm border border-olive-100 p-6">
        <h2 className="font-medium text-olive-900 mb-4">Notification Preferences</h2>
        <div className="space-y-3">
          {Object.entries(notifPrefs).map(([key, enabled]) => (
            <div key={key} className="flex items-center justify-between py-2">
              <span className="text-sm text-charcoal">{NOTIF_LABELS[key] ?? key}</span>
              <button
                onClick={() => toggleNotif(key as keyof typeof MOCK_NOTIFICATION_PREFS)}
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  enabled ? "bg-olive-700" : "bg-olive-200"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                    enabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
