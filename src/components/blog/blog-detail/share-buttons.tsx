'use client';

import { useState } from 'react';
import { Link2, Mail, Share2 } from 'lucide-react';

export default function ShareButtons() {
  const [shareUrl, setShareUrl] = useState('');

  useState(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  });

  const copyLink = async () => {
    if (!shareUrl) return;

    await navigator.clipboard.writeText(shareUrl);
    alert('Link copied');
  };

  const sendEmail = () => {
    const subject = encodeURIComponent(document.title);
    const body = encodeURIComponent(`Læs denne artikel: ${shareUrl}`);

    window.location.href = `mailto:KerneRo@RestfulBlanket.dk?subject=${subject}&body=${body}`;
  };

  const shareX = () => {
    const text = encodeURIComponent(document.title);
    const url = encodeURIComponent(shareUrl);

    window.open(`https://x.com/intent/post?text=${text}&url=${url}`, '_blank');
  };

  return (
    <div className="rounded-2xl border border-[#E5DDD7] bg-white p-5">
      <h3 className="mb-4 text-sm font-semibold text-[#35281E]">Share</h3>

      <div className="flex gap-3">
        <button
          onClick={copyLink}
          className="rounded-full border p-2 cursor-pointer"
        >
          <Link2 size={14} />
        </button>

        <button
          onClick={sendEmail}
          className="rounded-full border p-2 cursor-pointer"
        >
          <Mail size={14} />
        </button>

        <button
          onClick={shareX}
          className="rounded-full border p-2 cursor-pointer"
        >
          <Share2 size={14} />
        </button>
      </div>
    </div>
  );
}
