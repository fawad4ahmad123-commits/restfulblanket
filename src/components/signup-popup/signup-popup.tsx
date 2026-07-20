'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/src/core/context/auth-context';

export default function SignupPopup() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (isAuthenticated) {
    return null;
  }

  return (
    <button
      onClick={() => router.push('/sign-up-for-restfulblanket')}
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
