import Link from 'next/link';

const FooterLinks = ({ title, links }: { title: string; links: string[] }) => {
  return (
    <div>
      <p className="mb-6 text-[11px] uppercase tracking-[0.3em] text-[#fff9f5]/35">
        {title}
      </p>

      <div className="space-y-4">
        {links.map((link) => (
          <Link
            key={link}
            href="#"
            aria-label={`${link} - ${title}`}
            title={link}
            className="block text-sm text-[#fff9f5]/80 transition hover:text-white"
          >
            {link}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterLinks;
