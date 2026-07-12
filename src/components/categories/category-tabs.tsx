import Image from 'next/image';

export function CategoryTabs({
  categories = [],
  activeCategories = [],
  onSelect,
}: any) {
  const currentParent = activeCategories[activeCategories.length - 1];

  const selectedCategory = categories.find(
    (cat: any) => cat.slug === currentParent,
  );

  const mapped = categories
    .filter((cat: any) => {
      if (!selectedCategory) {
        return cat.parent === 0;
      }

      return cat.parent === selectedCategory.id;
    })
    .map((cat: any) => ({
      id: cat.id,
      slug: cat.slug,
      label: cat.name,
      image: cat.image?.src || '/categories/default.jpg',
      parent: cat.parent,
    }));

  return (
    <div className="flex gap-2 overflow-x-auto cursor-pointer">
      {mapped.map((category: any) => {
        const isActive = activeCategories.includes(category.slug.toLowerCase());

        return (
          <div
            key={category.id}
            onClick={() => {
              const slug = String(category.slug).toLowerCase();

              const updated = isActive
                ? activeCategories.filter((s: string) => s !== slug)
                : [...activeCategories, slug];

              onSelect?.(updated);
            }}
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
