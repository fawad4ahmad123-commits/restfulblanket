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

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
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
