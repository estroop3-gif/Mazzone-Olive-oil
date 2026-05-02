const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(error.detail || `HTTP ${res.status}`);
  }

  return res.json();
}

export const api = {
  products: {
    list: (params?: { category?: string; featured?: boolean }) => {
      const searchParams = new URLSearchParams();
      if (params?.category) searchParams.set("category", params.category);
      if (params?.featured !== undefined) searchParams.set("featured", String(params.featured));
      const qs = searchParams.toString();
      return request<any[]>(`/products${qs ? `?${qs}` : ""}`);
    },
    get: (slug: string) => request<any>(`/products/${slug}`),
  },
  orders: {
    create: (data: any) => request<any>("/orders", { method: "POST", body: JSON.stringify(data) }),
    get: (id: string) => request<any>(`/orders/${id}`),
  },
  subscriptions: {
    create: (data: any) => request<any>("/subscriptions", { method: "POST", body: JSON.stringify(data) }),
    list: (customerId: string) => request<any[]>(`/subscriptions/customer/${customerId}`),
  },
  blog: {
    list: (category?: string) => {
      const qs = category ? `?category=${category}` : "";
      return request<any[]>(`/blog${qs}`);
    },
    get: (slug: string) => request<any>(`/blog/${slug}`),
  },
  events: {
    list: (params?: { event_type?: string; upcoming_only?: boolean }) => {
      const searchParams = new URLSearchParams();
      if (params?.event_type) searchParams.set("event_type", params.event_type);
      if (params?.upcoming_only !== undefined) searchParams.set("upcoming_only", String(params.upcoming_only));
      const qs = searchParams.toString();
      return request<any[]>(`/events${qs ? `?${qs}` : ""}`);
    },
    get: (slug: string) => request<any>(`/events/${slug}`),
  },
  newsletter: {
    subscribe: (email: string, firstName?: string) =>
      request<any>("/newsletter", { method: "POST", body: JSON.stringify({ email, first_name: firstName }) }),
  },
};
