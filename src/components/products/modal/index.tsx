'use client';

import { X } from 'lucide-react';

const weightTable = [
  { body: '5-10 kg', recommended: '2 kg' },
  { body: '10-15 kg', recommended: '3 kg' },
  { body: '15+ kg', recommended: '4 kg' },
];

interface SizeGuideButtonProps {
  open: boolean;
  onClose: () => void;
}

const SizeGuideButton = ({ open, onClose }: SizeGuideButtonProps) => {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-[560px] overflow-y-auto rounded-2xl bg-white p-5 shadow-xl sm:p-8"
      >
        <button
          onClick={onClose}
          aria-label="Luk vægtguide"
          className="absolute right-4 top-4 z-10 cursor-pointer rounded-full p-1 text-[#3A2A21] sm:right-6 sm:top-6"
        >
          <X size={22} />
        </button>

        <h2 className="pr-10 font-serif text-xl text-[#3A2A21] sm:text-2xl">
          Vægtguide: Tyngdedyne
        </h2>

        <p className="mt-4 text-sm leading-relaxed text-[#3A2A21]/80 sm:text-[15px]">
          Når det gælder vægten på en tyngdedyne, opnås den bedste effekt på
          søvnen typisk, når dynen vejer 8-12 % af din kropsvægt.
        </p>

        <h3 className="mt-6 text-base font-semibold text-[#3A2A21] sm:text-lg">
          Anbefalet vægt:
        </h3>

        <div className="mt-3 overflow-x-auto rounded-xl border border-[#3A2A21]/10">
          <table className="w-full min-w-[280px] text-left text-sm">
            <thead>
              <tr className="bg-[#3A2A21] text-white">
                <th className="px-4 py-3 sm:px-5">Din kropsvægt</th>
                <th className="px-4 py-3 sm:px-5">Anbefalet kg</th>
              </tr>
            </thead>

            <tbody>
              {weightTable.map((row, index) => (
                <tr
                  key={row.body}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-[#F7F3F0]'}
                >
                  <td className="px-4 py-3 sm:px-5">{row.body}</td>
                  <td className="px-4 py-3 sm:px-5">{row.recommended}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-[#3A2A21]/80 sm:text-[15px]">
          Hvis du ligger mellem to vægtklasser, anbefaler vi generelt, at du
          vælger den højere vægtklasse.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-[#3A2A21]/80 sm:text-[15px]">
          Hvis du er i tvivl, er du altid velkommen til at ringe til os på{' '}
          <a
            href="tel:+4529905099"
            className="font-semibold text-[#3A2A21] underline-offset-2 hover:underline"
          >
            +45 29 90 50 99
          </a>{' '}
          eller{' '}
          <a
            href="tel:+4529822973"
            className="font-semibold text-[#3A2A21] underline-offset-2 hover:underline"
          >
            +45 29 82 29 73
          </a>{' '}
          eller sende en e-mail til{' '}
          <a
            href="mailto:kernero@restfulblanket.dk"
            className="font-semibold text-[#3A2A21] underline"
          >
            kernero@restfulblanket.dk
          </a>
        </p>
      </div>
    </div>
  );
};

export default SizeGuideButton;
