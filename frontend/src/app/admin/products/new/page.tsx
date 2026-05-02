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

export default function NewProductPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    category: "",
    price: "",
    size_ml: "",
    origin: "",
    harvest_year: "",
    stock_quantity: "",
    image_url: "",
    aroma: "",
    flavor: "",
    finish: "",
    featured: false,
  });

  const update = (field: string) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = () => {
    alert(
      "Product created (demo). In production this would save to the database and redirect to the product page."
    );
  };

  return (
    <div>
      <PageHeader title="New Product" backHref="/admin/products" />

      <div className="bg-white rounded-sm border border-olive-100 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AdminFormField
            label="Product Name"
            value={form.name}
            onChange={update("name")}
            placeholder="e.g. Nocellara Extra Virgin Olive Oil"
            required
          />
          <AdminFormField
            label="Slug"
            value={form.slug}
            onChange={update("slug")}
            placeholder="nocellara-evoo"
          />
        </div>

        <AdminFormField
          label="Description"
          type="textarea"
          value={form.description}
          onChange={update("description")}
          placeholder="Describe the product, its origin, and what makes it special..."
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
            placeholder="e.g. Castelvetrano, Sicily"
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
            placeholder="0"
          />
        </div>

        <AdminFormField
          label="Image URL"
          type="url"
          value={form.image_url}
          onChange={update("image_url")}
          placeholder="/images/products/your-product.jpg"
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
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-olive-100">
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
            Create Product
          </button>
        </div>
      </div>
    </div>
  );
}
