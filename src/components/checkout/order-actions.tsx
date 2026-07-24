import Link from 'next/link';

interface OrderActionsProps {
  orderId: string;
}

export default function OrderActions({ orderId }: OrderActionsProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <Link
        href={`/track-order?id=${orderId}`}
        className="flex h-12 w-full items-center justify-center rounded-full bg-[#2B2118] text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        Spor ordre
      </Link>

      <Link
        href="/shop"
        className="flex h-12 w-full items-center justify-center rounded-full border border-[#DAD0C2] bg-white text-sm font-medium text-[#2B2118] transition-colors hover:bg-[#F6EEE2]"
      >
        Fortsæt med at handle
      </Link>
    </div>
  );
}
