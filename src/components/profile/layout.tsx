'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { profileClasses } from '@/src/components/profile/constants/profile-theme';
import {
    ProfileSidebar,
    ProfileMobileMenuButton,
} from '@/src/components/profile/profile-sidebar';
import { ProfileSectionId } from '@/src/components/profile/types/profile';
import { ProfileDataProvider } from '../../context/profile-data-context';

const SECTION_LABELS: Record<ProfileSectionId, string> = {
    overview: 'Overview',
    orders: 'My Orders',
    wishlist: 'Wishlist',
    addresses: 'Addresses',
    account: 'Account Information',
    cancellation: 'Cancellation & return',
};

function getSectionFromPathname(pathname: string): ProfileSectionId {
    const segment = pathname.split('/').filter(Boolean).pop() as ProfileSectionId;
    return segment in SECTION_LABELS ? segment : 'overview';
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const activeSection = getSectionFromPathname(pathname);

    function handleSelect(section: ProfileSectionId) {
        router.push(`/profile/${section}`);
    }

    return (
        <ProfileDataProvider>
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
                        onSelect={handleSelect}
                        isMobileOpen={isMobileMenuOpen}
                        onMobileClose={() => setIsMobileMenuOpen(false)}
                    />

                    <main className="flex-1 min-w-0">{children}</main>
                </div>
            </div>
        </ProfileDataProvider>
    );
}