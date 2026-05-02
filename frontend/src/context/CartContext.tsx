"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { Product } from "@/types";

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ShippingMethod = "pickup" | "flat_rate" | "free";

export interface ShippingOption {
  method: ShippingMethod;
  label: string;
  description: string;
  cost: number; // cents
  available: boolean;
}

const FREE_SHIPPING_MIN_ITEMS = 5;
const FLAT_RATE_BASE = 800; // $8.00
const FLAT_RATE_PER_ITEM = 100; // $1.00 per item

export function calculateFlatRate(itemCount: number): number {
  return FLAT_RATE_BASE + FLAT_RATE_PER_ITEM * itemCount;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, qty?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  shippingMethod: ShippingMethod;
  setShippingMethod: (method: ShippingMethod) => void;
  shippingOptions: ShippingOption[];
  shippingCost: number;
  total: number;
  formatPrice: (cents: number) => string;
}

const CartContext = createContext<CartContextType | null>(null);

const CART_KEY = "mazzone-cart";
const SHIPPING_KEY = "mazzone-shipping";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function loadShipping(): ShippingMethod {
  if (typeof window === "undefined") return "flat_rate";
  try {
    const raw = localStorage.getItem(SHIPPING_KEY);
    if (raw === "pickup" || raw === "flat_rate" || raw === "free") return raw;
    return "flat_rate";
  } catch {
    return "flat_rate";
  }
}

function persist(items: CartItem[], shipping: ShippingMethod) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    localStorage.setItem(SHIPPING_KEY, shipping);
  } catch {
    // localStorage full or unavailable
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [shippingMethod, setShippingMethodState] = useState<ShippingMethod>("flat_rate");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setItems(loadCart());
    setShippingMethodState(loadShipping());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) persist(items, shippingMethod);
  }, [items, shippingMethod, loaded]);

  const addItem = useCallback((product: Product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      }
      return [...prev, { product, quantity: qty }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.product.id !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId ? { ...i, quantity: qty } : i
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setShippingMethodState("flat_rate");
  }, []);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce(
    (sum, i) => sum + i.product.price_cents * i.quantity,
    0
  );

  const freeShippingAvailable = itemCount >= FREE_SHIPPING_MIN_ITEMS;

  const shippingOptions: ShippingOption[] = useMemo(() => [
    {
      method: "pickup" as const,
      label: "Local Pickup",
      description: "Sarasota, FL",
      cost: 0,
      available: true,
    },
    {
      method: "flat_rate" as const,
      label: "Flat Rate Shipping",
      description: itemCount > 0
        ? `$${((FLAT_RATE_BASE + FLAT_RATE_PER_ITEM * itemCount) / 100).toFixed(2)} for ${itemCount} item${itemCount !== 1 ? "s" : ""}`
        : "$9.00 for 1 item",
      cost: calculateFlatRate(itemCount),
      available: true,
    },
    {
      method: "free" as const,
      label: "Free Shipping",
      description: freeShippingAvailable
        ? "Orders of 5+ items"
        : `Add ${FREE_SHIPPING_MIN_ITEMS - itemCount} more item${FREE_SHIPPING_MIN_ITEMS - itemCount !== 1 ? "s" : ""} to qualify`,
      cost: 0,
      available: freeShippingAvailable,
    },
  ], [itemCount, freeShippingAvailable]);

  // Auto-correct if selected method becomes unavailable
  const setShippingMethod = useCallback((method: ShippingMethod) => {
    setShippingMethodState(method);
  }, []);

  const effectiveMethod =
    shippingMethod === "free" && !freeShippingAvailable
      ? "flat_rate"
      : shippingMethod;

  const shippingCost = useMemo(() => {
    if (effectiveMethod === "pickup") return 0;
    if (effectiveMethod === "free") return 0;
    return calculateFlatRate(itemCount);
  }, [effectiveMethod, itemCount]);

  const total = subtotal + shippingCost;

  const formatPrice = useCallback(
    (cents: number) => `$${(cents / 100).toFixed(2)}`,
    []
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        shippingMethod: effectiveMethod,
        setShippingMethod,
        shippingOptions,
        shippingCost,
        total,
        formatPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
