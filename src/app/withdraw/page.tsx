import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import WithdrawForm from '@/src/components/withdrawal';
import {
  AlertTriangle,
  CreditCard,
  Mail,
  Package,
  ShieldCheck,
  User,
} from 'lucide-react';

interface WithdrawPageProps {
  searchParams: Promise<{
    ra_euwb_withdraw?: string;
    ra_euwb_order?: string;
    ra_euwb_key?: string;
  }>;
}

async function getOrder(orderId: string) {
  const auth = Buffer.from(
    `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`,
  ).toString('base64');

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wc/v3/orders/${orderId}`,
    {
      headers: {
        Authorization: `Basic ${auth}`,
      },
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export default async function WithdrawPage({
  searchParams,
}: WithdrawPageProps) {
  const params = await searchParams;

  const orderId = params.ra_euwb_order;
  const orderKey = params.ra_euwb_key;
  const withdraw = params.ra_euwb_withdraw;

  if (!orderId || !orderKey || withdraw !== '1') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FDF9F6] px-4">
        <Card className="w-full max-w-lg border-[#E9DDD4] shadow-xl">
          <CardContent className="py-12 text-center">
            <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-red-500" />
            <h1 className="mb-2 text-2xl font-semibold text-[#35281E]">
              Invalid Withdrawal Link
            </h1>
            <p className="text-[#35281E]/70">
              The withdrawal request is missing required information.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const order = await getOrder(orderId);

  if (!order || order.order_key !== orderKey) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FDF9F6] px-4">
        <Card className="w-full max-w-lg border-[#E9DDD4] shadow-xl">
          <CardContent className="py-12 text-center">
            <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-red-500" />
            <h1 className="mb-2 text-2xl font-semibold text-[#35281E]">
              Invalid Withdrawal Link
            </h1>
            <p className="text-[#35281E]/70">
              The order could not be verified.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF9F6] px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <Card className="overflow-hidden border-[#E9DDD4] shadow-xl">
          <CardHeader className="border-b border-[#E9DDD4] bg-white">
            <CardTitle className="text-center text-3xl font-bold text-[#35281E]">
              Order Withdrawal Request
            </CardTitle>

            <div className="mt-4 flex justify-center">
              <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium capitalize text-green-700">
                {order.status}
              </span>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-[#E9DDD4] bg-white p-5">
                <div className="flex items-center gap-2 text-[#35281E]">
                  <Package className="h-5 w-5" />
                  <span className="font-medium">Order ID</span>
                </div>
                <p className="mt-3 text-xl font-semibold text-[#35281E]">
                  #{order.id}
                </p>
              </div>

              <div className="rounded-2xl border border-[#E9DDD4] bg-white p-5">
                <div className="flex items-center gap-2 text-[#35281E]">
                  <User className="h-5 w-5" />
                  <span className="font-medium">Customer</span>
                </div>
                <p className="mt-3 text-xl font-semibold text-[#35281E]">
                  {order.billing?.first_name} {order.billing?.last_name}
                </p>
              </div>

              <div className="rounded-2xl border border-[#E9DDD4] bg-white p-5">
                <div className="flex items-center gap-2 text-[#35281E]">
                  <Mail className="h-5 w-5" />
                  <span className="font-medium">Email</span>
                </div>
                <p className="mt-3 break-all text-sm text-[#35281E]/80">
                  {order.billing?.email}
                </p>
              </div>

              <div className="rounded-2xl border border-[#E9DDD4] bg-white p-5">
                <div className="flex items-center gap-2 text-[#35281E]">
                  <CreditCard className="h-5 w-5" />
                  <span className="font-medium">Order Total</span>
                </div>
                <p className="mt-3 text-xl font-semibold text-[#35281E]">
                  {order.total} {order.currency}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 text-amber-600" />

                <div>
                  <h3 className="font-semibold text-amber-900">
                    EU Consumer Withdrawal Request
                  </h3>

                  <p className="mt-1 text-sm text-amber-800">
                    You are requesting withdrawal from this purchase under EU
                    consumer protection regulations. Please provide any
                    additional information below.
                  </p>
                </div>
              </div>
            </div>

            <WithdrawForm
              orderId={String(order.id)}
              orderKey={order.order_key}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
