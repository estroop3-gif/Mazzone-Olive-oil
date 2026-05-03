"use client";

import { useState } from "react";
import { AdminModal } from "@/components/admin/ui/AdminModal";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { MOCK_WHOLESALE_ACCOUNT } from "@/data/wholesale-mock";

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between py-2 border-b border-olive-50">
      <span className="text-stone text-sm">{label}</span>
      <span className="text-charcoal text-sm">{children}</span>
    </div>
  );
}

function AddressCard({ title, address }: { title: string; address: typeof MOCK_WHOLESALE_ACCOUNT.shipping_address }) {
  return (
    <div className="bg-white border border-olive-100 rounded-sm p-5">
      <h2 className="font-medium text-olive-900 mb-4">{title}</h2>
      <div className="text-sm text-charcoal space-y-0.5">
        <p>{address.line1}</p>
        {address.line2 && <p>{address.line2}</p>}
        <p>
          {address.city}, {address.state} {address.postal_code}
        </p>
        <p>{address.country}</p>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const [showModal, setShowModal] = useState(false);
  const acct = MOCK_WHOLESALE_ACCOUNT;

  return (
    <div>
      <h1 className="font-serif text-2xl mb-6">Company Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Business Information */}
        <div className="bg-white border border-olive-100 rounded-sm p-5">
          <h2 className="font-medium text-olive-900 mb-4">
            Business Information
          </h2>
          <DetailRow label="Business Name">{acct.business_name}</DetailRow>
          <DetailRow label="Tax ID">{acct.tax_id}</DetailRow>
          <DetailRow label="Account Status">
            <StatusBadge status={acct.account_status} />
          </DetailRow>
          <DetailRow label="Payment Terms">
            {acct.payment_terms.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
          </DetailRow>
        </div>

        {/* Contact */}
        <div className="bg-white border border-olive-100 rounded-sm p-5">
          <h2 className="font-medium text-olive-900 mb-4">Contact</h2>
          <DetailRow label="Contact Name">{acct.contact_name}</DetailRow>
          <DetailRow label="Email">{acct.contact_email}</DetailRow>
          <DetailRow label="Phone">{acct.contact_phone}</DetailRow>
        </div>

        {/* Shipping Address */}
        <AddressCard title="Shipping Address" address={acct.shipping_address} />

        {/* Billing Address */}
        <AddressCard title="Billing Address" address={acct.billing_address} />
      </div>

      <div className="mt-6">
        <button
          onClick={() => setShowModal(true)}
          className="border border-olive-300 text-olive-700 px-4 py-2 rounded-sm text-sm hover:bg-olive-50 transition-colors"
        >
          Request Changes
        </button>
      </div>

      <AdminModal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Request Changes"
      >
        <p className="text-sm text-stone mb-4">
          Contact your rep to update account information.
        </p>
        <button
          onClick={() => setShowModal(false)}
          className="bg-olive-800 text-white px-4 py-2 rounded-sm text-sm"
        >
          Close
        </button>
      </AdminModal>
    </div>
  );
}
