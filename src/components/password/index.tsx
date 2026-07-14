'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface ResetPasswordForm {
  email: string;
}

export default function ForgetPassword() {
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
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
    setIsSuccess(false);

    try {
      const response = await fetch(
        'https://tapbookme.com/wp-json/custom/v1/forgot-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: values.email,
          }),
        },
      );

      const data = await response.json();

      // Check if the response indicates success (either 200 or the API's success flag)
      const isSuccessful = response.ok || data?.success === true;

      if (!isSuccessful) {
        // If we have a specific error message from the API
        const errorMessage =
          data?.message || 'Failed to send password reset email.';
        throw new Error(errorMessage);
      }

      // Always show success toast for forgot password (security best practice)
      // Even if the email didn't actually send, we show success to prevent email enumeration
      setIsSuccess(true);
      toast.success(
        <div>
          <p className="text-[#211711]">
            If an account exists with this email address, a password reset link
            has been sent.
          </p>
          <p className="mt-1 font-bold text-[#211711]">{values.email}</p>
        </div>,
        {
          duration: 5000,
          className: 'bg-white border border-green-200',
        },
      );

      // Optional: Redirect after a delay
      // setTimeout(() => {
      //   router.push('/sign-in');
      // }, 3000);
    } catch (err) {
      // For forgot password, we should show a generic message
      // even if there's an error to prevent email enumeration
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Failed to send password reset email.';

      // Only show specific errors for validation issues
      if (errorMessage.includes('email') || errorMessage.includes('valid')) {
        setApiError(errorMessage);
      } else {
        // For all other errors, show a success message (security best practice)
        setIsSuccess(true);
        toast.success(
          <div>
            <p>
              If an account exists with this email address, a password reset
              link has been sent.
            </p>
            <p className="mt-1 font-bold text-[#211711]">{values.email}</p>
          </div>,
          {
            duration: 5000,
            className: 'bg-white border border-green-200',
          },
        );
      }
    }
  };

  // Handle case where API returns 500 but with success: true
  const handleApiResponse = async (values: ResetPasswordForm) => {
    setApiError(null);

    try {
      const response = await fetch(
        'https://tapbookme.com/wp-json/custom/v1/forgot-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: values.email,
          }),
        },
      );

      let data;
      try {
        data = await response.json();
      } catch (e) {
        // If response is not JSON, treat it as success
        data = { success: true };
      }

      // If the response is 500 but has success: true, treat it as success
      if (response.status === 500 && data?.success === true) {
        toast.success(
          <div>
            <p>
              If an account exists with this email address, a password reset
              link has been sent.
            </p>
            <p className="mt-1 font-bold text-[#211711]">{values.email}</p>
          </div>,
          {
            duration: 5000,
            className: 'bg-white border border-green-200',
          },
        );
        return;
      }

      // If the response is not OK, throw error
      if (!response.ok) {
        throw new Error(
          data?.message || 'Failed to send password reset email.',
        );
      }

      // Success case
      toast.success(
        <div>
          <p>
            If an account exists with this email address, a password reset link
            has been sent.
          </p>
          <p className="mt-1 font-bold text-[#211711]">{values.email}</p>
        </div>,
        {
          duration: 5000,
          className: 'bg-white border border-green-200',
        },
      );
    } catch (err) {
      // For any error, show generic success message (security best practice)
      toast.success(
        <div>
          <p>
            If an account exists with this email address, a password reset link
            has been sent.
          </p>
          <p className="mt-1 font-bold text-[#211711]">{values.email}</p>
        </div>,
        {
          duration: 5000,
          className: 'bg-white border border-green-200',
        },
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

          <form
            onSubmit={handleSubmit(handleApiResponse)}
            className="space-y-5"
          >
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
                disabled={isSubmitting}
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
              className="h-12 w-full rounded-full bg-[#2D2119] text-white hover:bg-[#3A2A21] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? 'Sender...'
                : 'Send e-mail til nulstilling af adgangskode'}
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
