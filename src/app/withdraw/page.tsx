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
      <div className="container mx-auto max-w-3xl px-4 py-16">
        <Card>
          <CardContent className="py-10 text-center">
            <AlertTriangle className="mx-auto mb-4 h-10 w-10 text-red-500" />
            <h1 className="mb-2 text-2xl font-semibold">
              Invalid withdrawal link
            </h1>
            <p className="text-muted-foreground">
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
      <div className="container mx-auto max-w-3xl px-4 py-16">
        <Card>
          <CardContent className="py-10 text-center">
            <AlertTriangle className="mx-auto mb-4 h-10 w-10 text-red-500" />
            <h1 className="mb-2 text-2xl font-semibold">
              Invalid withdrawal link
            </h1>
            <p className="text-muted-foreground">
              The order could not be verified.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <Card>
        <CardHeader>
          <CardTitle>Order Withdrawal Request</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="rounded-lg border p-4">
            <p>
              <strong>Order ID:</strong> {order.id}
            </p>

            <p className="mt-2">
              <strong>Customer:</strong> {order.billing?.first_name}{' '}
              {order.billing?.last_name}
            </p>

            <p className="mt-2">
              <strong>Email:</strong> {order.billing?.email}
            </p>

            <p className="mt-2">
              <strong>Status:</strong> {order.status}
            </p>

            <p className="mt-2">
              <strong>Total:</strong> {order.total} {order.currency}
            </p>
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm">
              You are requesting withdrawal from this purchase under EU consumer
              rights.
            </p>
          </div>

          <WithdrawForm orderId={String(order.id)} orderKey={order.order_key} />
        </CardContent>
      </Card>
    </div>
  );
}
