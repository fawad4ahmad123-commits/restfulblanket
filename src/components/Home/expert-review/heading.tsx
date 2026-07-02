import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Heading = () => {
  const router = useRouter();
  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-serif text-[36px] md:text-[48px] leading-tight text-[#392A22]">
          Mød vores
          <span className="italic font-normal"> søvneksperter</span>
        </h2>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            aria-label="View all experts"
            title="View all experts"
            onClick={() => router.push('/expert')}
            className="h-12 gap-2 rounded-full border-[#392A22]/20 bg-[#e5d8cb] px-5 text-sm text-[#392A22] hover:bg-[#392A22] hover:text-white"
          >
            <User aria-hidden="true" className="h-3.5 w-3.5" />
            Se alle specialister
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Heading;
