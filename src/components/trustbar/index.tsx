import Image from 'next/image';
import { cn } from '@/lib/utils';

const trustItems = [
  {
    icon: '/home/shieldIcon.png',
    alt: '90 night guarantee',
    title: '90 nætter',
    subtitle: 'Sikkerhed',
    monochrome: true,
  },
  {
    icon: '/home/caricon.png',
    alt: 'Free delivery and returns',
    title: 'Gratis levering',
    subtitle: '& Return',
    monochrome: true,
  },
  {
    icon: '/home/CEicon.png',
    alt: 'CE certified medical product',
    title: 'Medicinsk',
    subtitle: 'Approved (CE)',
    monochrome: true,
  },
  {
    icon: '/home/DK - Denmark.png',
    alt: 'Hand-sewn in Denmark',
    title: 'Hand-sewn',
    subtitle: 'In Denmark',
    monochrome: false,
  },
];

export function TrustBar({ isHome }: { isHome: boolean }) {
  return (
    <div
      className={cn(
        isHome ? ' left-0 right-0 z-20 md:mt-0 mt-4' : 'left-0 right-0 z-20',
        isHome ? 'absolute top-[101.5px]' : 'relative pt-0',
      )}
    >
      <div
        className={cn(
          'mx-auto border-y backdrop-blur-sm',
          isHome
            ? 'border-[#f6eee7] bg-white/5'
            : 'border-[#392A22]/10 bg-[#FFF9F5]',
        )}
      >
        <div className="grid grid-cols-2 md:grid-cols-4">
          {trustItems.map((item, i) => (
            <div
              key={item.alt}
              className={cn(
                'flex h-[56px] md:h-[62px] items-center justify-center gap-2 md:gap-3 border-[#f6eee7]',
                i % 2 === 0 && 'border-r md:border-r',
                i % 4 !== 3 && i % 2 !== 0 && 'md:border-r',
                i < 2 && 'border-b md:border-b-0',
              )}
            >
              <Image
                src={item.icon}
                alt={item.alt}
                width={20}
                height={20}
                className={cn(
                  'h-5 w-5 md:h-[18px] md:w-[18px]',
                  !isHome && item.monochrome && 'brightness-0',
                )}
              />
              <div>
                <p
                  className={cn(
                    'text-sm md:text-xs',
                    isHome ? 'text-white' : 'text-[#392A22]',
                  )}
                >
                  {item.title}
                </p>
                <p
                  className={cn(
                    'text-xs md:text-[10px]',
                    isHome ? 'text-white/60' : 'text-[#392A22]',
                  )}
                >
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
