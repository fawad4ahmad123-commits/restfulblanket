import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { WooProduct } from '@/src/lib/types';
import SearchLoadingBar from './search-loading-bar';
import {
  CATEGORIES,
  NO_RESULT_SUGGESTIONS,
  TRENDING_SEARCHES,
} from './constants';

function useProductSearch(query: string) {
  const [products, setProducts] = useState<WooProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(trimmed)}`,
          {
            signal: controller.signal,
          },
        );
        const data = await res.json();
        setProducts(data.products ?? []);
      } catch {
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  return { products, loading };
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="px-6 pt-5 pb-2 text-sm text-[#392A22]/40">{children}</p>;
}

function Pill({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="whitespace-nowrap rounded-full border border-[#392A22]/10 bg-white px-4 py-2 text-sm text-[#392A22] transition-colors hover:bg-[#392A22]/5"
    >
      {children}
    </button>
  );
}

function SearchStart({
  onSelectTerm,
}: {
  onSelectTerm: (term: string) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#392A22]/10 bg-white">
      <SectionLabel>Trending Searches</SectionLabel>
      <div className="flex flex-wrap gap-2 px-6 pb-5">
        {TRENDING_SEARCHES.map((term) => (
          <Pill key={term} onClick={() => onSelectTerm(term)}>
            {term}
          </Pill>
        ))}
      </div>

      <SectionLabel>Browse Categories</SectionLabel>
      <div className="border-t border-[#392A22]/10">
        {CATEGORIES.map(({ label, count, icon: Icon }) => (
          <button
            key={label}
            type="button"
            className="flex w-full items-center justify-between border-b border-[#392A22]/10 px-6 py-4 text-left last:border-b-0 hover:bg-[#392A22]/5"
          >
            <span className="flex items-center gap-3 text-[#392A22]">
              <Icon className="size-4 text-[#392A22]/50" />
              {label}
            </span>
            <span className="rounded-full border border-[#392A22]/10 px-3 py-1 text-xs text-[#392A22]/50">
              {count} products
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function SearchResults({ products }: { products: WooProduct[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#392A22]/10 bg-white">
      <SectionLabel>Results</SectionLabel>
      <div className="border-t border-[#392A22]/10">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="flex items-center justify-between gap-4 border-b border-[#392A22]/10 px-6 py-3 text-left last:border-b-0 hover:bg-[#392A22]/5"
          >
            <span className="flex items-center gap-3 text-[#392A22]">
              {product.images?.[0]?.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.images[0].src}
                  alt=""
                  className="size-9 rounded-lg object-cover"
                />
              ) : (
                <Search className="size-4 text-[#392A22]/40" />
              )}
              {product.name}
            </span>
            <span
              className="text-sm font-medium text-[#392A22]"
              dangerouslySetInnerHTML={{
                __html: product.price ? `€${product.price}` : '',
              }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

function SearchEmpty({
  query,
  onSelectTerm,
}: {
  query: string;
  onSelectTerm: (term: string) => void;
}) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <Search className="mb-4 size-8 text-[#392A22]/30" />
      <p className="text-base font-medium text-[#392A22]">
        No result for &ldquo;{query}&rdquo;
      </p>
      <p className="mt-1 text-sm text-[#392A22]/50">
        We don&apos;t carry this yet — try one of these instead;
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {NO_RESULT_SUGGESTIONS.map((term) => (
          <Pill key={term} onClick={() => onSelectTerm(term)}>
            {term}
          </Pill>
        ))}
      </div>
    </div>
  );
}

export default function SearchPage({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');
  const { products, loading } = useProductSearch(query);

  const hasQuery = query.trim().length > 0;
  const hasResults = products.length > 0;

  return (
    <div className="min-h-screen bg-[#FAF3EC]">
      <div className="mx-auto max-w-2xl px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="flex flex-1 items-center gap-3 rounded-full border border-[#392A22]/10 bg-white px-4 py-3">
            <Search className="size-4 shrink-0 text-[#392A22]/40" />
            {loading ? (
              <SearchLoadingBar />
            ) : (
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search your item..."
                className="flex-1 bg-transparent text-sm text-[#392A22] placeholder:text-[#392A22]/40 focus:outline-none"
              />
            )}
            {hasQuery && !loading && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
              >
                <X className="size-4 text-[#392A22]/40" />
              </button>
            )}
          </div>
          <button type="button" onClick={onClose} aria-label="Close search">
            <X className="size-5 text-[#392A22]/60" />
          </button>
        </div>

        <div className="mt-4">
          {!hasQuery && <SearchStart onSelectTerm={setQuery} />}
          {hasQuery && hasResults && !loading && (
            <SearchResults products={products} />
          )}
          {hasQuery && !hasResults && !loading && (
            <SearchEmpty query={query} onSelectTerm={setQuery} />
          )}
        </div>
      </div>
    </div>
  );
}
