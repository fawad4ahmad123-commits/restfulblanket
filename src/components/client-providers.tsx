'use client';

import SignupPopup from '../components/signup-popup/signup-popup';
import { Toaster } from '@/components/ui/sonner';

export default function ClientProviders() {
  return (
    <>
      <SignupPopup />
      <Toaster />
    </>
  );
}
