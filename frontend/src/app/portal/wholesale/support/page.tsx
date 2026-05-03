"use client";

import { useState } from "react";
import { ChevronDown, Mail, Phone } from "lucide-react";
import { AdminFormField } from "@/components/admin/ui/AdminFormField";
import { WHOLESALE_FAQ, MOCK_WHOLESALE_ACCOUNT } from "@/data/wholesale-mock";

const SUBJECT_OPTIONS = [
  { label: "General Inquiry", value: "general" },
  { label: "Order Issue", value: "order_issue" },
  { label: "Returns", value: "returns" },
  { label: "Billing", value: "billing" },
  { label: "Other", value: "other" },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const rep = MOCK_WHOLESALE_ACCOUNT;
  const initials = rep.rep_name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <div>
      <h1 className="font-serif text-2xl mb-6">Support</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Left Column ──────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">
          {/* FAQ Accordion */}
          <div>
            <h2 className="font-serif text-lg text-olive-900 mb-3">
              Frequently Asked Questions
            </h2>
            <div>
              {WHOLESALE_FAQ.map((faq, idx) => {
                const key = String(idx);
                const isOpen = openFaq === key;
                return (
                  <div key={idx}>
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : key)}
                      className="w-full flex justify-between items-center py-3 border-b border-olive-100"
                    >
                      <span className="text-sm font-medium text-olive-900 text-left">
                        {faq.question}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`text-stone shrink-0 ml-2 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="text-sm text-stone py-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white border border-olive-100 rounded-sm p-5 space-y-4">
            <h2 className="font-serif text-lg text-olive-900">
              Send a Message
            </h2>

            <AdminFormField
              label="Subject"
              type="select"
              value={subject}
              onChange={setSubject}
              options={SUBJECT_OPTIONS}
            />

            <AdminFormField
              label="Message"
              type="textarea"
              value={message}
              onChange={setMessage}
              placeholder="How can we help?"
            />

            <button
              onClick={() => alert("Message sent!")}
              className="bg-olive-800 text-white px-4 py-2 rounded-sm text-sm hover:bg-olive-900 transition-colors"
            >
              Submit
            </button>
          </div>
        </div>

        {/* ── Right Column: Rep Card ───────────────── */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-olive-100 rounded-sm p-5">
            <div className="flex flex-col items-center text-center mb-5">
              <div className="w-16 h-16 rounded-full bg-olive-100 flex items-center justify-center mb-3">
                <span className="text-olive-600 font-serif text-xl">
                  {initials}
                </span>
              </div>
              <p className="font-medium text-olive-900">{rep.rep_name}</p>
              <p className="text-xs text-stone">Account Representative</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-olive-600">
                <Mail size={14} className="shrink-0" />
                <span>{rep.rep_email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-olive-600">
                <Phone size={14} className="shrink-0" />
                <span>{rep.rep_phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
