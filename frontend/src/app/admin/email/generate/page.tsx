"use client";

import { useState } from "react";
import { PageHeader } from "@/components/admin/ui/PageHeader";

const POSTS = [
  { id: "1", title: "The Art of Perfect Bruschetta", checked: false },
  { id: "2", title: "Harvest 2025: A Season of Promise", checked: false },
  { id: "3", title: "Nonna's Sunday Sauce Tradition", checked: false },
  { id: "4", title: "What 'Extra Virgin' Really Means", checked: false },
];

const PRODUCTS = [
  { id: "1", title: "Nocellara Extra Virgin Olive Oil", checked: false },
  { id: "2", title: "Olio Nuovo 2025", checked: false },
  { id: "3", title: "Balsamico Tradizionale", checked: false },
  { id: "4", title: "Gift Set La Tavola", checked: false },
];

export default function GenerateNewsletter() {
  const [posts, setPosts] = useState(POSTS);
  const [products, setProducts] = useState(PRODUCTS);
  const [preview, setPreview] = useState("");

  const togglePost = (id: string) =>
    setPosts((p) => p.map((x) => (x.id === id ? { ...x, checked: !x.checked } : x)));
  const toggleProduct = (id: string) =>
    setProducts((p) => p.map((x) => (x.id === id ? { ...x, checked: !x.checked } : x)));

  const generate = () => {
    const selectedPosts = posts.filter((p) => p.checked);
    const selectedProducts = products.filter((p) => p.checked);

    const html = `
<div style="max-width: 600px; margin: 0 auto; font-family: 'Inter', sans-serif; color: #2D2D2D;">
  <div style="background: #1f331f; padding: 32px; text-align: center;">
    <h1 style="font-family: 'Playfair Display', serif; color: #d4b56a; margin: 0; font-size: 28px;">Mazzone Olive Oil</h1>
    <p style="color: #a8c3a8; margin: 8px 0 0; font-size: 14px;">Monthly Newsletter</p>
  </div>

  <div style="padding: 32px; background: #FEFCF9;">
    <p>Ciao! Here's what's new from the grove this month.</p>

    ${selectedPosts.length > 0 ? `
    <h2 style="font-family: 'Playfair Display', serif; color: #1f331f; border-bottom: 1px solid #e6ede6; padding-bottom: 8px;">From the Journal</h2>
    ${selectedPosts.map((p) => `<p style="margin: 12px 0;"><strong>${p.title}</strong><br><a href="#" style="color: #4a7c4a;">Read more →</a></p>`).join("")}
    ` : ""}

    ${selectedProducts.length > 0 ? `
    <h2 style="font-family: 'Playfair Display', serif; color: #1f331f; border-bottom: 1px solid #e6ede6; padding-bottom: 8px;">Featured Products</h2>
    ${selectedProducts.map((p) => `<p style="margin: 12px 0;"><strong>${p.title}</strong><br><a href="#" style="color: #4a7c4a;">Shop now →</a></p>`).join("")}
    ` : ""}

    <div style="text-align: center; margin-top: 32px;">
      <a href="#" style="background: #2d4a2d; color: white; padding: 12px 32px; text-decoration: none; display: inline-block;">Visit the Shop</a>
    </div>
  </div>

  <div style="background: #f4f7f4; padding: 24px; text-align: center; font-size: 12px; color: #6B6B6B;">
    <p>Mazzone Olive Oil · Montclair, NJ</p>
    <p><a href="#" style="color: #6B6B6B;">Unsubscribe</a></p>
  </div>
</div>`.trim();

    setPreview(html);
  };

  return (
    <div>
      <PageHeader title="Generate Newsletter" description="Build a newsletter from recent content" backHref="/admin/email" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-sm border border-olive-100 p-5">
            <h3 className="font-serif text-lg text-olive-900 mb-3">Select Journal Posts</h3>
            <div className="space-y-2">
              {posts.map((p) => (
                <label key={p.id} className="flex items-center gap-3 py-1.5">
                  <input type="checkbox" checked={p.checked} onChange={() => togglePost(p.id)} className="rounded border-olive-300" />
                  <span className="text-sm text-olive-800">{p.title}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-sm border border-olive-100 p-5">
            <h3 className="font-serif text-lg text-olive-900 mb-3">Feature Products</h3>
            <div className="space-y-2">
              {products.map((p) => (
                <label key={p.id} className="flex items-center gap-3 py-1.5">
                  <input type="checkbox" checked={p.checked} onChange={() => toggleProduct(p.id)} className="rounded border-olive-300" />
                  <span className="text-sm text-olive-800">{p.title}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={generate}
              className="bg-olive-800 text-white px-6 py-2 rounded-sm text-sm font-medium hover:bg-olive-700"
            >
              Generate Preview
            </button>
            {preview && (
              <button
                onClick={() => alert("Campaign created from newsletter (demo)")}
                className="bg-gold-500 text-olive-950 px-6 py-2 rounded-sm text-sm font-medium hover:bg-gold-400"
              >
                Create Campaign
              </button>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-serif text-lg text-olive-900 mb-3">Preview</h3>
          <div className="bg-white rounded-sm border border-olive-100 min-h-[500px]">
            {preview ? (
              <div dangerouslySetInnerHTML={{ __html: preview }} />
            ) : (
              <div className="flex items-center justify-center h-[500px]">
                <p className="text-stone text-sm">Select content and click Generate Preview</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
