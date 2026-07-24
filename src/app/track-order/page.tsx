import {
  Check,
  AlertCircle,
  RotateCcw,
  XCircle,
  Package,
  Truck,
  ShoppingBag,
} from 'lucide-react';

const STEPS = [
  {
    key: 'pending',
    label: 'Ordre modtaget',
    icon: ShoppingBag,
  },
  {
    key: 'on-hold',
    label: 'Afventer bekræftelse',
    icon: Package,
  },
  {
    key: 'processing',
    label: 'Behandles',
    icon: Truck,
  },
  {
    key: 'completed',
    label: 'Leveret',
    icon: Check,
  },
];

const STEP_COUNT = STEPS.length;
const EDGE_INSET = 100 / (STEP_COUNT * 2);
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface TrackOrderPageProps {
  searchParams: Promise<{ id?: string; key?: string }>;
}

async function getOrderStatus(
  orderId: string,
): Promise<{ status: string; orderKey?: string } | null> {
  const consumerKey = process.env.WC_CONSUMER_KEY;
  const consumerSecret = process.env.WC_CONSUMER_SECRET;

  if (!consumerKey || !consumerSecret) {
    throw new Error('Missing WooCommerce API credentials');
  }

  const url = `https://tapbookme.com/wp-json/wc/v3/orders/${orderId}`;
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    'base64',
  );

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${auth}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`WooCommerce API error: ${res.status}`);
  }

  const data = await res.json();

  return { status: data.status, orderKey: data.order_key };
}

export default async function TrackOrderPage({
  searchParams,
}: TrackOrderPageProps) {
  const { id: orderId, key: orderKey } = await searchParams;

  if (!orderId) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center text-[#6B5B4F]">
        Ingen ordre angivet.
      </div>
    );
  }

  const order = await getOrderStatus(orderId);

  if (!order) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center text-[#6B5B4F]">
        Ordren blev ikke fundet.
      </div>
    );
  }

  if (orderKey && order.orderKey && orderKey !== order.orderKey) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center text-[#6B5B4F]">
        Ordren blev ikke fundet.
      </div>
    );
  }

  const status = order.status;

  if (status === 'cancelled') {
    return (
      <StatusCard
        icon={<XCircle className="h-6 w-6 text-red-600" />}
        title="Ordren er annulleret"
        description="Denne ordre er blevet annulleret."
      />
    );
  }

  if (status === 'refunded') {
    return (
      <StatusCard
        icon={<RotateCcw className="h-6 w-6 text-amber-600" />}
        title="Ordren er refunderet"
        description="Betalingen er blevet refunderet."
      />
    );
  }

  if (status === 'failed') {
    return (
      <StatusCard
        icon={<AlertCircle className="h-6 w-6 text-red-600" />}
        title="Betaling mislykkedes"
        description="Betalingen kunne ikke gennemføres."
      />
    );
  }

  const currentIndex = getCurrentIndex(status);
  const progressPercent =
    STEP_COUNT > 1 ? (currentIndex / (STEP_COUNT - 1)) * 100 : 0;

  return (
    <div className="my-6 rounded-[28px] border border-[#E9DDD4] bg-white p-6 shadow-[0_1px_2px_rgba(57,42,34,0.04)] md:my-10 md:p-8">
      <h3 className="mb-10 font-serif text-xl text-[#392A22]">Ordrestatus</h3>
      <div className="relative hidden md:block">
        <div
          className="absolute top-6 h-[2px] -translate-y-1/2 bg-[#E9DDD4]"
          style={{ left: `${EDGE_INSET}%`, right: `${EDGE_INSET}%` }}
        />
        <div
          className="absolute top-6 h-[2px] -translate-y-1/2 bg-[#392A22] transition-[width] duration-700 ease-out"
          style={{
            left: `${EDGE_INSET}%`,
            width: `calc((100% - ${EDGE_INSET * 2}%) * ${progressPercent / 100})`,
          }}
        />

        <div className="relative grid grid-cols-4">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isDone = index < currentIndex;
            const isCurrent = index === currentIndex;

            return (
              <div key={step.key} className="flex flex-col items-center">
                <div className="relative flex h-12 w-12 items-center justify-center">
                  {isCurrent && (
                    <span className="absolute inset-0 animate-pulse rounded-full bg-[#392A22]/10" />
                  )}
                  <div
                    className={`relative flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
                      isDone || isCurrent
                        ? 'bg-[#392A22] text-white'
                        : 'border-2 border-[#E9DDD4] bg-white text-[#A69A8C]'
                    } ${isCurrent ? 'ring-4 ring-[#392A22]/10' : ''}`}
                  >
                    {isDone ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                </div>

                <p
                  className={`mt-4 max-w-[7.5rem] text-center text-sm font-medium leading-snug ${
                    isDone || isCurrent ? 'text-[#392A22]' : 'text-[#A69A8C]'
                  }`}
                >
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="space-y-0 md:hidden">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const isDone = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isLast = index === STEP_COUNT - 1;

          return (
            <div key={step.key} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
                  {isCurrent && (
                    <span className="absolute inset-0 animate-pulse rounded-full bg-[#392A22]/10" />
                  )}
                  <div
                    className={`relative flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
                      isDone || isCurrent
                        ? 'bg-[#392A22] text-white'
                        : 'border-2 border-[#E9DDD4] bg-white text-[#A69A8C]'
                    } ${isCurrent ? 'ring-4 ring-[#392A22]/10' : ''}`}
                  >
                    {isDone ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                </div>

                {!isLast && (
                  <div
                    className={`w-[2px] flex-1 min-h-[2.5rem] ${
                      index < currentIndex ? 'bg-[#392A22]' : 'bg-[#E9DDD4]'
                    }`}
                  />
                )}
              </div>

              <div className="pb-8 pt-3 last:pb-0">
                <p
                  className={`font-medium ${
                    isDone || isCurrent ? 'text-[#392A22]' : 'text-[#A69A8C]'
                  }`}
                >
                  {step.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatusCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="my-6 rounded-[28px] border border-[#E9DDD4] bg-white p-6 shadow-[0_1px_2px_rgba(57,42,34,0.04)] md:my-10">
      <div className="flex items-center gap-3">
        {icon}
        <h3 className="text-lg font-semibold text-[#392A22]">{title}</h3>
      </div>

      <p className="mt-3 text-sm text-[#6B5B4F]">{description}</p>
    </div>
  );
}

function getCurrentIndex(status: string) {
  switch (status) {
    case 'pending':
      return 0;

    case 'on-hold':
      return 1;

    case 'processing':
      return 2;

    case 'completed':
      return 3;

    default:
      return 0;
  }
}
