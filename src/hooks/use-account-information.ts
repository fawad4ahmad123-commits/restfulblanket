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

function toProfileForm(user: any, fallback: ProfileForm): ProfileForm {
    if (!user) return fallback;
    return {
        firstName: user.first_name || user.firstName || fallback.firstName,
        lastName: user.last_name || user.lastName || fallback.lastName,
        email: user.email || fallback.email,
        phone: user.phone || user.meta?.phone || fallback.phone,
    };
}

function friendlyError(error: unknown, fallback: string): string {
    if (error instanceof AuthRequiredError) return 'You must be logged in to do this.';
    return error instanceof Error ? error.message : fallback;
}

/** Loads the current user (unless already provided) and keeps the profile form in sync. */
export function useAccountUser(initialUser: any) {
    const [userData, setUserData] = useState(initialUser || null);
    const [form, setForm] = useState<ProfileForm>(
        toProfileForm(initialUser, {
            firstName: PROFILE_USER.firstName,
            lastName: PROFILE_USER.lastName,
            email: PROFILE_USER.email,
            phone: PROFILE_USER.phone,
        })
    );

    useEffect(() => {
        if (initialUser) return;
        let cancelled = false;

        accountApi
            .fetchCurrentUser()
            .then((updatedUser: any) => {
                if (cancelled) return;
                setUserData(updatedUser);
                setForm((prev) => toProfileForm(updatedUser, prev));
            })
            .catch((error: any) => console.error('Error fetching user data:', error));

        return () => {
            cancelled = true;
        };
    }, [initialUser]);

    return { userData, setUserData, form, setForm };
}

/** Handles submitting the profile (name/email/phone) form. */
export function useProfileUpdate(
    form: ProfileForm,
    setForm: React.Dispatch<React.SetStateAction<ProfileForm>>,
    setUserData: (user: any) => void
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

            if (response.data) {
                setUserData(response.data);
                setForm((prev) => ({
                    firstName: response.data.first_name || prev.firstName,
                    lastName: response.data.last_name || prev.lastName,
                    email: response.data.email || prev.email,
                    phone: response.data.phone || prev.phone,
                }));
            }

            toast.success('Profile updated successfully!');
        } catch (error) {
            toast.error(friendlyError(error, 'Could not update your profile.'));
        } finally {
            setIsSaving(false);
        }
    }

    return { isSaving, handleSubmit };
}

/** Handles the change-password form, including client-side validation. */
export function usePasswordUpdate() {
    const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '' });
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
            await accountApi.changePassword(passwordForm.currentPassword, passwordForm.newPassword);
            toast.success('Password updated successfully!');
            setPasswordForm({ currentPassword: '', newPassword: '' });
        } catch (error) {
            toast.error(friendlyError(error, 'Could not change your password.'));
        } finally {
            setIsSaving(false);
        }
    }

    return { passwordForm, setPasswordForm, isSaving, handleSubmit };
}

/** Handles the delete-account confirmation flow. */
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
            toast.error(friendlyError(error, 'Could not delete your profile. Please try again.'));
        } finally {
            setIsConfirmOpen(false);
        }
    }

    return { isConfirmOpen, setIsConfirmOpen, handleDelete };
}