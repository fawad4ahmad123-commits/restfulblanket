import { X } from 'lucide-react';

interface CartHeaderProps {
  title: string;
}

export default function CartHeader({ title }: CartHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
      <h2 className="font-serif text-lg text-stone-900">{title}</h2>
    </div>
  );
}
