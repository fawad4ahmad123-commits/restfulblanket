import Image from 'next/image';
import type { TicketInfo } from '@/src/lib/foredrag/parse';

export default function TicketCard({ ticket }: { ticket: TicketInfo }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#efe3d6] bg-white shadow-sm md:flex">
      {ticket.image && (
        <div className="relative h-56 w-full md:h-auto md:w-72 md:flex-shrink-0">
          <Image
            src={ticket.image}
            alt={ticket.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 288px"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col justify-between gap-4 p-6 md:p-8">
        <div>
          <h3 className="text-xl font-semibold text-[#392A22] md:text-2xl">
            {ticket.title}
          </h3>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[#392A22]/70">
            {ticket.price && (
              <span className="rounded-full bg-[#fdf9f6] px-3 py-1 font-medium text-[#392A22] ring-1 ring-[#efe3d6]">
                {ticket.price}
              </span>
            )}
            {ticket.stock && <span>{ticket.stock}</span>}
          </div>
        </div>
        {ticket.productUrl && (
          <a
            href={ticket.productUrl}
            className="inline-flex w-fit items-center justify-center rounded-full bg-[#392A22] px-6 py-3 text-sm font-medium text-[#fdf9f6] transition-opacity hover:opacity-90"
          >
            Køb billet
          </a>
        )}
      </div>
    </div>
  );
}
