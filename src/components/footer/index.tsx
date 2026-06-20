import Link from "next/link";
import { Mail } from "lucide-react";
import FooterLinks from "./footer-links";
import { shopLinks, socialLinks, supportLinks } from "../constant";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#3a251c] text-[#fff9f5]">
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 md:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_0.8fr_0.8fr]">
          <div className="text-left lg:text-left">
            <h2 className="font-serif text-3xl italic sm:text-4xl">
              <Link
                href="/"
                aria-label="RestfulBlanket Home"
                title="RestfulBlanket Home"
              >
                <Image
                  src="/home/span.font-heading.png"
                  alt="RestfulBlanket"
                  width={153}
                  height={32}
                  priority
                />
              </Link>
            </h2>

            <h3 className="mt-6 font-serif text-3xl leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-[56px]">
              Hand-finished in Sweden,
              <br className="hidden sm:block" />
              crafted for deeper rest.
            </h3>

            <div className="mt-8 flex flex-col gap-3 sm:max-w-[450px] sm:flex-row sm:items-center sm:rounded-full sm:border sm:border-[#fff9f5]/15 sm:px-5 sm:py-2">
              <div className="flex items-center rounded-full border border-[#fff9f5]/15 px-4 py-3 sm:flex-1 sm:border-0 sm:px-0 sm:py-0">
                <Mail
                  size={16}
                  className="text-[#fff9f5]/40"
                  aria-hidden="true"
                />
                <input
                  type="email"
                  placeholder="your@email.com"
                  aria-label="Email address"
                  autoComplete="email"
                  className="ml-3 flex-1 bg-transparent text-sm outline-none placeholder:text-[#fff9f5]/35"
                />
              </div>
              <button
                type="button"
                aria-label="Subscribe to newsletter"
                title="Subscribe to newsletter"
                className="rounded-full bg-[#fff9f5] px-6 py-3 text-xs font-medium tracking-wide text-[#3a251c] transition hover:bg-white"
              >
                SUBSCRIBE
              </button>
            </div>

            <p className="mt-5 max-w-[420px] text-sm leading-7 text-[rgba(245,241,234,0.6)] lg:mx-0">
              No noise. Only first looks at collections, mill visits, and field
              notes from our regenerative partners.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:contents">
            <FooterLinks title="Shop" links={shopLinks} />
          </div>

          <FooterLinks title="Support" links={supportLinks} />
        </div>

        <div className="mt-12 border-t border-[#fff9f5]/10 md:mt-20" />

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-xs text-[#fff9f5]/35">
            © 2026 RestfulBlanket AB · Hand-finished in Småland, Sweden
          </p>

          <div className="flex justify-start gap-3 lg:justify-center">
            {socialLinks.map(({ icon: Icon, href, name }, index) => (
              <Link
                key={index}
                href={href}
                aria-label={name}
                title={name}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#fff9f5]/15 transition hover:border-[#fff9f5]/40"
              >
                <Icon aria-hidden="true" size={14} />
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap justify-start gap-4 text-xs text-[#fff9f5]/35 lg:justify-end">
            <Link href="#" aria-label="Privacy Policy" title="Privacy Policy">
              Privacy
            </Link>

            <Link
              href="#"
              aria-label="Terms and Conditions"
              title="Terms and Conditions"
            >
              Terms
            </Link>

            <Link href="#" aria-label="Cookie Policy" title="Cookie Policy">
              Cookies
            </Link>

            <Link
              href="#"
              aria-label="Accessibility Statement"
              title="Accessibility Statement"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
