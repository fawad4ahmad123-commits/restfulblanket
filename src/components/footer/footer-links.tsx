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
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={`footer-section-${title}`}
        className="flex w-full items-center justify-between lg:pointer-events-none"
      >
        <span className="mb-0 text-[11px] uppercase tracking-[0.3em] text-white">
          {title}
        </span>

        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 text-white transition-transform duration-200 lg:hidden ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <nav
        id={`footer-section-${title}`}
        aria-label={title}
        className={`overflow-hidden transition-all duration-300 lg:mt-6 ${
          open ? 'mt-4 max-h-96' : 'max-h-0 lg:max-h-none'
        }`}
      >
        <div className="space-y-4">
          {links.map((link) => (
            <Link
              key={`${link.title}-${link.href}`}
              href={link.href}
              aria-label={`${link.title} - ${title}`}
              className="block text-sm text-white"
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
