export interface ShippingAddress {
  name: string;
  address: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  zip: string;
  saveForFuture: boolean;
}

export interface OrderSummaryItem {
  id: string | number;
  name: string;
  size?: string;
  weight?: string;
  price: number;
  image?: string;
  color?: string;
}

export interface OrderSummary {
  items: OrderSummaryItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface PaymentDetails {
  paymentMethod: string;
  cardHolder: string;
  cardNumber: string;
  expiryDate: string;
  securityCode: string;
  sameAsShipping: boolean;
}
