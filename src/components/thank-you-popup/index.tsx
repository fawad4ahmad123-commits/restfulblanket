'use client';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  heading: string;
  description: string;
  redirectUrl: string;
  buttonLabel?: string;
}

export function SuccessDialog({
  open,
  onOpenChange,
  heading,
  description,
  redirectUrl,
  buttonLabel = 'Back to Home',
}: SuccessDialogProps) {
  const router = useRouter();

  function handleRedirect() {
    onOpenChange(false);
    router.push(redirectUrl);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-w-md flex-col items-center gap-6 border-none bg-[#fdf8f1] p-10 text-center shadow-xl [&>button]:hidden sm:rounded-2xl">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <svg
            viewBox="0 0 200 200"
            className="absolute inset-0 h-full w-full text-[#eee1d3]"
            fill="currentColor"
          >
            <path d="M100 4c8 0 15 10 23 12s19-3 26 2 8 17 14 23 20 6 24 14-1 19 2 27 14 13 14 22-10 15-14 22-2 19-2 27-8 17-14 23-16 0-24 2-15 12-23 12-15-10-23-12-19 3-26-2-8-17-14-23-20-6-24-14 1-19-2-27-14-13-14-22 10-15 14-22 2-19 2-27 8-17 14-23 16 0 24-2 15-12 23-12z" />
          </svg>
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#e4d3bf]">
            <Check className="h-7 w-7 text-[#3a2e22]" strokeWidth={3} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight text-[#2e241b]">
            {heading}
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-[#8a7f74]">
            {description}
          </p>
        </div>

        <Button
          onClick={handleRedirect}
          className="rounded-full bg-[#3a2e22] px-8 py-5 text-sm font-medium text-white hover:bg-[#2e241b]"
        >
          {buttonLabel}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
