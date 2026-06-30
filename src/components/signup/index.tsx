'use client';

import { useState } from 'react';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { signUpSchema, type SignUpFormValues } from './schema';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      keepLoggedIn: false,
    },
  });

  const keepLoggedIn = watch('keepLoggedIn');

  const onSubmit = async (values: SignUpFormValues) => {
    console.log(values);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF8F6] p-4">
      <div className="w-full max-w-[528px]">
        <div className="flex flex-col gap-8 rounded-[24px] border border-[#F0EBE6] bg-white px-6 py-8 shadow-sm">
          <div>
            <h1 className="text-[32px] font-bold leading-tight text-[#211711]">
              Create an Account
            </h1>

            <p className="mt-2 text-sm text-[#70655E]">
              Provide your details to create a new account
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
                Name
              </label>

              <Input
                placeholder="Enter your name"
                className="h-12 rounded-xl border-[#E8E1DA]"
                {...register('name')}
              />

              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

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
            </div>

            <div className="flex items-center gap-3">
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

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full rounded-full bg-[#2D2119] text-white hover:bg-[#3A2A21]"
            >
              {isSubmitting ? 'Loading...' : 'Sign Up'}
            </Button>
          </form>

          <p className="text-center text-sm text-[#70655E]">
            Already have an account?{' '}
            <a href="/signin" className="font-semibold text-[#211711]">
              Sign In
            </a>
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
