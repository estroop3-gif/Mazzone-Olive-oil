"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Package, Grid3X3 } from "lucide-react";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { AdminTable, Column } from "@/components/admin/ui/AdminTable";
import { AdminModal } from "@/components/admin/ui/AdminModal";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";

interface Product {
  id: string;
  name: string;
  category: string;
  price_cents: number;
  stock: number;
  status: string;
  image_url: string;
}

const CATEGORIES = [
  { label: "All Categories", value: "all" },
  { label: "Oil", value: "oil" },
  { label: "Vinegar", value: "vinegar" },
  { label: "Pantry", value: "pantry" },
  { label: "Wellness", value: "wellness" },
  { label: "Home", value: "home" },
  { label: "Gift Set", value: "gift_set" },
];

const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod_001",
    name: "Nocellara Extra Virgin Olive Oil",
    category: "oil",
    price_cents: 3495,
    stock: 142,
    status: "active",
    image_url: "/images/products/nocellara.jpg",
  },
  {
    id: "prod_002",
    name: "Blend Classico EVOO",
    category: "oil",
    price_cents: 2495,
    stock: 218,
    status: "active",
    image_url: "/images/products/classico.jpg",
  },
  {
    id: "prod_003",
    name: "Olio Nuovo — Limited Harvest",
    category: "oil",
    price_cents: 4295,
    stock: 34,
    status: "active",
    image_url: "/images/products/olio-nuovo.jpg",
  },
  {
    id: "prod_004",
    name: "Olio al Limone",
    category: "oil",
    price_cents: 2895,
    stock: 87,
    status: "active",
    image_url: "/images/products/limone.jpg",
  },
  {
    id: "prod_005",
    name: "Olio al Peperoncino",
    category: "oil",
    price_cents: 2895,
    stock: 63,
    status: "active",
    image_url: "/images/products/peperoncino.jpg",
  },
  {
    id: "prod_006",
    name: "Balsamico Tradizionale di Modena",
    category: "vinegar",
    price_cents: 3895,
    stock: 56,
    status: "active",
    image_url: "/images/products/balsamico.jpg",
  },
  {
    id: "prod_007",
    name: "White Wine Vinegar — Aged",
    category: "vinegar",
    price_cents: 1895,
    stock: 91,
    status: "active",
    image_url: "/images/products/white-vinegar.jpg",
  },
  {
    id: "prod_008",
    name: "Taralli al Olio d'Oliva",
    category: "pantry",
    price_cents: 1295,
    stock: 0,
    status: "draft",
    image_url: "/images/products/taralli.jpg",
  },
  {
    id: "prod_009",
    name: "The Essentials Gift Set",
    category: "gift_set",
    price_cents: 7995,
    stock: 24,
    status: "active",
    image_url: "/images/products/gift-essentials.jpg",
  },
  {
    id: "prod_010",
    name: "Olive Oil Body Balm",
    category: "wellness",
    price_cents: 2295,
    stock: 8,
    status: "draft",
    image_url: "/images/products/body-balm.jpg",
  },
];

const MANAGED_CATEGORIES = [
  { name: "Oil", count: 5 },
  { name: "Vinegar", count: 2 },
  { name: "Pantry", count: 1 },
  { name: "Wellness", count: 1 },
  { name: "Home", count: 0 },
  { name: "Gift Set", count: 1 },
];

export default function ProductsPage() {
  const router = useRouter();
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [categoriesModalOpen, setCategoriesModalOpen] = useState(false);

  const filtered =
    categoryFilter === "all"
      ? MOCK_PRODUCTS
      : MOCK_PRODUCTS.filter((p) => p.category === categoryFilter);

  const columns: Column<Product>[] = [
    {
      key: "image",
      label: "Image",
      className: "w-16",
      render: (item) => (
        <div className="w-10 h-10 rounded bg-olive-100 flex items-center justify-center overflow-hidden">
          <Package size={16} className="text-olive-400" />
        </div>
      ),
    },
    {
      key: "name",
      label: "Name",
      render: (item) => (
        <span className="font-medium text-olive-900">{item.name}</span>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (item) => (
        <span className="capitalize">{item.category.replace(/_/g, " ")}</span>
      ),
    },
    {
      key: "price_cents",
      label: "Price",
      render: (item) => (
        <span>${(item.price_cents / 100).toFixed(2)}</span>
      ),
    },
    {
      key: "stock",
      label: "Stock",
    },
    {
      key: "status",
      label: "Status",
      render: (item) => <StatusBadge status={item.status} />,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Products & Shop"
        description="Manage your product catalog, pricing, and inventory."
        action={{
          label: "Add Product",
          onClick: () => router.push("/admin/products/new"),
        }}
      />

      <div className="flex items-center gap-3 mb-4">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 border border-olive-200 rounded-sm text-sm text-charcoal bg-white focus:outline-none focus:ring-2 focus:ring-olive-500"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>

        <button
          onClick={() => setCategoriesModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 border border-olive-200 rounded-sm text-sm text-olive-700 hover:bg-olive-50 transition-colors"
        >
          <Grid3X3 size={14} />
          Manage Categories
        </button>
      </div>

      <AdminTable
        columns={columns}
        data={filtered}
        onRowClick={(item) => router.push(`/admin/products/${item.id}`)}
        emptyMessage="No products found for this category."
      />

      <AdminModal
        open={categoriesModalOpen}
        onClose={() => setCategoriesModalOpen(false)}
        title="Manage Categories"
      >
        <ul className="divide-y divide-olive-100">
          {MANAGED_CATEGORIES.map((cat) => (
            <li
              key={cat.name}
              className="flex items-center justify-between py-3"
            >
              <span className="text-sm text-olive-900 font-medium">
                {cat.name}
              </span>
              <span className="text-xs text-stone">
                {cat.count} product{cat.count !== 1 ? "s" : ""}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-stone mt-4">
          Category management coming soon. Contact support to add or rename
          categories.
        </p>
      </AdminModal>
    </div>
  );
}
