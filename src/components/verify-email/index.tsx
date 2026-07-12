'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { CheckCircle2, XCircle, Mail, Loader2 } from 'lucide-react';
import { Loader } from '@/src/components/loader';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [status, setStatus] = useState('initial');
  const [errorMessage, setErrorMessage] = useState('');

  const token = searchParams.get('token');
  const userId = searchParams.get('user_id');

  useEffect(() => {
    if (token && userId) {
      setStatus('verifying');

      fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/custom/v1/verify?token=${token}&user_id=${userId}`,
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setStatus('success');
            setTimeout(() => {
              router.push('/signin');
            }, 3000);
          } else {
            setStatus('error');
            setErrorMessage(
              data.message || 'Bekræftelseslinket er ugyldigt eller udløbet.',
            );
          }
        })
        .catch(() => {
          setStatus('error');
          setErrorMessage(
            'Der opstod en fejl under forbindelsen til serveren.',
          );
        });
    }
  }, [token, userId, router]);

  if (status === 'verifying') {
    return (
      <div className="w-full max-w-md mx-4 transform overflow-hidden rounded-3xl bg-white p-8 text-center shadow-xl transition-all border border-neutral-100">
        <div className="flex justify-center mb-6">
          <Loader2 className="h-12 w-12 animate-spin text-[#211711]" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-[#211711]">
          Bekræfter din konto
        </h1>
        <p className="mt-3 text-sm text-[#70655E] leading-relaxed">
          Vent venligst et øjeblik, mens vi sikrer og godkender din konto...
        </p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="w-full max-w-md mx-4 transform overflow-hidden rounded-3xl bg-white p-8 text-center shadow-xl transition-all border border-emerald-50">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-emerald-50 p-3 text-emerald-600 animate-bounce">
            <CheckCircle2 className="h-12 w-12" />
          </div>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-emerald-800">
          E-mail bekræftet!
        </h1>
        <p className="mt-3 text-sm text-[#70655E] leading-relaxed">
          Din konto er nu klar. Du bliver viderestillet til login om et
          øjeblik...
        </p>
        <div className="mt-6 h-1 w-full bg-emerald-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-600 animate-[loading_3s_ease-in-out]"
            style={{ width: '100%' }}
          ></div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="w-full max-w-md mx-4 transform overflow-hidden rounded-3xl bg-white p-8 text-center shadow-xl transition-all border border-rose-50">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-rose-50 p-3 text-rose-600">
            <XCircle className="h-12 w-12" />
          </div>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-rose-900">
          Bekræftelse mislykkedes
        </h1>
        <p className="mt-3 text-sm text-[#70655E] leading-relaxed">
          {errorMessage}
        </p>
        <button
          onClick={() => router.push('/signin')}
          className="mt-6 w-full inline-flex justify-center items-center px-5 py-3 bg-[#211711] text-white rounded-xl text-sm font-semibold shadow-sm hover:bg-opacity-90 hover:shadow-md active:scale-[0.98] transition-all duration-150"
        >
          Gå til login
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-4 transform overflow-hidden rounded-3xl bg-white p-8 text-center shadow-xl transition-all border border-neutral-100">
      <div className="flex justify-center mb-6">
        <div className="rounded-full bg-amber-50 p-4 text-[#211711]">
          <Mail className="h-10 w-10" />
        </div>
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-[#211711]">
        Tjek din e-mail
      </h1>
      <p className="mt-3 text-sm text-[#70655E] leading-relaxed">
        Vi har sendt et bekræftelseslink til din e-mailadresse. Venligst bekræft
        din konto via linket, før du logger ind.
      </p>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#FAF8F6] to-[#EFECE9]">
      <Suspense
        fallback={
          <div className="w-full max-w-md mx-4 rounded-3xl bg-white p-12 text-center shadow-xl border border-neutral-100 flex flex-col items-center justify-center">
            <Loader />
          </div>
        }
      >
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}
