'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { SignInFormValues, signInSchema } from './schema';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/core/context/auth-context';

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: '',
      password: '',
      keepLoggedIn: false,
    },
  });

  const keepLoggedIn = watch('keepLoggedIn');

  const onSubmit = async (values: SignInFormValues) => {
    setApiError(null);
    try {
      await login(values.username, values.password);
      router.push('/');
    } catch (err) {
      setApiError(
        err instanceof Error
          ? err.message
          : 'Login failed. Please check your credentials.',
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fff9f5] p-4">
      <div className="w-full max-w-[528px]">
        <div className="flex flex-col gap-8 rounded-[24px] border border-[#F0EBE6] bg-white px-6 py-8 shadow-sm">
          <div>
            <h1 className="text-[32px] font-bold leading-tight text-[#211711]">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-[#70655E]">
              Sign in to continue to your account
            </p>
          </div>

          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="h-12 w-full rounded-full border-[#E8E1DA] bg-[#FFFBF9]"
            >
              Continue as Guest
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E8E1DA]" />
            </div>

            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-sm text-[#8B817A]">or</span>
            </div>
          </div>

          {apiError && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#211711]">
                Username or Email
              </label>

              <Input
                type="text"
                placeholder="Enter your username or email"
                className="h-12 rounded-xl border-[#E8E1DA]"
                {...register('username')}
              />

              {errors.username && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#211711]">
                Password
              </label>

              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="h-12 rounded-xl border-[#E8E1DA] pr-10"
                  {...register('password')}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B817A]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}

              <div className="mt-3 flex items-center justify-between">
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-[#211711] hover:underline"
                >
                  Forgot Password?
                </Link>

                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={keepLoggedIn}
                    onCheckedChange={(checked) =>
                      setValue('keepLoggedIn', !!checked)
                    }
                  />

                  <label className="text-sm text-[#70655E]">
                    Keep me logged in
                  </label>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full rounded-full bg-[#2D2119] text-white hover:bg-[#3A2A21]"
            >
              {isSubmitting ? 'Loading...' : 'Sign In'}
            </Button>
          </form>

          <p className="text-center text-sm text-[#70655E]">
            Don't have an account?{' '}
            <Link href="/signup" className="font-semibold text-[#211711]">
              Sign Up
            </Link>
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push('/')}
          className="mt-6 flex self-start items-center gap-2 text-sm font-medium text-[#35281E] transition-opacity hover:opacity-80 cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to Shopping Cart
        </button>
      </div>
    </div>
  );
}
