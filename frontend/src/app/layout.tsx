import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mazzone Olive Oil | Dal cuore della Sicilia",
  description:
    "Premium extra virgin olive oil from our family groves in Sicily. Three generations of tradition, cold-pressed and shipped to your table.",
  keywords: [
    "olive oil",
    "sicilian olive oil",
    "extra virgin",
    "EVOO",
    "Italian olive oil",
    "Mazzone",
    "cold pressed",
  ],
  openGraph: {
    title: "Mazzone Olive Oil",
    description: "Dal cuore della Sicilia, alla tua tavola.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
