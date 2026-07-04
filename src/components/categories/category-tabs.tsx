import Image from 'next/image';

const STATIC_CATEGORY_ORDER = [
  {
    slug: 'tyngdedyner',
    label: 'Tyngdedyner',
    image: '/categories/tyngdedyner.jpg',
  },
  {
    slug: 'boern',
    label: 'Børn',
    image: '/categories/boern.jpg',
  },
  {
    slug: 'voksne',
    label: 'Voksne',
    image: '/categories/voksne.jpg',
  },
];

export function CategoryTabs({
  categories = [],
  activeCategories = [],
  onSelect,
}: any) {
  const mapped = STATIC_CATEGORY_ORDER.map((staticCat) => {
    const apiCat = categories.find((c: any) => c.slug === staticCat.slug);
    return {
      id: apiCat?.id || staticCat.slug,
      slug: staticCat.slug,
      label: apiCat?.name || staticCat.label,
      image: apiCat?.image?.src || staticCat.image,
    };
  });

  return (
    <div className="flex gap-2 overflow-x-auto cursor-pointer">
      {mapped.map((category: any) => {
        const isActive = activeCategories.includes(category.slug);
        return (
          <div
            key={category.slug}
            onClick={() => onSelect?.(category.slug)}
            className="flex flex-col items-center gap-2 min-w-[90px]"
          >
            <div
              className={`relative h-14 w-14 overflow-hidden rounded-full border ${
                isActive ? 'border-[#35281E]' : 'border-[#E9DDD4]'
              }`}
            >
              <Image
                src={category.image}
                alt={category.label}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xs text-[#6B625B] whitespace-nowrap">
              {category.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
