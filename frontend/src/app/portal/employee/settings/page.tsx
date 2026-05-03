"use client";

import { useState } from "react";
import { MOCK_CURRENT_EMPLOYEE } from "@/data/employee-mock";

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 border-b border-olive-50 last:border-0">
      <span className="text-stone text-sm">{label}</span>
      <span className="text-charcoal text-sm">{value}</span>
    </div>
  );
}

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`w-10 h-5 rounded-full transition-colors ${on ? "bg-olive-600" : "bg-olive-200"}`}
    >
      <div
        className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${
          on ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [scheduleChanges, setScheduleChanges] = useState(true);
  const [payStubAvailable, setPayStubAvailable] = useState(true);

  const emp = MOCK_CURRENT_EMPLOYEE;

  return (
    <div>
      <h1 className="font-serif text-2xl mb-6">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Personal Info */}
        <div className="bg-white border border-olive-100 rounded-sm p-5">
          <h2 className="font-medium text-olive-900 mb-4">Personal Information</h2>
          <DetailRow label="Full Name" value={emp.full_name} />
          <DetailRow label="Email" value={emp.email} />
          <DetailRow label="Phone" value={emp.phone} />
          <DetailRow label="Department" value={emp.department.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} />
          <DetailRow label="Role" value={emp.role} />
          <DetailRow label="Hire Date" value={formatDate(emp.hire_date)} />
          <button
            onClick={() => alert("Contact HR to update")}
            className="border border-olive-300 text-olive-700 px-3 py-1.5 rounded-sm text-sm mt-4"
          >
            Edit
          </button>
        </div>

        {/* Emergency Contact */}
        <div className="bg-white border border-olive-100 rounded-sm p-5">
          <h2 className="font-medium text-olive-900 mb-4">Emergency Contact</h2>
          <DetailRow label="Name" value="Anna Ferrara" />
          <DetailRow label="Relationship" value="Spouse" />
          <DetailRow label="Phone" value="(555) 987-6543" />
          <button
            onClick={() => alert("Contact HR to update")}
            className="border border-olive-300 text-olive-700 px-3 py-1.5 rounded-sm text-sm mt-4"
          >
            Update
          </button>
        </div>

        {/* Direct Deposit */}
        <div className="bg-white border border-olive-100 rounded-sm p-5">
          <h2 className="font-medium text-olive-900 mb-4">Direct Deposit</h2>
          <DetailRow label="Bank" value="First National Bank" />
          <DetailRow label="Account" value="****4521" />
          <DetailRow label="Routing" value="****0089" />
          <button
            onClick={() => alert("Contact HR to update")}
            className="border border-olive-300 text-olive-700 px-3 py-1.5 rounded-sm text-sm mt-4"
          >
            Update
          </button>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white border border-olive-100 rounded-sm p-5">
          <h2 className="font-medium text-olive-900 mb-4">Notification Preferences</h2>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-charcoal">Email Notifications</span>
            <Toggle on={emailNotif} onToggle={() => setEmailNotif(!emailNotif)} />
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-charcoal">SMS Alerts</span>
            <Toggle on={smsAlerts} onToggle={() => setSmsAlerts(!smsAlerts)} />
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-charcoal">Schedule Changes</span>
            <Toggle on={scheduleChanges} onToggle={() => setScheduleChanges(!scheduleChanges)} />
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-charcoal">Pay Stub Available</span>
            <Toggle on={payStubAvailable} onToggle={() => setPayStubAvailable(!payStubAvailable)} />
          </div>
        </div>
      </div>
    </div>
  );
}
