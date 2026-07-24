import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone, Clock3 } from 'lucide-react';
import FooterLinks from './footer-links';
import { shopLinks, socialLinks, supportLinks } from '../constant';

const Footer = () => {
  return (
    <footer className="bg-[#3a251c] text-white">
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 md:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_0.8fr_0.8fr_1fr]">
          <div className="text-left">
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
                loading="lazy"
              />
            </Link>

            <div className="mt-6 flex min-h-[40px] items-start gap-3">
              <MapPin
                size={20}
                className="mt-1 shrink-0 text-white"
                aria-hidden="true"
              />

              <p className="mt-[4px] text-[16px] leading-6 text-white">
                Vig Erhvervspark Søndre Vænge 19K 4560 Vig
              </p>
            </div>

            <div className="mt-5 max-w-[420px] text-sm leading-7 text-white">
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

            <div className="mt-5 max-w-[420px] text-sm leading-7 text-white">
              <div className="flex min-h-[100px] items-start gap-3">
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

          {/* Links */}
          <FooterLinks title="Shop" links={shopLinks} />

          <FooterLinks title="Guides" links={supportLinks} />

          {/* Newsletter */}
          <div className="w-full max-w-[370px]">
            <div className="flex min-h-[56px] flex-col gap-3 sm:flex-row sm:items-center sm:rounded-full sm:border sm:border-white/20 sm:px-5 sm:py-2">
              <div className="flex h-[48px] items-center rounded-full border border-white/20 px-4 sm:flex-1 sm:border-0 sm:px-0">
                <Mail
                  size={16}
                  className="shrink-0 text-white"
                  aria-hidden="true"
                />

                <input
                  type="email"
                  placeholder="your@email.com"
                  aria-label="Email address"
                  autoComplete="email"
                  className="ml-2 h-6 flex-1 bg-transparent text-sm leading-6 text-white outline-none placeholder:text-white/70"
                />
              </div>

              <button
                type="button"
                aria-label="Subscribe to newsletter"
                title="Subscribe to newsletter"
                className="rounded-full bg-white px-5 py-3 text-xs font-medium tracking-wide text-[#3a251c]"
              >
                SUBSCRIBE
              </button>
            </div>
          </div>

          {/* Badges */}
          <div className="flex min-h-[100px] items-center justify-center gap-5 lg:col-span-2">
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
                className="h-[100px] w-[100px] object-contain"
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
                className="h-[100px] w-[100px] object-contain"
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
                className="h-[100px] w-[100px] object-contain"
              />
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-white/20 md:mt-20" />

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-xs text-white">
            © 2026 RestfulBlanket Design By{' '}
            <Link
              href="https://starseo.agency"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline"
            >
              Starseo.agency
            </Link>
          </p>

          <div className="flex justify-start gap-3">
            {socialLinks.map(({ icon: Icon, href, name }, index) => (
              <Link
                key={index}
                href={href}
                aria-label={name}
                title={name}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20"
              >
                <Icon size={14} aria-hidden="true" />
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-white">
            <Link href="/privatlivspolitik">Privatlivspolitik</Link>

            <Link href="/handelsbetingelser">Handelsbetingelser</Link>

            <Link href="/cookie-policy">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
