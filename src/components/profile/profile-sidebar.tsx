'use client';

import { LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProfileSectionId } from './types/profile';
import { profileClasses } from './constants/profile-theme';
import {
  PROFILE_FOOTER_NAV_ITEM,
  PROFILE_NAV_ITEMS,
  PROFILE_USER,
} from './constants/profile-data';
import { useAuth } from '@/src/core/context/auth-context';
import { useRouter } from 'next/navigation';

interface ProfileSidebarProps {
  activeSection: ProfileSectionId;
  onSelect: (section: ProfileSectionId) => void;
}

export function ProfileSidebar({
  activeSection,
  onSelect,
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

  return (
    <aside className="w-full max-w-[220px] shrink-0">
      <p
        className={cn(
          'text-xs uppercase tracking-wide mb-1',
          profileClasses.textSecondary,
        )}
      >
        My Account
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
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={cn(
                'flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors text-left',
                isActive
                  ? profileClasses.navItemActive
                  : profileClasses.navItemInactive,
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="my-4 h-px bg-[#EAE1D3]" />

      <nav className="flex flex-col gap-1">
        <button
          type="button"
          onClick={() => onSelect(PROFILE_FOOTER_NAV_ITEM.id)}
          className={cn(
            'flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors text-left',
            activeSection === PROFILE_FOOTER_NAV_ITEM.id
              ? profileClasses.navItemActive
              : profileClasses.navItemInactive,
          )}
        >
          <PROFILE_FOOTER_NAV_ITEM.icon className="h-4 w-4 shrink-0" />
          {PROFILE_FOOTER_NAV_ITEM.label}
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className={cn(
            'flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors text-left cursor-pointer',
            profileClasses.navItemInactive,
          )}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Log out
        </button>
      </nav>
    </aside>
  );
}
