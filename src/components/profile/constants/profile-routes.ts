import { ProfileSectionId } from '../types/profile';

export const SECTION_ROUTES: Record<ProfileSectionId, string> = {
  overview: '/profile',
  orders: '/profile/orders',
  wishlist: '/profile/wishlist',
  addresses: '/profile/addresses',
  account: '/profile/account-information',
  cancellation: '/profile/cancellation-return',
};

export function getSectionFromPathname(pathname: string): ProfileSectionId {
  const match = Object.entries(SECTION_ROUTES).find(
    ([, route]) => route === pathname,
  );
  return (match?.[0] as ProfileSectionId) || 'overview';
}
