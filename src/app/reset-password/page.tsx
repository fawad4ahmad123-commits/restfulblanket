import { Suspense } from 'react';
import ResetPasswordForm from '@/src/components/password/reset-password';
import { Loader } from '@/src/components/loader';

export const metadata = {
  title: 'Reset Password',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#fff9f5]">
          <Loader />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}