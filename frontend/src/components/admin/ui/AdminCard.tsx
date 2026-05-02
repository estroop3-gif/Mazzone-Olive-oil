import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface AdminCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  trend?: { value: string; up: boolean };
}

export function AdminCard({ icon: Icon, value, label, trend }: AdminCardProps) {
  return (
    <div className="bg-white rounded-sm border border-olive-100 p-5">
      <div className="flex items-start justify-between">
        <div className="p-2 bg-olive-50 rounded-sm">
          <Icon size={18} className="text-olive-600" />
        </div>
        {trend && (
          <span
            className={`flex items-center gap-1 text-xs font-medium ${
              trend.up ? "text-green-600" : "text-red-500"
            }`}
          >
            {trend.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trend.value}
          </span>
        )}
      </div>
      <p className="text-2xl font-serif text-olive-900 mt-3">{value}</p>
      <p className="text-stone text-xs mt-1">{label}</p>
    </div>
  );
}
