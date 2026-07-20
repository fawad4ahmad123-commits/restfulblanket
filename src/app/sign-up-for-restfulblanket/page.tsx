'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function SignupOfferPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#FDF9F6]">
      <div className="w-full max-w-lg md:max-w-3xl lg:max-w-4xl rounded-2xl bg-[#C7AF94] shadow-[0_25px_80px_rgba(0,0,0,0.30)] overflow-hidden">
        <div className="flex flex-col md:grid md:grid-cols-2">
          <div className="flex flex-col justify-center px-5 py-6 sm:px-8 sm:py-8 md:p-10 lg:p-14">
            <div className="mb-4 sm:mb-6">
              <Image
                src="https://d3k81ch9hvuctc.cloudfront.net/company/RWnBzE/images/1b62656c-395d-43ab-b3a1-90595c76ade8.png"
                alt="RestfulBlanket"
                width={120}
                height={40}
                className="w-24 sm:w-28 md:w-32 lg:w-40 h-auto"
              />
            </div>

            <h3 className="mb-6 text-xl md:text-3xl font-semibold text-white">
              Klar til en dybere og
              <br />
              mere afslappende søvn?
            </h3>

            <div className="mb-6 h-px w-24 bg-white/70" />

            <p className="mb-4 text-base md:text-lg text-[#1E1E1E]">
              Bliv en del af Restful-fællesskabet og få
            </p>

            <h2 className="mb-8 text-lg md:text-xl font-bold text-white">
              10% RABAT +
              <br />
              Gratis Søvnguide
            </h2>

            <Button
              onClick={() => router.push('/signup')}
              className="w-full rounded-none bg-white text-black hover:bg-white/90"
            >
              Hent din rabat og søvnguide
            </Button>
          </div>

          <div className="relative min-h-[420px]">
            <Image
              src="https://d3k81ch9hvuctc.cloudfront.net/company/RWnBzE/images/7e0d61b1-6b9d-4ac5-95c0-efa090a0ec57.jpeg"
              alt="Sovende kvinde"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
