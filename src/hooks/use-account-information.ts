import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '@/src/core/context/auth-context';
import { accountApi, AuthRequiredError } from '../lib/account-information';
import { PROFILE_USER } from '../components/profile/constants/profile-data';

export interface ProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

/**
 * Maps WordPress user data to our ProfileForm format
 * WordPress API returns: { id, name, email, meta, first_name?, last_name? }
 */
function toProfileForm(user: any, fallback: ProfileForm): ProfileForm {
  if (!user) return fallback;

  let firstName = fallback.firstName;
  let lastName = fallback.lastName;

  if (user.first_name || user.last_name) {
    firstName = user.first_name || fallback.firstName;
    lastName = user.last_name || fallback.lastName;
  } else if (user.name) {
    const nameParts = user.name.trim().split(' ');
    if (nameParts.length >= 2) {
      firstName = nameParts[0];
      lastName = nameParts.slice(1).join(' ');
    } else {
      firstName = user.name;
      lastName = '';
    }
  }

  return {
    firstName: firstName,
    lastName: lastName,
    email: user.email || user.user_email || fallback.email,
    phone:
      user.phone ||
      user.meta?.phone ||
      user.meta?.billing_phone ||
      fallback.phone,
  };
}

function friendlyError(error: unknown, fallback: string): string {
  if (error instanceof AuthRequiredError)
    return 'You must be logged in to do this.';
  return error instanceof Error ? error.message : fallback;
}

export function useAccountUser(initialUser: any) {
  const [userData, setUserData] = useState(initialUser || null);
  const [form, setForm] = useState<ProfileForm>(
    toProfileForm(initialUser, {
      firstName: PROFILE_USER.firstName,
      lastName: PROFILE_USER.lastName,
      email: PROFILE_USER.email,
      phone: PROFILE_USER.phone,
    }),
  );
  const [isLoading, setIsLoading] = useState(!initialUser);

  const refetchUser = async () => {
    try {
      setIsLoading(true);
      const updatedUser = await accountApi.fetchCurrentUser();
      console.log('Refetched user data:', updatedUser); // Debug log
      setUserData(updatedUser);
      setForm((prev) => toProfileForm(updatedUser, prev));
      return updatedUser;
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Could not refresh user data.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialUser) {
      console.log('Initial user provided:', initialUser);
      setUserData(initialUser);
      setForm(
        toProfileForm(initialUser, {
          firstName: PROFILE_USER.firstName,
          lastName: PROFILE_USER.lastName,
          email: PROFILE_USER.email,
          phone: PROFILE_USER.phone,
        }),
      );
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    accountApi
      .fetchCurrentUser()
      .then((updatedUser: any) => {
        if (cancelled) return;
        console.log('Fetched user data:', updatedUser); // Debug log
        setUserData(updatedUser);
        setForm((prev) => toProfileForm(updatedUser, prev));
      })
      .catch((error: any) => {
        if (error instanceof AuthRequiredError) {
          console.log('User not logged in');
        } else {
          console.error('Error fetching user data:', error);
          toast.error('Could not load your profile data.');
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [initialUser]);

  return {
    userData,
    setUserData,
    form,
    setForm,
    refetchUser,
    isLoading,
  };
}

export function useProfileUpdate(
  form: ProfileForm,
  setForm: React.Dispatch<React.SetStateAction<ProfileForm>>,
  setUserData: (user: any) => void,
  refetchUser?: () => Promise<any>,
) {
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    try {
      const response = await accountApi.updateProfile({
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        phone: form.phone,
      });

      console.log('Update profile response:', response);

      if (response.data) {
        setUserData(response.data);
        const updatedForm = toProfileForm(response.data, form);
        setForm(updatedForm);
      }

      if (refetchUser) {
        await refetchUser();
      }

      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error(friendlyError(error, 'Could not update your profile.'));
    } finally {
      setIsSaving(false);
    }
  }

  return { isSaving, handleSubmit };
}

export function usePasswordUpdate() {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      toast.error('Please fill in both password fields.');
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      toast.error('New password must be at least 8 characters.');
      return;
    }

    setIsSaving(true);
    try {
      await accountApi.changePassword(
        passwordForm.currentPassword,
        passwordForm.newPassword,
      );
      toast.success('Password updated successfully!');
      setPasswordForm({ currentPassword: '', newPassword: '' });
    } catch (error) {
      console.error('Change password error:', error);
      toast.error(friendlyError(error, 'Could not change your password.'));
    } finally {
      setIsSaving(false);
    }
  }

  return { passwordForm, setPasswordForm, isSaving, handleSubmit };
}

export function useDeleteProfile() {
  const { logout } = useAuth();
  const router = useRouter();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  async function handleDelete() {
    try {
      await accountApi.deleteProfile();
      toast.success('Profile deleted successfully.');
      logout();
      router.push('/');
    } catch (error) {
      console.error('Error deleting profile:', error);
      toast.error(
        friendlyError(
          error,
          'Could not delete your profile. Please try again.',
        ),
      );
    } finally {
      setIsConfirmOpen(false);
    }
  }

  return { isConfirmOpen, setIsConfirmOpen, handleDelete };
}
