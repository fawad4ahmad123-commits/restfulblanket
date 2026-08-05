import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import WithdrawForm from '@/src/components/withdrawal';
import { AlertTriangle } from 'lucide-react';

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
              Ugyldigt Fortrydelseslink
            </h1>
            <p className="text-[#35281E]/70">
              Fortrydelsesanmodningen mangler påkrævede oplysninger.
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
              Ugyldigt Fortrydelseslink
            </h1>
            <p className="text-[#35281E]/70">Ordren kunne ikke bekræftes.</p>
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
              Anmodning om Ordrefortrydelse
            </CardTitle>

            <div className="mt-4 flex justify-center">
              <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium capitalize text-green-700">
                {order.status}
              </span>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 p-6">
            <WithdrawForm
              orderId={String(order.id)}
              orderKey={order.order_key}
              orderNumber={order.number || order.id}
              orderDate={new Date(order.date_created).toLocaleDateString(
                'da-DK',
                {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                },
              )}
              orderStatus={order.status}
              currency={order.currency_symbol || order.currency}
              products={(order.line_items || []).map((item: any) => ({
                id: item.id,
                productId: item.product_id,
                name: item.name,
                quantity: item.quantity,
                total: item.total,
                sku: item.sku,
              }))}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
