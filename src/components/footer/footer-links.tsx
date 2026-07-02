import Link from 'next/link';

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
  return (
    <div>
      <p className="mb-6 text-[11px] uppercase tracking-[0.3em] text-[#fff9f5]/35">
        {title}
      </p>

      <div className="space-y-4">
        {links.map((link) => (
          <Link
            key={`${link.title}-${link.href}`}
            href={link.href}
            aria-label={`${link.title} - ${title}`}
            title={link.title}
            className="block text-sm text-[#fff9f5]/80 transition hover:text-white"
          >
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterLinks;
