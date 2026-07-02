export interface OrderItem {
  id: string;
  name: string;
  size: string;
  weight: string;
  price: number;
}

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

export interface OrderSummary {
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface PaymentData {
  paymentMethod: string;
  cardHolder: string;
  cardNumber: string;
  expiryDate: string;
  securityCode: string;
  sameAsShipping: boolean;
}
