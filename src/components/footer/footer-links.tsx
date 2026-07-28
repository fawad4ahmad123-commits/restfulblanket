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
      <h3 className="text-[11px] uppercase tracking-[0.3em] text-white">
        {title}
      </h3>

      <nav aria-label={title} className="mt-6">
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
