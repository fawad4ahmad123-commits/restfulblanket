'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ResetPasswordForm {
  email: string;
}

export default function ForgetPassword() {
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordForm>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: ResetPasswordForm) => {
    setApiError(null);

    try {
      // Call your API here
      // await resetPassword(values.email);

      console.log('Reset password for:', values.email);
    } catch (err) {
      setApiError(
        err instanceof Error
          ? err.message
          : 'Failed to send reset password email.',
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fff9f5] p-4">
      <div className="w-full max-w-[528px]">
        <div className="flex flex-col gap-8 rounded-[24px] border border-[#F0EBE6] bg-white px-6 py-8 shadow-sm">
          <div>
            <h1 className="text-[32px] font-bold leading-tight text-[#211711]">
              Reset Password
            </h1>

            <p className="mt-2 text-sm text-[#70655E]">
              Please enter your email address to reset your password.
            </p>
          </div>

          {apiError && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#211711]">
                Email
              </label>

              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12 rounded-xl border-[#E8E1DA]"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: 'Enter a valid email address',
                  },
                })}
              />

              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full rounded-full bg-[#2D2119] text-white hover:bg-[#3A2A21]"
            >
              {isSubmitting ? 'Sending...' : 'Send Verification Email'}
            </Button>
          </form>

          <p className="text-center text-sm text-[#70655E]">
            If you need further assistance{' '}
            <Link href="/contact-us" className="font-semibold text-[#211711]">
              contact us
            </Link>
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push('/')}
          className="mt-6 flex items-center gap-2 text-sm font-medium text-[#35281E] transition-opacity hover:opacity-80 cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to Shopping Cart
        </button>
      </div>
    </div>
  );
}
