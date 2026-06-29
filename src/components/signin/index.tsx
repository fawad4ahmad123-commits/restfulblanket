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

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      keepLoggedIn: false,
    },
  });

  const keepLoggedIn = watch('keepLoggedIn');

  const onSubmit = async (values: SignInFormValues) => {
    console.log(values);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF8F6] p-4">
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
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3.01A11.934 11.934 0 0 0 12 0C7.305 0 3.232 2.582 1.036 6.418l4.23 3.347z"
                />
                <path
                  fill="#4285F4"
                  d="M16.04 15.345c-1.077.736-2.5 1.173-4.04 1.173-2.918 0-5.391-1.991-6.273-4.682l-4.227 3.273A11.934 11.934 0 0 0 12 24c3.305 0 6.277-1.118 8.445-3.045l-4.405-5.61z"
                />
                <path
                  fill="#FBBC05"
                  d="M1.036 15.118l4.227-3.273a7.045 7.045 0 0 1 0-3.691L1.036 6.418A11.932 11.932 0 0 0 0 12c0 1.114.155 2.191.436 3.218z"
                />
                <path
                  fill="#34A853"
                  d="M23.523 9.955H12v4.582h6.586c-.6 2.118-2.11 3.636-4.236 4.436l4.405 5.61C21.436 22.118 24 17.51 24 12c0-.709-.073-1.391-.218-2.045z"
                />
              </svg>
              Continue with Google
            </Button>

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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#211711]">
                Email
              </label>

              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12 rounded-xl border-[#E8E1DA]"
                {...register('email')}
              />

              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
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
          className="mx-auto mt-6 flex items-center gap-2 text-sm font-medium text-[#211711]"
        >
          <ArrowLeft size={16} />
          Back to Shopping Cart
        </button>
      </div>
    </div>
  );
}
