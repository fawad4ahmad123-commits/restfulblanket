import { TrustBar } from '@/src/components/trustbar';
import { Courgette } from 'next/font/google';
import { useRouter } from 'next/navigation';

const courgette = Courgette({
  subsets: ['latin'],
  weight: '400',
});

const AuthLayout = () => {
  const router = useRouter();
  return (
    <>
      <h3
        className={`${courgette.className} bg-[#FFF9F5] pt-3 text-center text-2xl leading-8 text-[#35281E]`}
        onClick={() => router.push('/')}
      >
        RestfulBlanket
      </h3>

      <TrustBar isHome={false} />
    </>
  );
};

export default AuthLayout;
