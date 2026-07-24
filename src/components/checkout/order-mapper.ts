import type { Order } from '@/src/types/order';

export function formatDate(date?: string) {
  if (!date) return '';

  return new Intl.DateTimeFormat('da-DK', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
}

export function mapApiOrderToOrder(data: any): Order {
  const cardBrand =
    data.meta_data?.find((m: any) => m.key === '_card_brand')?.value ?? '';

  const last4 =
    data.meta_data?.find((m: any) => m.key === 'last4')?.value ?? '';

  const shippingTitle =
    data.shipping_lines?.[0]?.method_title ?? 'Ingen levering valgt';

  return {
    id: data.id,

    orderNumber: `#${data.number ?? data.id}`,

    customerFirstName: data.billing?.first_name ?? 'kunde',

    confirmationEmail: data.billing?.email ?? '',

    orderDate: formatDate(data.date_created),

    estimatedDeliveryRange:
      data.shipping_lines?.[0]?.method_title
        ?.replace('Free shipping - ', '')
        ?.replace('Estimated arrival: ', '') ?? '',

    status:
      data.status === 'processing'
        ? 'processing'
        : data.status === 'completed'
          ? 'delivered'
          : 'placed',

    statusDates: {
      placed: formatDate(data.date_created),

      processing:
        data.status === 'processing' ? formatDate(data.date_modified) : '',

      shipped: '',

      delivered:
        data.status === 'completed' ? formatDate(data.date_completed) : '',
    },

    items: (data.line_items ?? []).map((item: any) => ({
      id: item.id,

      name: item.name,

      variant: item.global_unique_id ? `Variant: ${item.global_unique_id}` : '',

      price: Number(item.price ?? item.total ?? 0),

      quantity: item.quantity ?? 1,

      imageUrl: item.image?.src ?? '',
    })),

    totals: {
      subtotal: Number(data.total - data.shipping_total),

      shipping: Number(data.shipping_total ?? 0),

      tax: Number(data.total_tax ?? 0),

      totalPaid: Number(data.total ?? 0),

      currency: data.currency ?? 'DKK',
    },

    shippingAddress: {
      name: `${data.shipping?.first_name ?? ''} ${data.shipping?.last_name ?? ''}`,

      city: data.shipping?.city ?? '',

      region: data.shipping?.state ?? '',

      country: data.shipping?.country ?? '',
    },

    shippingMethod: shippingTitle,

    payment: {
      cardBrandLabel: cardBrand,

      last4: last4,
    },
  };
}
