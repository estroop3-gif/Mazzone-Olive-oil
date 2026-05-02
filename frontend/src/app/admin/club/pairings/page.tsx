"use client";

import { useState } from "react";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { AdminModal } from "@/components/admin/ui/AdminModal";
import { AdminFormField } from "@/components/admin/ui/AdminFormField";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { ExternalLink } from "lucide-react";

interface Pairing {
  month: string;
  oil: string;
  complement: string;
  description: string;
  recipeUrl: string;
  shipmentStatus: string;
}

const PAIRINGS: Pairing[] = [
  {
    month: "November 2026",
    oil: "Olio Nuovo (First Press)",
    complement: "Burrata & Heirloom Tomatoes",
    description: "Celebrate the new harvest with fresh burrata drizzled in just-pressed olio nuovo, paired with late-season heirloom tomatoes and torn basil.",
    recipeUrl: "https://mazzone.com/recipes/olio-nuovo-burrata",
    shipmentStatus: "upcoming",
  },
  {
    month: "October 2026",
    oil: "Nocellara Extra Virgin",
    complement: "Aged Parmigiano & Honey",
    description: "A bold Nocellara with fruity notes, paired with 36-month aged Parmigiano Reggiano and wildflower honey from Puglia.",
    recipeUrl: "https://mazzone.com/recipes/nocellara-parmigiano",
    shipmentStatus: "upcoming",
  },
  {
    month: "September 2026",
    oil: "Coratina Intense Blend",
    complement: "Grilled Lamb Chops",
    description: "Robust and peppery Coratina oil meets herb-crusted grilled lamb chops with roasted garlic and rosemary.",
    recipeUrl: "https://mazzone.com/recipes/coratina-lamb",
    shipmentStatus: "upcoming",
  },
  {
    month: "August 2026",
    oil: "Olio al Limone",
    complement: "Fresh Seafood Crudo",
    description: "Bright lemon-infused oil drizzled over thinly sliced branzino crudo with capers, fennel, and sea salt.",
    recipeUrl: "https://mazzone.com/recipes/limone-crudo",
    shipmentStatus: "scheduled",
  },
  {
    month: "July 2026",
    oil: "Peranzana Delicato",
    complement: "Summer Caprese Salad",
    description: "Mild and buttery Peranzana oil over vine-ripened tomatoes, buffalo mozzarella, and fresh basil leaves.",
    recipeUrl: "https://mazzone.com/recipes/peranzana-caprese",
    shipmentStatus: "shipped",
  },
  {
    month: "June 2026",
    oil: "Ogliarola Monocultivar",
    complement: "Rustic Bruschetta",
    description: "Herbaceous Ogliarola oil on charred sourdough with garlic, cherry tomatoes, and a pinch of oregano.",
    recipeUrl: "https://mazzone.com/recipes/ogliarola-bruschetta",
    shipmentStatus: "delivered",
  },
];

const OIL_OPTIONS = [
  { label: "Nocellara Extra Virgin", value: "nocellara" },
  { label: "Coratina Intense Blend", value: "coratina" },
  { label: "Peranzana Delicato", value: "peranzana" },
  { label: "Ogliarola Monocultivar", value: "ogliarola" },
  { label: "Olio al Limone", value: "limone" },
  { label: "Olio Nuovo (First Press)", value: "olio-nuovo" },
];

export default function ClubPairings() {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    month: "",
    oil: "",
    complement: "",
    description: "",
    recipeUrl: "",
  });

  const updateForm = (key: string) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <PageHeader
        title="Monthly Pairings"
        description="Curate each month's oil and food pairing experience for club members."
        action={{ label: "Create Pairing", onClick: () => setModalOpen(true) }}
        backHref="/admin/club"
      />

      {/* Pairing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PAIRINGS.map((p) => (
          <div
            key={p.month}
            className="bg-white rounded-sm border border-olive-100 p-5 flex flex-col"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-serif text-base text-olive-900">{p.month}</h3>
              <StatusBadge status={p.shipmentStatus} />
            </div>
            <p className="text-sm font-medium text-olive-800 mb-1">{p.oil}</p>
            <p className="text-sm text-gold-700 font-medium mb-2">paired with {p.complement}</p>
            <p className="text-xs text-stone leading-relaxed mb-3 flex-1">{p.description}</p>
            <a
              href={p.recipeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-olive-600 hover:text-olive-800 transition-colors"
            >
              <ExternalLink size={12} />
              View Recipe
            </a>
          </div>
        ))}
      </div>

      {/* Create Pairing Modal */}
      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title="Create Monthly Pairing">
        <div className="space-y-4">
          <AdminFormField
            label="Month"
            type="date"
            value={form.month}
            onChange={updateForm("month")}
            required
          />
          <AdminFormField
            label="Olive Oil"
            type="select"
            value={form.oil}
            onChange={updateForm("oil")}
            options={OIL_OPTIONS}
            required
          />
          <AdminFormField
            label="Complement Name"
            type="text"
            value={form.complement}
            onChange={updateForm("complement")}
            placeholder="e.g., Aged Pecorino & Fig Jam"
            required
          />
          <AdminFormField
            label="Description"
            type="textarea"
            value={form.description}
            onChange={updateForm("description")}
            placeholder="Describe the pairing experience..."
            required
          />
          <AdminFormField
            label="Recipe URL"
            type="url"
            value={form.recipeUrl}
            onChange={updateForm("recipeUrl")}
            placeholder="https://mazzone.com/recipes/..."
          />
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 text-sm text-stone hover:text-olive-900 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert("Pairing created successfully!");
                setModalOpen(false);
              }}
              className="bg-olive-800 text-white px-4 py-2 rounded-sm text-sm font-medium hover:bg-olive-700 transition-colors"
            >
              Create Pairing
            </button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
