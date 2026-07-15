'use client';

import { AccountInformationSection } from '@/src/components/profile/sections/account-information-section';
import { useProfileData } from '@/src/core/context/profile-data-context';

export default function AccountPageClient() {
  const { user } = useProfileData();
  return (
    <AccountInformationSection
      user={user}
      pageUrl="/profile/account-information"
    />
  );
}
