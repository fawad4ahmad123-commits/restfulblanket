import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone, Clock3 } from 'lucide-react';
import FooterLinks from './footer-links';
import { shopLinks, socialLinks, supportLinks } from '../constant';

const Footer = () => {
  return (
    <footer className="bg-[#3a251c] text-[#fff9f5]">
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 md:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_0.8fr_0.8fr]">
          <div className="text-left">
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

            <div className="mt-6 flex items-start gap-3">
              <MapPin
                size={20}
                className="mt-1 shrink-0 text-[#F5F1EA]"
                aria-hidden="true"
              />
              <p className="font-serif text-[18px] leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-[16px] mt-[4px]">
                Vig Erhvervspark Søndre Vænge 19E 4560 Vig
              </p>
            </div>

            <div className="mt-5 max-w-[420px] text-sm leading-7 text-[#F5F1EA]">
              <div className="flex items-center gap-3">
                <Phone size={16} aria-hidden="true" />
                <span>+45 29 82 29 4.73</span>
              </div>

              <div className="mt-2 flex items-center gap-3">
                <Mail size={16} aria-hidden="true" />
                <span>KerneRo@RestfulBlanket.dk</span>
              </div>

              <div className="mt-2 pl-7">CVR: 43362674</div>
            </div>

            <div className="mt-5 max-w-[420px] text-sm leading-7 text-[#F5F1EA]">
              <div className="flex items-start gap-3">
                <Clock3
                  size={16}
                  className="mt-1 shrink-0"
                  aria-hidden="true"
                />

                <div>
                  <p>Åbningstider</p>
                  <p>M-F 10:00 - 16:00</p>
                  <p>Lør 10:00 - 14:00</p>
                  <p>Søn Lukket</p>
                </div>
              </div>
            </div>
          </div>

          <FooterLinks title="Shop" links={shopLinks} />
          <FooterLinks title="Support" links={supportLinks} />

          <div className="w-full max-w-[370px]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:rounded-full sm:border sm:border-[#fff9f5]/15 sm:px-5 sm:py-2">
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
                  className="ml-2 flex-1 bg-transparent text-sm outline-none placeholder:text-[#fff9f5]/35"
                />
              </div>

              <button
                type="button"
                aria-label="Subscribe to newsletter"
                title="Subscribe to newsletter"
                className="rounded-full bg-[#fff9f5] px-5 py-3 text-xs font-medium tracking-wide text-[#3a251c] transition hover:bg-white"
              >
                SUBSCRIBE
              </button>
            </div>
          </div>

          <div className="mt-[-32px] flex items-center justify-center gap-5 lg:col-span-1 lg:col-start-2">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://thegoodshoppingguide.com/brand-directory/restfulblanket/"
            >
              <Image
                src="/goodshopping.png"
                alt="Good Shopping Guide"
                width={100}
                height={100}
                className="h-auto w-[100px] object-contain"
              />
            </Link>

            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://verified.peopleandplanetfirst.org/directory/restfulblanket"
            >
              <Image
                src="/people.png"
                alt="People + Planet First"
                width={100}
                height={100}
                className="h-auto w-[100px] object-contain"
              />
            </Link>

            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.goodmarket.global/restfulblanket"
            >
              <Image
                src="/market.png"
                alt="Good Market Approved"
                width={100}
                height={100}
                className="h-auto w-[100px] object-contain"
              />
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-[#fff9f5]/10 md:mt-20" />

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-xs text-[#F5F1EA]/80">
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

          <div className="flex flex-wrap justify-start gap-4 text-xs text-[#F5F1EA]/80 lg:justify-end">
            <Link href="#" aria-label="Privacy Policy">
              Privacy
            </Link>

            <Link href="#" aria-label="Terms and Conditions">
              Terms
            </Link>

            <Link href="#" aria-label="Cookie Policy">
              Cookies
            </Link>

            <Link href="#" aria-label="Accessibility Statement">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
