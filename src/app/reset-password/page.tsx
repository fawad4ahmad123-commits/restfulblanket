import ResetPasswordForm from '@/src/components/password/reset-password';

export const metadata = {
  title: 'Reset Password',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
