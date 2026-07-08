import Profile from '@/src/components/profile';
import { ProtectedRoute } from '@/src/core/context/auth-context';

const ProfilePage = () => {
  return (
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  );
};

export default ProfilePage;
