'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { PROFILE_USER } from '../constants/profile-data';
import { profileClasses } from '../constants/profile-theme';

export function AccountInformationSection() {
  const [form, setForm] = useState({
    firstName: PROFILE_USER.firstName,
    lastName: PROFILE_USER.lastName,
    email: PROFILE_USER.email,
    phone: PROFILE_USER.phone,
    currentPassword: '',
    newPassword: '',
  });

  function handleChange(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // wire up to your update-profile mutation
  }

  return (
    <div>
      <h2 className={cn('text-2xl mb-1', profileClasses.textPrimary)}>
        Account <span className={profileClasses.serifItalic}>Information</span>
      </h2>
      <p className={cn('text-sm mb-6', profileClasses.textSecondary)}>
        Keep your personal information up to date
      </p>

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
    </div>
  );
}
