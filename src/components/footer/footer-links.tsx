'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

interface FooterLink {
  title: string;
  href: string;
}

const FooterLinks = ({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 pb-4 lg:border-0 lg:pb-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between lg:pointer-events-none"
      >
        <h3 className="text-[11px] uppercase tracking-[0.3em] text-white">
          {title}
        </h3>

        <ChevronDown
          size={18}
          className={`text-white transition-transform duration-300 lg:hidden ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <nav
        aria-label={title}
        className={`overflow-hidden transition-all duration-300 lg:mt-6 ${
          isOpen ? 'mt-6 max-h-[600px]' : 'max-h-0 lg:max-h-[600px]'
        }`}
      >
        <div className="space-y-4">
          {links.map((link) => (
            <Link
              key={`${link.title}-${link.href}`}
              href={link.href}
              aria-label={`${link.title} - ${title}`}
              className="block text-sm text-white transition-opacity hover:opacity-80"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default FooterLinks;
