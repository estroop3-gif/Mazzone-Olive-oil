"use client";

import { useState } from "react";
import { TabNav } from "@/components/admin/ui/TabNav";
import { MOCK_EMPLOYEES } from "@/data/employee-mock";

const DEPARTMENT_TABS = [
  { label: "All", value: "all" },
  { label: "Production", value: "production" },
  { label: "Sales", value: "sales" },
  { label: "Tasting Room", value: "tasting_room" },
  { label: "Operations", value: "operations" },
  { label: "Admin", value: "admin" },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function DirectoryPage() {
  const [search, setSearch] = useState("");
  const [activeDept, setActiveDept] = useState("all");

  const filtered = MOCK_EMPLOYEES.filter((emp) => {
    const matchesSearch =
      !search ||
      emp.full_name.toLowerCase().includes(search.toLowerCase()) ||
      emp.role.toLowerCase().includes(search.toLowerCase());
    const matchesDept = activeDept === "all" || emp.department === activeDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div>
      <h1 className="font-serif text-2xl mb-6">Directory</h1>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search employees..."
        className="w-full px-3 py-2 border border-olive-200 rounded-sm text-sm mb-4"
      />

      <TabNav tabs={DEPARTMENT_TABS} active={activeDept} onChange={setActiveDept} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((emp) => (
          <div key={emp.id} className="bg-white border border-olive-100 rounded-sm p-5">
            <div className="w-12 h-12 rounded-full bg-olive-100 flex items-center justify-center">
              <span className="text-olive-600 font-serif text-lg">
                {getInitials(emp.full_name)}
              </span>
            </div>
            <p className="font-medium text-olive-900 mt-3">{emp.full_name}</p>
            <p className="text-sm text-stone">{emp.role}</p>
            <span className="inline-flex mt-2 bg-olive-50 text-olive-700 text-xs px-2 py-0.5 rounded-full capitalize">
              {emp.department.replace(/_/g, " ")}
            </span>
            <div className="text-xs text-stone mt-2">
              <p>{emp.email}</p>
              <p>{emp.phone}</p>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-sm text-stone">No employees found</p>
          </div>
        )}
      </div>
    </div>
  );
}
