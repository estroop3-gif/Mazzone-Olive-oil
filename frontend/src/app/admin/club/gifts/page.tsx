"use client";

import { PageHeader } from "@/components/admin/ui/PageHeader";
import { AdminTable, Column } from "@/components/admin/ui/AdminTable";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";

interface GiftSubscription {
  buyerName: string;
  recipientName: string;
  recipientEmail: string;
  plan: string;
  giftCode: string;
  status: string;
  purchaseDate: string;
}

const GIFTS: GiftSubscription[] = [
  {
    buyerName: "Roberto Ferrara",
    recipientName: "Angela Ferrara",
    recipientEmail: "angela.f@email.it",
    plan: "Duo",
    giftCode: "GIFT-4R7X-KM2N",
    status: "redeemed",
    purchaseDate: "2026-03-18",
  },
  {
    buyerName: "Claudia Vitale",
    recipientName: "Marco Pellegrini",
    recipientEmail: "marco.p@email.it",
    plan: "Collezione",
    giftCode: "GIFT-8H3Q-WT5P",
    status: "purchased",
    purchaseDate: "2026-04-22",
  },
  {
    buyerName: "Stefano Russo",
    recipientName: "Laura Russo",
    recipientEmail: "laura.russo@email.it",
    plan: "Singolo",
    giftCode: "GIFT-2N6J-FX9A",
    status: "redeemed",
    purchaseDate: "2026-01-05",
  },
  {
    buyerName: "Valentina Costa",
    recipientName: "Tommaso Marchetti",
    recipientEmail: "t.marchetti@email.it",
    plan: "Duo",
    giftCode: "GIFT-5D1L-BV4C",
    status: "expired",
    purchaseDate: "2025-06-30",
  },
  {
    buyerName: "Alessio Bruno",
    recipientName: "Giulia De Rosa",
    recipientEmail: "giulia.dr@email.it",
    plan: "Singolo",
    giftCode: "GIFT-9T2M-RP7E",
    status: "purchased",
    purchaseDate: "2026-04-28",
  },
  {
    buyerName: "Paola Gallo",
    recipientName: "Fabio Santoro",
    recipientEmail: "fabio.s@email.it",
    plan: "Collezione",
    giftCode: "GIFT-3K8W-YN6H",
    status: "redeemed",
    purchaseDate: "2025-12-20",
  },
];

const columns: Column<GiftSubscription>[] = [
  { key: "buyerName", label: "Buyer Name" },
  { key: "recipientName", label: "Recipient Name" },
  { key: "recipientEmail", label: "Recipient Email" },
  { key: "plan", label: "Plan" },
  {
    key: "giftCode",
    label: "Gift Code",
    render: (item) => (
      <code className="text-xs bg-olive-50 text-olive-800 px-2 py-0.5 rounded font-mono">
        {item.giftCode}
      </code>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (item) => <StatusBadge status={item.status} />,
  },
  { key: "purchaseDate", label: "Purchase Date" },
];

export default function ClubGifts() {
  return (
    <div>
      <PageHeader
        title="Gift Subscriptions"
        description="Track gift purchases and redemptions for Il Club Mazzone."
        backHref="/admin/club"
      />

      <AdminTable columns={columns} data={GIFTS} />
    </div>
  );
}
