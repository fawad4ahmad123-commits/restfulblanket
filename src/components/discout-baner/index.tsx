'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SignupOffer({ data }: { data: any }) {
  const page = data?.[0];
  const router = useRouter();
  if (!page) return null;

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

            <h1 className="mb-6 text-xl md:text-3xl font-semibold text-white">
              {page.title?.rendered}
            </h1>

            <div className="mb-6 h-px w-24 bg-white/70" />

            <div
              className="prose prose-sm md:prose-base max-w-none text-[#1E1E1E]"
              dangerouslySetInnerHTML={{
                __html: page.content?.rendered || '',
              }}
            />
          </div>
          <div className="relative min-h-[420px]">
            <Image
              src="https://d3k81ch9hvuctc.cloudfront.net/company/RWnBzE/images/7e0d61b1-6b9d-4ac5-95c0-efa090a0ec57.jpeg"
              alt="Signup"
              fill
              className="object-cover"
            />

            <div className="absolute bottom-6 left-6 right-6 z-10 cursor-pointer">
              <Button
                onClick={() => router.push('/signup')}
                className="w-full bg-white text-black hover:bg-white/90 cursor-pointer"
              >
                Hent din rabat og søvnguide
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
