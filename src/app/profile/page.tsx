'use client';
import { profileClasses } from '@/src/components/profile/constants/profile-theme';
import { ProfileSidebar } from '@/src/components/profile/profile-sidebar';
import { AccountInformationSection } from '@/src/components/profile/sections/account-information-section';
import { AddressesSection } from '@/src/components/profile/sections/addresses-section';
import { CancellationReturnSection } from '@/src/components/profile/sections/cancellation-return-section';
import { OrdersSection } from '@/src/components/profile/sections/orders-section';
import { OverviewSection } from '@/src/components/profile/sections/overview-section';
import { WishlistSection } from '@/src/components/profile/sections/wishlist-section';
import { ProfileSectionId } from '@/src/components/profile/types/profile';
import { useState } from 'react';

const SECTION_COMPONENTS: Record<ProfileSectionId, React.ComponentType> = {
  overview: OverviewSection,
  orders: OrdersSection,
  wishlist: WishlistSection,
  addresses: AddressesSection,
  account: AccountInformationSection,
  cancellation: CancellationReturnSection,
};

export default function ProfilePage() {
  const [activeSection, setActiveSection] =
    useState<ProfileSectionId>('overview');
  const ActiveComponent = SECTION_COMPONENTS[activeSection];

  return (
    <div className={profileClasses.page}>
      <div className="mx-auto max-w-6xl px-6 py-10 flex gap-10">
        <ProfileSidebar
          activeSection={activeSection}
          onSelect={setActiveSection}
        />
        <main className="flex-1 min-w-0">
          <ActiveComponent />
        </main>
      </div>
    </div>
  );
}
