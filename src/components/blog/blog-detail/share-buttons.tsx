import { Link2, Mail, Share2 } from 'lucide-react';

export default function ShareButtons() {
  return (
    <div className="rounded-2xl border border-[#E5DDD7] bg-white p-5">
      <h3 className="mb-4 text-sm font-semibold text-[#35281E]">Share</h3>

      <div className="flex gap-3">
        <button className="rounded-full border p-2">
          <Link2 size={14} />
        </button>

        <button className="rounded-full border p-2">
          <Mail size={14} />
        </button>

        <button className="rounded-full border p-2">
          <Share2 size={14} />
        </button>
      </div>
    </div>
  );
}
