'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

interface ResetPasswordFormValues {
  newPassword: string;
  confirmPassword: string;
}

export default function ResetPasswordForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const password = watch('newPassword');

  const onSubmit = async (values: ResetPasswordFormValues) => {
    setApiError(null);

    try {
      console.log('New Password:', values.newPassword);

      // Example API Call
      // await resetPassword(values.newPassword);

      router.push('/signin');
    } catch (err) {
      setApiError(
        err instanceof Error ? err.message : 'Failed to reset password.',
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
              Please enter your new password below.
            </p>
          </div>

          {apiError && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* New Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#211711]">
                New Password
              </label>

              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                  className="h-12 rounded-xl border-[#E8E1DA] pr-12"
                  {...register('newPassword', {
                    required: 'New password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#70655E]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.newPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#211711]">
                Confirm Password
              </label>

              <div className="relative">
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm password"
                  className="h-12 rounded-xl border-[#E8E1DA] pr-12"
                  {...register('confirmPassword', {
                    required: 'Confirm password is required',
                    validate: (value) =>
                      value === password || 'Passwords do not match',
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#70655E]"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full rounded-full bg-[#2D2119] text-white hover:bg-[#3A2A21]"
            >
              {isSubmitting ? 'Updating...' : 'Reset Password'}
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
