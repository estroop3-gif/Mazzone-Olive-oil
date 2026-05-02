"use client";

import { PageHeader } from "@/components/admin/ui/PageHeader";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const MRR_DATA = [
  { month: "Jul", mrr: 1420 },
  { month: "Aug", mrr: 1510 },
  { month: "Sep", mrr: 1580 },
  { month: "Oct", mrr: 1690 },
  { month: "Nov", mrr: 1780 },
  { month: "Dec", mrr: 1850 },
  { month: "Jan", mrr: 1920 },
  { month: "Feb", mrr: 1960 },
  { month: "Mar", mrr: 2010 },
  { month: "Apr", mrr: 2080 },
  { month: "May", mrr: 2130 },
  { month: "Jun", mrr: 2186 },
];

const CHURN_DATA = [
  { month: "Jan", churn: 4.1 },
  { month: "Feb", churn: 3.8 },
  { month: "Mar", churn: 3.5 },
  { month: "Apr", churn: 2.9 },
  { month: "May", churn: 3.4 },
  { month: "Jun", churn: 3.2 },
];

const PLAN_DATA = [
  { name: "Singolo", value: 18 },
  { name: "Duo", value: 16 },
  { name: "Collezione", value: 8 },
];

const COLORS = ["#4a7c4a", "#c4963c", "#c4603c"];

export default function ClubAnalytics() {
  return (
    <div>
      <PageHeader title="Club Analytics" description="Subscription metrics and trends" backHref="/admin/club" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-sm border border-olive-100 p-5">
          <h3 className="font-serif text-lg text-olive-900 mb-4">MRR Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={MRR_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e6ede6" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6B6B6B" }} />
              <YAxis tick={{ fontSize: 12, fill: "#6B6B6B" }} tickFormatter={(v) => `$${v}`} />
              <Tooltip formatter={(value) => [`$${value}`, "MRR"]} />
              <Line type="monotone" dataKey="mrr" stroke="#4a7c4a" strokeWidth={2} dot={{ fill: "#4a7c4a" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-sm border border-olive-100 p-5">
          <h3 className="font-serif text-lg text-olive-900 mb-4">Churn Rate Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={CHURN_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e6ede6" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6B6B6B" }} />
              <YAxis tick={{ fontSize: 12, fill: "#6B6B6B" }} tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(value) => [`${value}%`, "Churn"]} />
              <Bar dataKey="churn" fill="#c4603c" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-sm border border-olive-100 p-5">
          <h3 className="font-serif text-lg text-olive-900 mb-4">Plan Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={PLAN_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {PLAN_DATA.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-sm border border-olive-100 p-5">
          <h3 className="font-serif text-lg text-olive-900 mb-4">Retention Curve</h3>
          <div className="space-y-3 mt-6">
            {[
              { month: "Month 1", pct: 95 },
              { month: "Month 3", pct: 88 },
              { month: "Month 6", pct: 78 },
              { month: "Month 12", pct: 64 },
              { month: "Month 18", pct: 52 },
              { month: "Month 24", pct: 41 },
            ].map((r) => (
              <div key={r.month} className="flex items-center gap-3">
                <span className="text-sm text-stone w-20">{r.month}</span>
                <div className="flex-1 h-6 bg-olive-50 rounded-sm overflow-hidden">
                  <div className="h-full bg-olive-500 rounded-sm" style={{ width: `${r.pct}%` }} />
                </div>
                <span className="text-sm font-medium text-olive-900 w-10 text-right">{r.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
