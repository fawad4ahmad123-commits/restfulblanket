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
    '/login',
    '/forgetpassword',
    '/resetpassword',
    '/email-verification',
    '/profile',
  ];

  useEffect(() => {
    if (authPages.includes(pathname)) {
      setIsOpen(false);
    }
  }, [pathname]);

  const handleSignup = () => {
    router.push('/signup');
  };

  // If user is authenticated, don't show anything
  if (isAuthenticated) {
    return null;
  }

  // Minimized view (shown when isOpen is false)
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] group flex flex-col items-center gap-1 transition-all duration-300 hover:scale-105"
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

  // Full popup view
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-8">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      <div className="relative w-full max-w-4xl mx-auto rounded-2xl bg-[#C7AF94] shadow-[0_25px_80px_rgba(0,0,0,0.30)] overflow-hidden max-h-[95vh] sm:max-h-[90vh] md:max-h-[85vh]">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-2 top-2 sm:right-4 sm:top-4 z-20 rounded-full bg-white/90 p-1.5 sm:p-2 text-[#392A22] transition hover:bg-white"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          <div className="flex flex-col justify-center p-4 sm:p-6 md:p-10 lg:p-14 overflow-y-auto order-2 md:order-1">
            <div className="mb-4 sm:mb-6">
              <Image
                src="https://d3k81ch9hvuctc.cloudfront.net/company/RWnBzE/images/1b62656c-395d-43ab-b3a1-90595c76ade8.png"
                alt="RestfulBlanket"
                width={120}
                height={40}
                priority
                className="bg-transparent w-24 sm:w-32 md:w-40"
              />
            </div>

            <h3 className="mb-4 sm:mb-6 text-xl sm:text-2xl md:text-3xl font-semibold leading-snug text-white">
              Klar til en dybere og
              <br />
              mere afslappende søvn?
            </h3>

            <div className="mb-4 sm:mb-6 h-px w-16 sm:w-24 bg-white/70" />

            <p className="mb-3 sm:mb-4 text-sm sm:text-base md:text-lg text-[#1E1E1E]">
              Bliv en del af Restful-fællesskabet og få
            </p>

            <h2 className="mb-6 sm:mb-8 font-serif text-[14px] sm:text-[16px] md:text-[20px] font-bold leading-tight text-white">
              10% RABAT +
              <br />
              Gratis Søvnguide
            </h2>

            <Button
              onClick={handleSignup}
              className="h-12 sm:h-14 w-full rounded-none bg-white text-sm sm:text-base md:text-lg font-semibold text-black hover:bg-white/90"
            >
              Hent din rabat og søvnguide
            </Button>
          </div>
          <div className="relative min-h-[200px] sm:min-h-[250px] md:min-h-[400px] lg:min-h-full order-1 md:order-2">
            <div className="absolute inset-0 md:hidden">
              <Image
                src="https://d3k81ch9hvuctc.cloudfront.net/company/RWnBzE/images/7e0d61b1-6b9d-4ac5-95c0-efa090a0ec57.jpeg"
                alt="Sovende kvinde"
                fill
                priority
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#C7AF94]/40" />
            </div>
            <div className="absolute inset-0 hidden md:block">
              <Image
                src="https://d3k81ch9hvuctc.cloudfront.net/company/RWnBzE/images/7e0d61b1-6b9d-4ac5-95c0-efa090a0ec57.jpeg"
                alt="Sovende kvinde"
                fill
                priority
                unoptimized
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
