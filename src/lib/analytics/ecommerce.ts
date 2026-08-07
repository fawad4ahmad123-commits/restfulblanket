import { trackEvent } from './gtag';

export interface AnalyticsProduct {
  item_id: string;
  item_name: string;
  price: number;
  quantity?: number;
  item_variant?: string;
  item_category?: string;
  item_list_name?: string;

  weight?: string;
  size?: string;
}

export function trackSelectItem(product: AnalyticsProduct) {
  trackEvent('select_item', {
    items: [
      {
        ...product,
        quantity: 1,
      },
    ],
  });
}

export function trackFilterUsage(filterType: string, filterValue: string) {
  trackEvent('filter_products', {
    filter_type: filterType,
    filter_value: filterValue,
  });
}

export function trackViewItem(product: AnalyticsProduct) {
  trackEvent('view_item', {
    currency: 'EUR',
    value: product.price,

    items: [
      {
        ...product,
        quantity: 1,
      },
    ],
  });
}

export function trackViewItemList(
  products: AnalyticsProduct[],
  listName: string,
) {
  trackEvent('view_item_list', {
    item_list_name: listName,

    items: products.map((product) => ({
      ...product,
      item_list_name: listName,
    })),
  });
}

export function trackAddToCart(product: AnalyticsProduct, quantity = 1) {
  trackEvent('add_to_cart', {
    currency: 'EUR',

    value: product.price * quantity,

    items: [
      {
        ...product,
        quantity,
      },
    ],
  });
}

export function trackRemoveFromCart(product: AnalyticsProduct, quantity = 1) {
  trackEvent('remove_from_cart', {
    currency: 'EUR',

    value: product.price * quantity,

    items: [
      {
        ...product,
        quantity,
      },
    ],
  });
}

export function trackBeginCheckout(
  products: AnalyticsProduct[],
  value: number,
) {
  trackEvent('begin_checkout', {
    currency: 'EUR',
    value,

    items: products,
  });
}

export function trackAddShippingInfo(
  products: AnalyticsProduct[],
  value: number,
  shippingTier?: string,
) {
  trackEvent('add_shipping_info', {
    currency: 'EUR',
    value,
    shipping_tier: shippingTier,

    items: products,
  });
}

export function trackAddPaymentInfo(
  products: AnalyticsProduct[],
  value: number,
  paymentType?: string,
) {
  trackEvent('add_payment_info', {
    currency: 'EUR',
    value,
    payment_type: paymentType,

    items: products,
  });
}

export function trackPurchase({
  transactionId,
  value,
  tax,
  shipping,
  products,
}: {
  transactionId: string;
  value: number;
  tax?: number;
  shipping?: number;
  products: AnalyticsProduct[];
}) {
  trackEvent('purchase', {
    transaction_id: transactionId,

    currency: 'DKK',

    value,

    tax,

    shipping,

    items: products,
  });
}

export function trackSearch(searchTerm: string) {
  trackEvent('search', {
    search_term: searchTerm,
  });
}

export function trackSort(sortType: string) {
  trackEvent('sort_products', {
    sort_type: sortType,
  });
}

export function trackPagination(page: number) {
  trackEvent('pagination_click', {
    page_number: page,
  });
}

export function trackSignUp(method = 'email') {
  trackEvent('sign_up', {
    method,
  });
}

export function trackRegistrationStart() {
  trackEvent('registration_start');
}

export function trackLogin(method = 'email') {
  trackEvent('login', {
    method,
  });
}

export function trackLoginStart() {
  trackEvent('login_start');
}
