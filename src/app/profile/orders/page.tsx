import { Metadata } from 'next';
import OrdersPageClient from './orders-client';

export const metadata: Metadata = {
  title: 'My Orders | My Account',
};

export default function OrdersPage() {
  return <OrdersPageClient />;
}
