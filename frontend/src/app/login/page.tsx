"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, user, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  // If already logged in, redirect appropriately
  useEffect(() => {
    if (!authLoading && user) {
      router.replace(redirect ?? (isAdmin ? "/admin" : "/account"));
    }
  }, [user, isAdmin, authLoading, router, redirect]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: err } = await signIn(email, password);
    if (err) {
      setError(err);
      setLoading(false);
      return;
    }

    // Small delay for profile fetch, then redirect based on role
    setTimeout(() => {
      router.push(redirect ?? "/account");
    }, 500);
  };

  return (
    <div className="bg-white rounded-sm border border-olive-100 p-8 shadow-sm">
      <div className="text-center mb-8">
        <h1 className="font-serif text-heading text-olive-900">Mazzone</h1>
        <p className="text-stone text-sm mt-1">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-olive-800 mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 border border-olive-200 rounded-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-transparent"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-olive-800 mb-1.5">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 border border-olive-200 rounded-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-transparent"
            placeholder="••••••••"
            required
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-sm">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-olive-800 text-white py-2.5 rounded-sm font-medium hover:bg-olive-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <a href="/" className="text-sm text-olive-600 hover:text-olive-800">
          ← Back to site
        </a>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream pt-0">
      <div className="w-full max-w-md p-8">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
