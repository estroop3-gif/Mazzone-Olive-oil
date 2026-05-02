"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { AdminFormField } from "@/components/admin/ui/AdminFormField";

const CATEGORY_OPTIONS = [
  { label: "Oil", value: "oil" },
  { label: "Vinegar", value: "vinegar" },
  { label: "Pantry", value: "pantry" },
  { label: "Wellness", value: "wellness" },
  { label: "Home", value: "home" },
  { label: "Gift Set", value: "gift_set" },
];

const MOCK_PRODUCT = {
  name: "Nocellara Extra Virgin Olive Oil",
  slug: "nocellara-evoo",
  description:
    "Single-varietal, cold-pressed Nocellara del Belice olives from our groves in western Sicily. Harvested early for a vibrant, peppery finish with notes of green almond and fresh-cut grass. Perfect drizzled over burrata, grilled fish, or rustic bread.",
  category: "oil",
  price: "34.95",
  size_ml: "500",
  origin: "Castelvetrano, Sicily",
  harvest_year: "2025",
  stock_quantity: "142",
  image_url: "/images/products/nocellara.jpg",
  aroma: "Fresh-cut grass, green tomato, artichoke",
  flavor: "Robust and peppery with green almond and a hint of bitter chicory",
  finish: "Long, warm peppery finish with lingering herbaceous notes",
  featured: true,
};

export default function EditProductPage() {
  const router = useRouter();

  const [form, setForm] = useState(MOCK_PRODUCT);

  const update = (field: string) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = () => {
    alert("Product saved (demo). Changes would be persisted to the database.");
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this product?")) {
      alert("Product deleted (demo).");
      router.push("/admin/products");
    }
  };

  return (
    <div>
      <PageHeader title="Edit Product" backHref="/admin/products" />

      <div className="bg-white rounded-sm border border-olive-100 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AdminFormField
            label="Product Name"
            value={form.name}
            onChange={update("name")}
            required
          />
          <AdminFormField
            label="Slug"
            value={form.slug}
            onChange={update("slug")}
            placeholder="url-friendly-name"
          />
        </div>

        <AdminFormField
          label="Description"
          type="textarea"
          value={form.description}
          onChange={update("description")}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <AdminFormField
            label="Category"
            type="select"
            value={form.category}
            onChange={update("category")}
            options={CATEGORY_OPTIONS}
            required
          />
          <AdminFormField
            label="Price ($)"
            type="number"
            value={form.price}
            onChange={update("price")}
            placeholder="0.00"
            required
          />
          <AdminFormField
            label="Size (ml)"
            type="number"
            value={form.size_ml}
            onChange={update("size_ml")}
            placeholder="500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <AdminFormField
            label="Origin"
            value={form.origin}
            onChange={update("origin")}
            placeholder="Region, Country"
          />
          <AdminFormField
            label="Harvest Year"
            value={form.harvest_year}
            onChange={update("harvest_year")}
            placeholder="2025"
          />
          <AdminFormField
            label="Stock Quantity"
            type="number"
            value={form.stock_quantity}
            onChange={update("stock_quantity")}
          />
        </div>

        <AdminFormField
          label="Image URL"
          type="url"
          value={form.image_url}
          onChange={update("image_url")}
          placeholder="/images/products/..."
        />

        {/* Tasting Notes */}
        <div>
          <h3 className="font-serif text-base text-olive-900 mb-3 border-b border-olive-100 pb-2">
            Tasting Notes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <AdminFormField
              label="Aroma"
              value={form.aroma}
              onChange={update("aroma")}
              placeholder="e.g. Fresh grass, green tomato"
            />
            <AdminFormField
              label="Flavor"
              value={form.flavor}
              onChange={update("flavor")}
              placeholder="e.g. Peppery, almond, herbaceous"
            />
            <AdminFormField
              label="Finish"
              value={form.finish}
              onChange={update("finish")}
              placeholder="e.g. Long, warm, peppery"
            />
          </div>
        </div>

        {/* Featured toggle */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="featured"
            checked={form.featured}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, featured: e.target.checked }))
            }
            className="w-4 h-4 rounded border-olive-300 text-olive-700 focus:ring-olive-500"
          />
          <label
            htmlFor="featured"
            className="text-sm font-medium text-olive-800"
          >
            Featured product (shown on homepage)
          </label>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-olive-100">
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-sm hover:bg-red-50 transition-colors"
          >
            Delete Product
          </button>
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/admin/products")}
              className="px-4 py-2 text-sm font-medium text-stone border border-olive-200 rounded-sm hover:bg-olive-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-white bg-olive-800 rounded-sm hover:bg-olive-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
