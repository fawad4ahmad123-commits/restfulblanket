import { Metadata } from 'next';
import { ProtectedRoute } from '@/src/core/context/auth-context';
import { ProfileDataProvider } from '@/src/core/context/profile-data-context';
import ProfileLayoutClient from './profile-layout-client';

export const metadata: Metadata = {
  title: 'My Account',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <ProfileDataProvider>
        <ProfileLayoutClient>{children}</ProfileLayoutClient>
      </ProfileDataProvider>
    </ProtectedRoute>
  );
}
