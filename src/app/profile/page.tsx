import Profile from '@/src/components/profile';
import { ProtectedRoute } from '@/src/core/context/auth-context';

export const metadata = {
  title: 'My Account',
  robots: {
    index: false,
    follow: false,
  },
};

const ProfilePage = () => {
  return (
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  );
};

export default ProfilePage;
