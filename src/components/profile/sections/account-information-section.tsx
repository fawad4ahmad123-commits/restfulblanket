'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { PROFILE_USER } from '../constants/profile-data';
import { profileClasses } from '../constants/profile-theme';
import { useAuth } from '@/src/core/context/auth-context';

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function AccountInformationSection() {
  const [form, setForm] = useState({
    firstName: PROFILE_USER.firstName,
    lastName: PROFILE_USER.lastName,
    email: PROFILE_USER.email,
    phone: PROFILE_USER.phone,
    currentPassword: '',
    newPassword: '',
  });
  const { logout } = useAuth();
  const router = useRouter();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  function handleChange(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  const CONFIRM_DELETE_PROFILE = async () => {
    try {
      const token = localStorage.getItem('auth_token');

      if (!token) {
        alert('You must be logged in to delete your profile.');
        return;
      }
      const response = await fetch(
        'https://tapbookme.com/wp-json/custom/v1/delete-profile',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Something went wrong while deleting your profile.',
        );
      }
      logout();
      router.push('/');
    } catch (error: any) {
      console.error('Error deleting profile:', error);
      alert(
        error.message || 'Could not delete your profile. Please try again.',
      );
    } finally {
      setIsConfirmOpen(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <h2 className={cn('text-2xl mb-1', profileClasses.textPrimary)}>
            Account{' '}
            <span className={profileClasses.serifItalic}>Information</span>
          </h2>
          <p className={cn('text-sm', profileClasses.textSecondary)}>
            Keep your personal information up to date
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => setIsConfirmOpen(true)}
          className="sm:mt-0 flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 transition-colors cursor-pointer bg-transparent shadow-none self-start"
        >
          <Trash2 className="h-4 w-4 shrink-0" />
          Slet profil
        </Button>
      </div>

      <form
        onSubmit={handleSubmit}
        className={cn(profileClasses.surfaceCard, 'p-6')}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
          <div className="space-y-1.5">
            <Label htmlFor="firstName" className={profileClasses.textSecondary}>
              First name
            </Label>
            <Input
              id="firstName"
              value={form.firstName}
              onChange={handleChange('firstName')}
              className="bg-[#FAF6F0] border-[#EAE1D3]"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lastName" className={profileClasses.textSecondary}>
              Surname
            </Label>
            <Input
              id="lastName"
              value={form.lastName}
              onChange={handleChange('lastName')}
              className="bg-[#FAF6F0] border-[#EAE1D3]"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email" className={profileClasses.textSecondary}>
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              className="bg-[#FAF6F0] border-[#EAE1D3]"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone" className={profileClasses.textSecondary}>
              Phone number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange('phone')}
              className="bg-[#FAF6F0] border-[#EAE1D3]"
            />
          </div>
        </div>

        <h3 className={cn('text-lg mb-4', profileClasses.textPrimary)}>
          Change <span className={profileClasses.serifItalic}>password</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
          <div className="space-y-1.5">
            <Label
              htmlFor="currentPassword"
              className={profileClasses.textSecondary}
            >
              Current password
            </Label>
            <Input
              id="currentPassword"
              type="password"
              value={form.currentPassword}
              onChange={handleChange('currentPassword')}
              className="bg-[#FAF6F0] border-[#EAE1D3]"
            />
          </div>
          <div className="space-y-1.5">
            <Label
              htmlFor="newPassword"
              className={profileClasses.textSecondary}
            >
              New password
            </Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="At least 8 characters"
              value={form.newPassword}
              onChange={handleChange('newPassword')}
              className="bg-[#FAF6F0] border-[#EAE1D3] placeholder:text-[#B7AB9C]"
            />
          </div>
        </div>

        <Button type="submit" className={profileClasses.buttonDark}>
          Save changes
        </Button>
      </form>
      {isConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#EAE1D3] scale-in-95 duration-200 animate-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-rose-50 rounded-full text-rose-600">
                <Trash2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900">
                Slet profil
              </h3>
            </div>

            <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
              Er du sikker på, at du vil slette din konto? Hvis du sletter din
              profil, vil dine data blive permanent slettet og kan ikke
              gendannes.
            </p>

            <div className="flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsConfirmOpen(false)}
                className="rounded-full px-5 text-sm font-medium text-neutral-500 hover:bg-neutral-100"
              >
                Annuller
              </Button>
              <Button
                type="button"
                onClick={CONFIRM_DELETE_PROFILE}
                className="rounded-full px-5 text-sm font-medium bg-rose-600 text-white hover:bg-rose-700 shadow-sm"
              >
                Ja, slet profil
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
