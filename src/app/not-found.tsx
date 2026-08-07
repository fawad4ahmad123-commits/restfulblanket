import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Siden blev ikke fundet - 404 | RestfulBlanket',
  description:
    'Den side, du leder efter, findes ikke længere. Gå tilbage til forsiden eller udforsk vores populære produkter.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  const popularPages = [
    { href: '/shop', label: 'Tyngdedyner' },
    { href: '/guides', label: 'Guides & Inspiration' },
    { href: '/about', label: 'Om RestfulBlanket' },
    { href: '/contact', label: 'Kontakt os' },
  ];

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FDF9F6] px-6 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-8 inline-flex h-28 w-28 items-center justify-center rounded-full border border-[#E9DDD4] bg-white shadow-sm">
          <span className="text-5xl font-bold text-[#392A22]">404</span>
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight text-[#35281E] md:text-5xl">
          Oops! Siden blev ikke fundet
        </h1>

        <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-[#35281E]/70 md:text-lg">
          Den side, du leder efter, findes ikke længere, er blevet flyttet,
          eller URL&apos;en er forkert. Lad os hjælpe dig tilbage til det
          rigtige sted.
        </p>

        <nav
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          aria-label="Handlingsmuligheder"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#392A22] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#2D211A] focus:outline-none focus:ring-2 focus:ring-[#392A22] focus:ring-offset-2"
            aria-label="Gå til forsiden"
          >
            <Home className="h-4 w-4" />
            Til forsiden
          </Link>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full border border-[#E9DDD4] bg-white px-6 py-3 text-sm font-medium text-[#35281E] transition-all duration-300 hover:bg-[#FAF4EE] focus:outline-none focus:ring-2 focus:ring-[#392A22] focus:ring-offset-2"
            aria-label="Udforsk produkter i shoppen"
          >
            <Search className="h-4 w-4" />
            Udforsk produkter
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[#E9DDD4] bg-white px-6 py-3 text-sm font-medium text-[#35281E] transition-all duration-300 hover:bg-[#FAF4EE] focus:outline-none focus:ring-2 focus:ring-[#392A22] focus:ring-offset-2"
            aria-label="Tilbage til forsiden"
          >
            <ArrowLeft className="h-4 w-4" />
            Gå tilbage
          </Link>
        </nav>

        <section
          className="mt-16 rounded-3xl border border-[#E9DDD4] bg-white p-6 text-left shadow-sm"
          aria-labelledby="popular-pages-title"
        >
          <h2
            id="popular-pages-title"
            className="mb-4 text-lg font-semibold text-[#35281E]"
          >
            Populære sider
          </h2>

          <div className="grid gap-3 sm:grid-cols-2">
            {popularPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="rounded-xl border border-[#E9DDD4] p-4 text-[#35281E] transition hover:bg-[#FAF4EE] focus:outline-none focus:ring-2 focus:ring-[#392A22] focus:ring-offset-2"
              >
                {page.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
