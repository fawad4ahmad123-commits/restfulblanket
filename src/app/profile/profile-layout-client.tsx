'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { profileClasses } from '@/src/components/profile/constants/profile-theme';
import {
  ProfileSidebar,
  ProfileMobileMenuButton,
} from '@/src/components/profile/profile-sidebar';
import { getSectionFromPathname } from '@/src/components/profile/constants/profile-routes';

const SECTION_LABELS = {
  overview: 'Oversigt',
  orders: 'Mine ordrer',
  wishlist: 'Ønskeliste',
  addresses: 'Adresser',
  account: 'Kontooplysninger',
  cancellation: 'Annullering & returnering',
} as const;

export default function ProfileLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = getSectionFromPathname(pathname);

  return (
    <div className={profileClasses.page}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-10 flex flex-col md:flex-row gap-6 md:gap-10">
        <div className="flex md:hidden items-center justify-between">
          <h1 className={profileClasses.textPrimary + ' text-xl font-medium'}>
            {SECTION_LABELS[activeSection]}
          </h1>
          <ProfileMobileMenuButton onOpen={() => setIsMobileMenuOpen(true)} />
        </div>

        <ProfileSidebar
          activeSection={activeSection}
          isMobileOpen={isMobileMenuOpen}
          onMobileClose={() => setIsMobileMenuOpen(false)}
        />

        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
