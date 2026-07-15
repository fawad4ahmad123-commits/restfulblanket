import { Metadata } from 'next';
import AccountPageClient from './account-client';

export const metadata: Metadata = {
  title: 'Account Information | My Account',
};

export default function AccountInformationPage() {
  return <AccountPageClient />;
}
