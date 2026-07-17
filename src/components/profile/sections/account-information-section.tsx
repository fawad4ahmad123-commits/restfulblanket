'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { profileClasses } from '../constants/profile-theme';
import { Loader2, Trash2 } from 'lucide-react';
import {
  useAccountUser,
  useProfileUpdate,
  usePasswordUpdate,
  useDeleteProfile,
} from '../../../hooks/use-account-information';
import { useRankMathSeo } from '../../../hooks/use-rankmath-seo';
import { useEffect } from 'react';

interface AccountInformationSectionProps {
  user?: any;
  /** Front-end URL RankMath should generate SEO meta for. Defaults to the current page. */
  pageUrl?: string;
}

export function AccountInformationSection({
  user: initialUser,
  pageUrl,
}: AccountInformationSectionProps) {
  const { userData, setUserData, form, setForm, refetchUser } =
    useAccountUser(initialUser);

  const { isSaving: isSavingProfile, handleSubmit } = useProfileUpdate(
    form,
    setForm,
    setUserData,
    refetchUser,
  );

  const {
    passwordForm,
    setPasswordForm,
    isSaving: isSavingPassword,
    handleSubmit: handlePasswordSubmit,
  } = usePasswordUpdate();

  const { isConfirmOpen, setIsConfirmOpen, handleDelete } = useDeleteProfile();

  useRankMathSeo(
    pageUrl ?? (typeof window !== 'undefined' ? window.location.href : ''),
  );

  function handleFieldChange(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev: any) => ({ ...prev, [field]: e.target.value }));
  }

  function handlePasswordFieldChange(field: keyof typeof passwordForm) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setPasswordForm((prev: any) => ({ ...prev, [field]: e.target.value }));
  }

  return (
    <div>
      <AccountHeader onDeleteClick={() => setIsConfirmOpen(true)} />

      <ProfileForm
        form={form}
        isSaving={isSavingProfile}
        onFieldChange={handleFieldChange}
        onSubmit={handleSubmit}
      />

      <PasswordForm
        passwordForm={passwordForm}
        isSaving={isSavingPassword}
        onFieldChange={handlePasswordFieldChange}
        onSubmit={handlePasswordSubmit}
      />

      {isConfirmOpen && (
        <DeleteConfirmModal
          onCancel={() => setIsConfirmOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

function AccountHeader({ onDeleteClick }: { onDeleteClick: () => void }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
      <div>
        <h2 className={cn('text-2xl mb-1', profileClasses.textPrimary)}>
          Kontooplysninger
        </h2>
        <p className={cn('text-sm', profileClasses.textSecondary)}>
          Hold din personlige information opdateret
        </p>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={onDeleteClick}
        className="w-full sm:w-auto sm:mt-0 flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 transition-colors cursor-pointer bg-transparent shadow-none self-start"
      >
        <Trash2 className="h-4 w-4 shrink-0" />
        Slet profil
      </Button>
    </div>
  );
}

interface ProfileFormProps {
  form: { firstName: string; lastName: string; email: string; phone: string };
  isSaving: boolean;
  onFieldChange: (
    field: keyof ProfileFormProps['form'],
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

function ProfileForm({
  form,
  isSaving,
  onFieldChange,
  onSubmit,
}: ProfileFormProps) {
  const fields: {
    id: keyof ProfileFormProps['form'];
    label: string;
    type?: string;
  }[] = [
    { id: 'firstName', label: 'Fornavn' },
    { id: 'lastName', label: 'Efternavn' },
    { id: 'email', label: 'E-mailadresse', type: 'email' },
    { id: 'phone', label: 'Telefonnummer', type: 'tel' },
  ];

  return (
    <form
      onSubmit={onSubmit}
      className={cn(profileClasses.surfaceCard, 'p-4 sm:p-6 mb-6')}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        {fields.map(({ id, label, type }) => (
          <div key={id} className="space-y-1.5">
            <Label htmlFor={id} className={profileClasses.textSecondary}>
              {label}
            </Label>
            <Input
              id={id}
              type={type}
              value={form[id]}
              onChange={onFieldChange(id)}
              className="bg-[#FAF6F0] border-[#EAE1D3]"
            />
          </div>
        ))}
      </div>

      <Button
        type="submit"
        disabled={isSaving}
        className={cn(profileClasses.buttonDark, 'w-full sm:w-auto')}
      >
        {isSaving ? <SavingLabel text="Gemmer..." /> : 'Gem ændringer'}
      </Button>
    </form>
  );
}

interface PasswordFormProps {
  passwordForm: { currentPassword: string; newPassword: string };
  isSaving: boolean;
  onFieldChange: (
    field: keyof PasswordFormProps['passwordForm'],
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

function PasswordForm({
  passwordForm,
  isSaving,
  onFieldChange,
  onSubmit,
}: PasswordFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className={cn(profileClasses.surfaceCard, 'p-4 sm:p-6')}
    >
      <h3 className={cn('text-lg mb-4', profileClasses.textPrimary)}>
        Ændre <span className={profileClasses.serifItalic}>password</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        <div className="space-y-1.5">
          <Label
            htmlFor="currentPassword"
            className={profileClasses.textSecondary}
          >
            Nuværende password
          </Label>
          <Input
            id="currentPassword"
            type="password"
            value={passwordForm.currentPassword}
            onChange={onFieldChange('currentPassword')}
            className="bg-[#FAF6F0] border-[#EAE1D3]"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="newPassword" className={profileClasses.textSecondary}>
            Nyt password
          </Label>
          <Input
            id="newPassword"
            type="password"
            placeholder="Mindst 8 tegn"
            value={passwordForm.newPassword}
            onChange={onFieldChange('newPassword')}
            className="bg-[#FAF6F0] border-[#EAE1D3] placeholder:text-[#B7AB9C]"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSaving}
        className={cn(profileClasses.buttonDark, 'w-full sm:w-auto')}
      >
        {isSaving ? <SavingLabel text="Opdaterer..." /> : 'Opdater password'}
      </Button>
    </form>
  );
}

function SavingLabel({ text }: { text: string }) {
  return (
    <span className="flex items-center gap-2">
      <Loader2 className="h-4 w-4 animate-spin" /> {text}
    </span>
  );
}

function DeleteConfirmModal({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onCancel}
    >
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
          profil, vil dine data blive permanent slettet og kan ikke gendannes.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            className="rounded-full px-5 text-sm font-medium text-neutral-500 hover:bg-neutral-100"
          >
            Annuller
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            className="rounded-full px-5 text-sm font-medium bg-rose-600 text-white hover:bg-rose-700 shadow-sm"
          >
            Ja, slet profil
          </Button>
        </div>
      </div>
    </div>
  );
}
