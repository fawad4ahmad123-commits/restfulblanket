import { X } from 'lucide-react';

interface CartHeaderProps {
  title: string;
}

export default function CartHeader({ title }: CartHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-stone-200 px-4 py-4 md:px-6 md:py-5">
      <h2 className="font-serif text-base md:text-lg text-stone-900">
        {title}
      </h2>
    </div>
  );
}
