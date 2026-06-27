import Image from 'next/image';
import { CATEGORIES } from './constants';

export function CategoryTabs() {
  return (
    <div className="flex flex-wrap gap-6">
      {CATEGORIES.map((category) => (
        <div key={category.id} className="flex flex-col items-center gap-2">
          <div className="relative h-14 w-14 overflow-hidden rounded-full border">
            <Image
              src={category.image}
              alt={category.label}
              fill
              className="object-cover"
            />
          </div>

          <span className="text-xs text-[#6B625B]">{category.label}</span>
        </div>
      ))}
    </div>
  );
}
