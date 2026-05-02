"use client";

import { Button } from "@/components/ui/Button";
import { User, Package, Heart, Settings } from "lucide-react";

export default function AccountPage() {
  return (
    <div className="pt-20 pb-section">
      <div className="container-narrow text-center py-section">
        <div className="w-16 h-16 bg-olive-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <User size={28} className="text-olive-600" />
        </div>
        <h1 className="font-serif text-heading text-olive-900 mb-4">
          Your Account
        </h1>
        <p className="text-stone max-w-md mx-auto mb-10 leading-relaxed">
          Account features are coming soon. You&apos;ll be able to manage orders,
          subscriptions, saved addresses, and more.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
          {[
            { icon: Package, title: "Order History", desc: "Track orders and shipments" },
            { icon: Heart, title: "Wishlist", desc: "Save your favorites" },
            { icon: Settings, title: "Settings", desc: "Manage your profile" },
          ].map((item) => (
            <div key={item.title} className="bg-olive-50 rounded-sm p-5">
              <item.icon size={20} className="text-olive-500 mx-auto mb-2" />
              <h3 className="font-medium text-olive-900 text-sm">{item.title}</h3>
              <p className="text-xs text-stone mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-cream rounded-sm p-6 max-w-sm mx-auto">
          <p className="text-sm text-olive-800 mb-3">
            Join our newsletter for updates
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-3 py-2 border border-olive-200 rounded-sm text-sm"
            />
            <Button variant="primary" size="sm">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
