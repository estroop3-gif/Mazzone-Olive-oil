const STATUS_STYLES: Record<string, string> = {
  paid: "bg-green-50 text-green-700 border-green-200",
  confirmed: "bg-green-50 text-green-700 border-green-200",
  active: "bg-green-50 text-green-700 border-green-200",
  published: "bg-green-50 text-green-700 border-green-200",
  sent: "bg-green-50 text-green-700 border-green-200",
  delivered: "bg-green-50 text-green-700 border-green-200",
  shipped: "bg-blue-50 text-blue-700 border-blue-200",
  processing: "bg-blue-50 text-blue-700 border-blue-200",
  sending: "bg-blue-50 text-blue-700 border-blue-200",
  pending: "bg-gold-50 text-gold-700 border-gold-200",
  scheduled: "bg-gold-50 text-gold-700 border-gold-200",
  upcoming: "bg-gold-50 text-gold-700 border-gold-200",
  draft: "bg-stone/10 text-stone border-stone/20",
  new: "bg-stone/10 text-stone border-stone/20",
  packed: "bg-purple-50 text-purple-700 border-purple-200",
  cancelled: "bg-red-50 text-red-600 border-red-200",
  refunded: "bg-red-50 text-red-600 border-red-200",
  expired: "bg-red-50 text-red-600 border-red-200",
  submitted: "bg-blue-50 text-blue-700 border-blue-200",
  approved: "bg-green-50 text-green-700 border-green-200",
  rejected: "bg-red-50 text-red-600 border-red-200",
  suspended: "bg-red-50 text-red-600 border-red-200",
};

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const style = STATUS_STYLES[status] ?? "bg-olive-50 text-olive-700 border-olive-200";
  return (
    <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full border ${style}`}>
      {status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, " ")}
    </span>
  );
}
