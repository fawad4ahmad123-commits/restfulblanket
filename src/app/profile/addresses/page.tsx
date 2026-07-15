import { Metadata } from 'next';
import AddressesPageClient from './addresses-client';

export const metadata: Metadata = {
  title: 'Addresses | My Account',
};

export default function AddressesPage() {
  return <AddressesPageClient />;
}
