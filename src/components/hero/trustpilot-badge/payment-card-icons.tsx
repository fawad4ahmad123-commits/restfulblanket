import Image from 'next/image';

export const VisaIcon = () => (
  <div className="flex h-8 w-16 items-center justify-center rounded-md bg-white shadow-sm">
    <svg
      viewBox="0 0 48 16"
      className="h-4 w-10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="0"
        y="13"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="bold"
        fontStyle="italic"
        fontSize="16"
        fill="#1A1F71"
      >
        VISA
      </text>
    </svg>
  </div>
);

export const MastercardIcon = () => (
  <div className="flex h-8 w-16 items-center justify-center rounded-md bg-white shadow-sm">
    <svg
      viewBox="0 0 40 24"
      className="h-6 w-10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="12" r="10" fill="#EB001B" />
      <circle cx="24" cy="12" r="10" fill="#F79E1B" fillOpacity="0.9" />
      <path d="M20 4.5a10 10 0 0 1 0 15 10 10 0 0 1 0-15Z" fill="#FF5F00" />
    </svg>
  </div>
);

export const QuickPayIcon = () => (
  <div className="flex h-8 w-16 shrink-0 items-center justify-center rounded-md bg-white shadow-sm">
    <Image src="/home/mobilepay.png" alt="quickpay" width={20} height={20} />
  </div>
);

export const ApplePayIcon = () => (
  <div className="flex h-8 w-16 items-center justify-center gap-1 rounded-md bg-white shadow-sm">
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="#000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16.365 1.43c0 1.14-.462 2.146-1.203 2.9-.808.83-2.14 1.47-3.24 1.38-.132-1.1.44-2.26 1.17-2.98.78-.78 2.14-1.36 3.27-1.3zM20.5 17.36c-.55 1.27-.81 1.84-1.52 2.96-1 1.58-2.4 3.55-4.15 3.57-1.55.02-1.95-1-4.05-1s-2.55.98-4.08 1.02c-1.65.05-2.9-1.7-3.9-3.28C.98 17.15.14 12.45 1.83 9.3c.83-1.55 2.32-2.53 3.94-2.55 1.5-.02 2.92 1 3.83 1 .91 0 2.63-1.24 4.43-1.06.75.03 2.87.3 4.23 2.28-.11.07-2.52 1.47-2.5 4.38.03 3.48 3.05 4.63 3.24 4.73z" />
    </svg>
    <span className="text-sm font-semibold text-black"> Pay </span>
  </div>
);

export const VabillIcon = () => (
  <div className="flex h-8 w-16 items-center justify-center rounded-md bg-white shadow-sm">
    <span className="text-sm font-extrabold italic tracking-tight text-[#7B2FF7]">
      VABILL
    </span>
  </div>
);

export const StarIcon = () => (
  <svg
    viewBox="0 0 20 20"
    className="h-4 w-4"
    fill="white"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.15l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z" />
  </svg>
);

export const TrustpilotBadge = () => (
  <div className="flex items-center gap-2">
    <span className="text-sm font-semibold text-white"> Fremragende </span>
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex h-5 w-5 items-center justify-center bg-[#00B67A] cursor-pointer"
          onClick={() => {
            window.open(
              'https://dk.trustpilot.com/review/restfulblanket.dk',
              '_blank',
            );
          }}
        >
          <StarIcon />
        </div>
      ))}
    </div>
    <span className="text-sm font-medium text-white"> Trustpilot </span>
  </div>
);
