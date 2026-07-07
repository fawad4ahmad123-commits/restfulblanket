'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Status states: 'initial' (check email screen), 'verifying', 'success', 'error'
  const [status, setStatus] = useState('initial');
  const [errorMessage, setErrorMessage] = useState('');

  const token = searchParams.get('token');
  const userId = searchParams.get('user_id'); // Or 'id' / 'user' depending on your WP plugin URL

  useEffect(() => {
    // If a token and user_id are found in the URL, trigger the verification backend call
    if (token && userId) {
      setStatus('verifying');

      fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/custom/v1/verify?token=${token}&user_id=${userId}`,
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setStatus('success');
            // Redirect to sign-in page after 3 seconds
            setTimeout(() => {
              router.push('/login');
            }, 3000);
          } else {
            setStatus('error');
            setErrorMessage(
              data.message ||
                'The verification link is invalid or has expired.',
            );
          }
        })
        .catch(() => {
          setStatus('error');
          setErrorMessage('Something went wrong connecting to the server.');
        });
    }
  }, [token, userId, router]);

  // Render content based on the current verification state
  if (status === 'verifying') {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm max-w-md mx-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#211711] mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold text-[#211711]">
          Verifying your account
        </h1>
        <p className="mt-3 text-[#70655E]">
          Please wait while we secure your account...
        </p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm max-w-md mx-4">
        <div className="text-4xl mb-3">✅</div>
        <h1 className="text-2xl font-bold text-emerald-700">Email Verified!</h1>
        <p className="mt-3 text-[#70655E]">
          Your account is now ready. Redirecting you to sign in...
        </p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm max-w-md mx-4">
        <div className="text-4xl mb-3">❌</div>
        <h1 className="text-2xl font-bold text-rose-700">
          Verification Failed
        </h1>
        <p className="mt-3 text-[#70655E]">{errorMessage}</p>
        <button
          onClick={() => router.push('/login')}
          className="mt-6 px-4 py-2 bg-[#211711] text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  // DEFAULT 'INITIAL' STATE (When they register and are told to check inbox)
  return (
    <div className="rounded-2xl bg-white p-8 text-center shadow-sm max-w-md mx-4">
      <h1 className="text-2xl font-bold text-[#211711]">Check your email</h1>
      <p className="mt-3 text-[#70655E]">
        We have sent a verification link to your email address. Please verify
        your account before signing in.
      </p>
    </div>
  );
}

// Next.js App Router requires searchParams hooks to be wrapped in a Suspense boundary
export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF8F6]">
      <Suspense
        fallback={
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm max-w-md mx-4">
            <p className="text-[#70655E]">Loading...</p>
          </div>
        }
      >
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}
