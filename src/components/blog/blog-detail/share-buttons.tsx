'use client';

import { useEffect, useState } from 'react';
import { Link2, Mail, Share2 } from 'lucide-react';

export default function ShareButtons() {
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const copyLink = async () => {
    if (!shareUrl) return;

    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Link copied');
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const sendEmail = () => {
    const subject = encodeURIComponent(document.title);
    const body = encodeURIComponent(`Læs denne artikel: ${shareUrl}`);

    window.location.href = `mailto:KerneRo@RestfulBlanket.dk?subject=${subject}&body=${body}`;
  };

  const shareX = () => {
    const text = encodeURIComponent(document.title);
    const url = encodeURIComponent(shareUrl);

    window.open(
      `https://x.com/intent/post?text=${text}&url=${url}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

  return (
    <div className="rounded-2xl border border-[#E5DDD7] bg-white p-5">
      <h3 className="mb-4 text-sm font-semibold text-[#35281E]">Share</h3>

      <div className="flex gap-3">
        <button
          type="button"
          aria-label="Copy article link"
          title="Copy article link"
          onClick={copyLink}
          className="cursor-pointer rounded-full border border-[#D8CEC6] p-2 transition-colors hover:bg-[#F8F5F2]"
        >
          <Link2 size={14} aria-hidden="true" />
        </button>

        <button
          type="button"
          aria-label="Share by email"
          title="Share by email"
          onClick={sendEmail}
          className="cursor-pointer rounded-full border border-[#D8CEC6] p-2 transition-colors hover:bg-[#F8F5F2]"
        >
          <Mail size={14} aria-hidden="true" />
        </button>

        <button
          type="button"
          aria-label="Share on X"
          title="Share on X"
          onClick={shareX}
          className="cursor-pointer rounded-full border border-[#D8CEC6] p-2 transition-colors hover:bg-[#F8F5F2]"
        >
          <Share2 size={14} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
