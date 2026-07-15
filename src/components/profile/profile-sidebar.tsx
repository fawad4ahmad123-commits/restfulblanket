'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { LogOut, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProfileSectionId } from './types/profile';
import { profileClasses } from './constants/profile-theme';
import { SECTION_ROUTES } from './constants/profile-routes';
import {
  PROFILE_FOOTER_NAV_ITEM,
  PROFILE_NAV_ITEMS,
  PROFILE_USER,
} from './constants/profile-data';
import { useAuth } from '@/src/core/context/auth-context';
import { useRouter } from 'next/navigation';

interface ProfileSidebarProps {
  activeSection: ProfileSectionId;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export function ProfileSidebar({
  activeSection,
  isMobileOpen,
  onMobileClose,
}: ProfileSidebarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/signin');
  };

  const displayFirstName = user?.name
    ? user.name.split(' ')[0]
    : PROFILE_USER.firstName;

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const navContent = (
    <>
      <p
        className={cn(
          'text-xs uppercase tracking-wide mb-1',
          profileClasses.textSecondary,
        )}
      >
        Min konto
      </p>
      <h1 className={cn('text-2xl mb-6', profileClasses.textPrimary)}>
        Hej,{' '}
        <span className={profileClasses.serifItalic}>{displayFirstName}</span>
      </h1>

      <nav className="flex flex-col gap-1">
        {PROFILE_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <Link
              key={item.id}
              href={SECTION_ROUTES[item.id]}
              onClick={onMobileClose}
              className={cn(
                'flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? profileClasses.navItemActive
                  : profileClasses.navItemInactive,
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="my-4 h-px bg-[#EAE1D3]" />

      <nav className="flex flex-col gap-1">
        <Link
          href={SECTION_ROUTES[PROFILE_FOOTER_NAV_ITEM.id]}
          onClick={onMobileClose}
          className={cn(
            'flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors',
            activeSection === PROFILE_FOOTER_NAV_ITEM.id
              ? profileClasses.navItemActive
              : profileClasses.navItemInactive,
          )}
        >
          <PROFILE_FOOTER_NAV_ITEM.icon className="h-4 w-4 shrink-0" />
          {PROFILE_FOOTER_NAV_ITEM.label}
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className={cn(
            'flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors text-left cursor-pointer',
            profileClasses.navItemInactive,
          )}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Log ud
        </button>
      </nav>
    </>
  );

  return (
    <>
      <aside className="hidden md:block w-full max-w-[220px] shrink-0">
        {navContent}
      </aside>

      <div
        className={cn(
          'md:hidden fixed inset-0 z-50 transition-opacity duration-300',
          isMobileOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        )}
        aria-hidden={!isMobileOpen}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onMobileClose}
        />
        <div
          className={cn(
            'absolute inset-y-0 left-0 w-[85%] max-w-[320px] bg-[#FAF6F0] shadow-xl p-6 overflow-y-auto transition-transform duration-300 ease-out',
            isMobileOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <button
            type="button"
            onClick={onMobileClose}
            aria-label="Close menu"
            className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#EAE1D3] bg-white text-[#2B2420] cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="mt-8">{navContent}</div>
        </div>
      </div>
    </>
  );
}

export function ProfileMobileMenuButton({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Open menu"
      className="md:hidden flex items-center gap-2 rounded-full border border-[#EAE1D3] bg-white px-4 py-2 text-sm font-medium text-[#2B2420] shadow-sm cursor-pointer"
    >
      <Menu className="h-4 w-4" />
      Menu
    </button>
  );
}
