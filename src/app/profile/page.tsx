import { Metadata } from 'next';
import OverviewPageClient from './overview-client';

export const metadata: Metadata = {
  title: 'Overview | My Account',
};

export default function ProfilePage() {
  return <OverviewPageClient />;
}
