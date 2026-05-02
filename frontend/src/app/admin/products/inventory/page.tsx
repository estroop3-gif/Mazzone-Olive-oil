"use client";

import { useState } from "react";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { AdminTable, Column } from "@/components/admin/ui/AdminTable";
import { AdminModal } from "@/components/admin/ui/AdminModal";
import { AdminFormField } from "@/components/admin/ui/AdminFormField";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";

interface InventoryItem {
  id: string;
  name: string;
  current_stock: number;
  sku: string;
}

const MOCK_INVENTORY: InventoryItem[] = [
  { id: "prod_001", name: "Nocellara Extra Virgin Olive Oil", current_stock: 142, sku: "OIL-NOC-500" },
  { id: "prod_002", name: "Blend Classico EVOO", current_stock: 218, sku: "OIL-CLS-500" },
  { id: "prod_003", name: "Olio Nuovo — Limited Harvest", current_stock: 34, sku: "OIL-NUO-500" },
  { id: "prod_004", name: "Olio al Limone", current_stock: 87, sku: "OIL-LIM-250" },
  { id: "prod_005", name: "Olio al Peperoncino", current_stock: 63, sku: "OIL-PEP-250" },
  { id: "prod_006", name: "Balsamico Tradizionale di Modena", current_stock: 56, sku: "VIN-BAL-250" },
  { id: "prod_007", name: "White Wine Vinegar — Aged", current_stock: 91, sku: "VIN-WHT-500" },
  { id: "prod_008", name: "Taralli al Olio d'Oliva", current_stock: 0, sku: "PAN-TAR-200" },
  { id: "prod_009", name: "The Essentials Gift Set", current_stock: 24, sku: "GFT-ESS-001" },
  { id: "prod_010", name: "Olive Oil Body Balm", current_stock: 8, sku: "WEL-BAL-120" },
];

function getStockStatus(stock: number): string {
  if (stock === 0) return "cancelled"; // renders red via StatusBadge
  if (stock <= 10) return "pending"; // renders yellow/gold
  return "active"; // renders green
}

function getStockLabel(stock: number): string {
  if (stock === 0) return "Out of Stock";
  if (stock <= 10) return "Low Stock";
  return "OK";
}

export default function InventoryPage() {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [adjustment, setAdjustment] = useState("");

  const handleAdjust = () => {
    const adj = parseInt(adjustment, 10);
    if (isNaN(adj)) {
      alert("Please enter a valid number.");
      return;
    }
    const newStock = (selectedItem?.current_stock ?? 0) + adj;
    alert(
      `Stock adjusted (demo). ${selectedItem?.name}: ${selectedItem?.current_stock} → ${newStock}`
    );
    setSelectedItem(null);
    setAdjustment("");
  };

  const columns: Column<InventoryItem>[] = [
    {
      key: "name",
      label: "Product",
      render: (item) => (
        <div>
          <p className="font-medium text-olive-900">{item.name}</p>
          <p className="text-xs text-stone">{item.sku}</p>
        </div>
      ),
    },
    {
      key: "current_stock",
      label: "Current Stock",
      render: (item) => (
        <span className="font-medium text-olive-900">
          {item.current_stock}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (item) => (
        <span className="inline-flex items-center gap-1.5">
          <StatusBadge status={getStockStatus(item.current_stock)} />
          <span className="text-xs text-stone">
            {getStockLabel(item.current_stock) === "OK"
              ? ""
              : getStockLabel(item.current_stock) !== "Out of Stock" &&
                  getStockLabel(item.current_stock) !== "OK"
                ? ""
                : ""}
          </span>
        </span>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Inventory"
        description="Monitor stock levels and adjust quantities." backHref="/admin/products"
      />

      <AdminTable
        columns={columns}
        data={MOCK_INVENTORY}
        onRowClick={(item) => {
          setSelectedItem(item);
          setAdjustment("");
        }}
        emptyMessage="No inventory data."
      />

      <AdminModal
        open={!!selectedItem}
        onClose={() => {
          setSelectedItem(null);
          setAdjustment("");
        }}
        title="Adjust Stock"
      >
        {selectedItem && (
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-olive-900">
                {selectedItem.name}
              </p>
              <p className="text-xs text-stone mt-0.5">{selectedItem.sku}</p>
            </div>

            <div className="flex items-center gap-4 p-4 bg-olive-50 rounded-sm">
              <div className="text-center">
                <p className="text-xs text-stone uppercase tracking-wider">
                  Current Stock
                </p>
                <p className="text-2xl font-serif text-olive-900 mt-1">
                  {selectedItem.current_stock}
                </p>
              </div>
              <div className="text-olive-400 text-lg">&rarr;</div>
              <div className="text-center">
                <p className="text-xs text-stone uppercase tracking-wider">
                  New Stock
                </p>
                <p className="text-2xl font-serif text-olive-900 mt-1">
                  {adjustment
                    ? Math.max(
                        0,
                        selectedItem.current_stock + parseInt(adjustment, 10) || 0
                      )
                    : selectedItem.current_stock}
                </p>
              </div>
            </div>

            <AdminFormField
              label="Adjustment (use negative to reduce)"
              type="number"
              value={adjustment}
              onChange={setAdjustment}
              placeholder="e.g. 50 or -10"
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedItem(null);
                  setAdjustment("");
                }}
                className="px-4 py-2 text-sm font-medium text-stone border border-olive-200 rounded-sm hover:bg-olive-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAdjust}
                className="px-4 py-2 text-sm font-medium text-white bg-olive-800 rounded-sm hover:bg-olive-700 transition-colors"
              >
                Apply Adjustment
              </button>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
