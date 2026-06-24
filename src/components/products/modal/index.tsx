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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[560px] rounded-2xl bg-white p-8 shadow-xl"
      >
        <button
          onClick={onClose}
          aria-label="Close size guide"
          className="absolute right-6 top-6 rounded-full text-[#3A2A21] cursor-pointer"
        >
          <X size={22} />
        </button>

        <h2 className="font-serif text-2xl text-[#3A2A21]">
          Size guide: Weighted Blanket
        </h2>

        <p className="mt-4 text-[15px] leading-relaxed text-[#3A2A21]/80">
          When it comes to the weight of the weighted blanket, the weighted
          blanket is most effective in improving your sleep when it weighs 8-12%
          of your body weight.
        </p>

        <h3 className="mt-6 text-lg font-semibold text-[#3A2A21]">
          Recommended weight:
        </h3>

        <div className="mt-3 overflow-hidden rounded-xl border border-[#3A2A21]/10">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-[#3A2A21] text-white">
                <th className="px-5 py-3">Your Body weight</th>
                <th className="px-5 py-3">Recommended kg</th>
              </tr>
            </thead>

            <tbody>
              {weightTable.map((row, index) => (
                <tr
                  key={row.body}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-[#F7F3F0]'}
                >
                  <td className="px-5 py-3">{row.body}</td>
                  <td className="px-5 py-3">{row.recommended}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-[15px] leading-relaxed text-[#3A2A21]/80">
          If you are between two weight classes, we generally recommend that you
          move up one weight class.
        </p>

        <p className="mt-4 text-[15px] leading-relaxed text-[#3A2A21]/80">
          If you are in doubt, you are always welcome to call us at{' '}
          <a
            href="tel:+4529905099"
            className="font-semibold text-[#3A2A21] underline-offset-2 hover:underline"
          >
            +45 29 90 50 99
          </a>{' '}
          or{' '}
          <a
            href="tel:+4529822973"
            className="font-semibold text-[#3A2A21] underline-offset-2 hover:underline"
          >
            +45 29 82 29 73
          </a>{' '}
          or send an email at{' '}
          <a
            href="mailto:kernero@restfulblanket.dk"
            className="font-semibold text-[#3A2A21] underline"
          >
            kernero@restfulblanket.dk
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default SizeGuideButton;
