'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/src/core/context/auth-context';

export default function SignupPopup() {
  const { isAuthenticated } = useAuth();

  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const authPages = [
    '/signup',
    '/signin',
    '/forget-password',
    '/reset-password',
    '/verify-email',
    '/profile',
    '/checkout',
    '/order-success',
    '/contact-us',
  ];

  useEffect(() => {
    if (authPages.includes(pathname)) {
      setIsOpen(false);
    }
  }, [pathname]);

  const handleSignup = () => {
    router.push('/signup');
  };

  if (isAuthenticated) {
    return null;
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] group flex flex-col items-center gap-1 transition-all duration-300 hover:scale-105 cursor-pointer"
      >
        <div className="flex flex-col items-center">
          <p className="text-[8px] sm:text-[10px] font-bold text-[#392A22] drop-shadow-sm bg-white/80 px-2 py-0.5 rounded-full whitespace-nowrap">
            10% RABAT
          </p>
          <p className="text-[7px] sm:text-[8px] text-[#392A22] font-semibold -mt-0.5 whitespace-nowrap">
            Gratis søvnguide
          </p>
        </div>

        <div className="relative h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full border-2 border-[#392A22] bg-[#C7AF94] shadow-lg overflow-hidden group-hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-center h-full w-full p-1 sm:p-1.5">
            <Image
              src="https://d3k81ch9hvuctc.cloudfront.net/company/RWnBzE/images/1b62656c-395d-43ab-b3a1-90595c76ade8.png"
              alt="RestfulBlanket"
              width={20}
              height={20}
              priority
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      <div className="relative w-full max-w-lg md:max-w-3xl lg:max-w-4xl rounded-2xl bg-[#C7AF94] shadow-[0_25px_80px_rgba(0,0,0,0.30)] max-h-[90vh] overflow-hidden">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 z-20 rounded-full bg-white/90 p-1.5 sm:p-2 text-[#392A22] transition hover:bg-white cursor-pointer"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        <div className="flex flex-col md:grid md:grid-cols-2">
          <div className="flex flex-col justify-center px-5 py-6 sm:px-8 sm:py-8 md:p-10 lg:p-14 md:order-1">
            <div className="mb-4 sm:mb-6">
              <Image
                src="https://d3k81ch9hvuctc.cloudfront.net/company/RWnBzE/images/1b62656c-395d-43ab-b3a1-90595c76ade8.png"
                alt="RestfulBlanket"
                width={120}
                height={40}
                priority
                className="bg-transparent w-24 sm:w-28 md:w-32 lg:w-40 h-auto"
              />
            </div>

            <h3 className="mb-3 sm:mb-5 md:mb-6 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-snug text-white">
              Klar til en dybere og
              <br />
              mere afslappende søvn?
            </h3>

            <div className="mb-3 sm:mb-5 md:mb-6 h-px w-14 sm:w-20 md:w-24 bg-white/70" />

            <p className="mb-2 sm:mb-4 text-sm sm:text-base md:text-lg text-[#1E1E1E]">
              Bliv en del af Restful-fællesskabet og få
            </p>

            <h2 className="mb-5 sm:mb-7 md:mb-8 font-serif text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-tight text-white">
              10% RABAT +
              <br />
              Gratis Søvnguide
            </h2>

            <Button
              onClick={handleSignup}
              className="w-full rounded-none bg-white px-4 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold text-black hover:bg-white/90 whitespace-normal leading-snug cursor-pointer"
            >
              Hent din rabat og søvnguide
            </Button>
          </div>

          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-auto md:min-h-[420px] lg:min-h-[480px] md:order-2">
            <Image
              src="https://d3k81ch9hvuctc.cloudfront.net/company/RWnBzE/images/7e0d61b1-6b9d-4ac5-95c0-efa090a0ec57.jpeg"
              alt="Sovende kvinde"
              fill
              priority
              unoptimized
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#C7AF94]/40 md:hidden" />
          </div>
        </div>
      </div>
    </div>
  );
}