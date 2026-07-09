'use client';

import { useState } from 'react';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { signUpSchema, type SignUpFormValues } from './schema';
import { useAuth } from '@/src/core/context/auth-context';
import { SuccessDialog } from '@/src/components/thank-you-popup';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();
  const { signup } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      keepLoggedIn: false,
    },
  });

  const keepLoggedIn = watch('keepLoggedIn');
  const userEmail = watch('email');

  const onSubmit = async (values: SignUpFormValues) => {
    setApiError(null);
    try {
      await signup({
        firstname: values.firstname,
        lastname: values.lastname,
        username: values.username,
        email: values.email,
        password: values.password,
      });
      setShowSuccess(true);
    } catch (err) {
      setApiError(
        err instanceof Error
          ? err.message
          : 'Registrering mislykkedes. Prøv venligst igen.',
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF8F6] p-4">
      <div className="w-full max-w-[528px]">
        <div className="flex flex-col gap-8 rounded-[24px] border border-[#F0EBE6] bg-white px-6 py-8 shadow-sm">
          <div>
            <h1 className="text-[32px] font-bold leading-tight text-[#211711]">
              Opret en konto
            </h1>

            <p className="mt-2 text-sm text-[#70655E]">
              Indtast dine oplysninger for at oprette en ny konto
            </p>
          </div>

          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="h-12 w-full rounded-full border-[#E8E1DA] bg-[#FFFBF9]"
              onClick={() => router.push('/')}
            >
              Fortsæt som gæst
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E8E1DA]" />
            </div>

            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-sm text-[#8B817A]">
                eller
              </span>
            </div>
          </div>

          {apiError && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#211711]">
                  Fornavn
                </label>
                <Input
                  placeholder="Fornavn"
                  className="h-12 rounded-xl border-[#E8E1DA]"
                  {...register('firstname')}
                />
                {errors.firstname && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.firstname.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#211711]">
                  Efternavn
                </label>
                <Input
                  placeholder="Efternavn"
                  className="h-12 rounded-xl border-[#E8E1DA]"
                  {...register('lastname')}
                />
                {errors.lastname && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.lastname.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#211711]">
                Brugernavn
              </label>
              <Input
                placeholder="Vælg et brugernavn"
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
                E-mail
              </label>

              <Input
                type="email"
                placeholder="Indtast din e-mailadresse"
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
                Adgangskode
              </label>

              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Indtast din adgangskode"
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
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full rounded-full bg-[#2D2119] text-white hover:bg-[#3A2A21] mt-[10px]"
            >
              {isSubmitting ? 'Indlæser...' : 'Opret konto'}
            </Button>
          </form>

          <p className="text-center text-sm text-[#70655E]">
            Har du allerede en konto?{' '}
            <a href="/signin" className="font-semibold text-[#211711]">
              Log ind
            </a>
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push('/')}
          className="mx-auto mt-6 flex items-center gap-2 text-sm font-medium text-[#211711]"
        >
          <ArrowLeft size={16} />
          Tilbage til indkøbskurven
        </button>
      </div>

      <SuccessDialog
        open={showSuccess}
        onOpenChange={setShowSuccess}
        heading="Tjek din e-mail"
        description={
          <>
            Du er nu registreret! Venligst bekræft din e-mailadresse{' '}
            <span className="font-semibold text-[#211711]">{userEmail}</span>{' '}
            for at logge ind.
          </>
        }
        redirectUrl="/signin"
        buttonLabel="Gå til login"
      />
    </div>
  );
}
