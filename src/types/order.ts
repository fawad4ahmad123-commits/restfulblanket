export type OrderStatus = 'placed' | 'processing' | 'shipped' | 'delivered';

export interface OrderItem {
  id: string;
  name: string;
  variant: string; // e.g. "(100x140 cm), (4 kg)"
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface OrderTotals {
  subtotal: number;
  shipping: number; // 0 means "Free"
  tax: number;
  totalPaid: number;
  currency: string;
}

export interface ShippingAddress {
  name: string;
  city: string;
  region: string;
  country: string;
}

export interface PaymentInfo {
  cardBrandLabel: string; // e.g. "Visa", "Mastercard" - optional display label
  last4: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerFirstName: string;
  confirmationEmail: string;
  orderDate: string; // display-ready, e.g. "Sep 10, 2025"
  estimatedDeliveryRange: string; // e.g. "Sep 15 - 30, 2025"
  status: OrderStatus;
  statusDates: {
    placed: string;
    processing: string;
    shipped: string;
    delivered: string;
  };
  items: OrderItem[];
  totals: OrderTotals;
  shippingAddress: ShippingAddress;
  shippingMethod: string;
  payment: PaymentInfo;
}
