import { Metadata } from 'next';
import CancellationPageClient from './cancellation-client';

export const metadata: Metadata = {
  title: 'Cancellation & Return | My Account',
};

export default function CancellationReturnPage() {
  return <CancellationPageClient />;
}
