'use client';

import SearchPage from '@/src/components/search';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  return <SearchPage onClose={() => router.back()} />;
}
