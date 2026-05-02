import Link from "next/link";

const footerLinks = {
  shop: [
    { name: "Olive Oils", href: "/shop?category=oil" },
    { name: "Vinegars", href: "/shop?category=vinegar" },
    { name: "Pantry", href: "/shop?category=pantry" },
    { name: "Wellness", href: "/shop?category=wellness" },
    { name: "Home Goods", href: "/shop?category=home" },
    { name: "Gift Sets", href: "/shop?category=gift_set" },
  ],
  company: [
    { name: "Our Family", href: "/our-family" },
    { name: "Events & Classes", href: "/events" },
    { name: "Journal", href: "/journal" },
    { name: "Il Club", href: "/club" },
  ],
  support: [
    { name: "Shipping & Returns", href: "/shipping" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
    { name: "Wholesale", href: "/wholesale" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-olive-900 text-olive-100">
      {/* Newsletter */}
      <div className="border-b border-olive-800">
        <div className="container-wide py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-serif text-heading-sm text-white">
              Dalla nostra famiglia alla tua
            </h3>
            <p className="text-olive-300 mt-2">
              Recipes, harvest updates, and exclusive offers.
            </p>
          </div>
          <form className="flex w-full md:w-auto">
            <input
              type="email"
              placeholder="Your email"
              className="px-5 py-3 bg-olive-800 border border-olive-700 text-white placeholder:text-olive-400 rounded-l-sm focus:outline-none focus:border-gold-500 w-full md:w-72"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gold-500 text-olive-950 font-medium rounded-r-sm hover:bg-gold-400 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="container-wide py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <Link href="/" className="font-serif text-2xl text-white">
            Mazzone
          </Link>
          <p className="mt-4 text-sm text-olive-300 leading-relaxed">
            Fatto con amore in Sicilia.
            <br />
            Three generations of tradition.
          </p>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-wider text-olive-400 mb-4">
            La Bottega
          </h4>
          <ul className="space-y-3">
            {footerLinks.shop.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-sm text-olive-200 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-wider text-olive-400 mb-4">
            La Famiglia
          </h4>
          <ul className="space-y-3">
            {footerLinks.company.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-sm text-olive-200 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-wider text-olive-400 mb-4">
            Support
          </h4>
          <ul className="space-y-3">
            {footerLinks.support.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-sm text-olive-200 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-olive-800">
        <div className="container-wide py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-olive-400">
          <p>&copy; {new Date().getFullYear()} Mazzone Olive Oil. All rights reserved.</p>
          <p className="font-serif italic">Dal cuore della Sicilia, alla tua tavola.</p>
        </div>
      </div>
    </footer>
  );
}
