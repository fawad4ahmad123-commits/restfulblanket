import VerifyEmailPage from '@/src/components/verify-email';

export const metadata = {
  title: 'Verify Email',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <VerifyEmailPage />;
}
