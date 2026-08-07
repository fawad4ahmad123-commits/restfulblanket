import { pushToDataLayer } from './gtm';

export const trackViewItem = (itemId: number, itemName: string) => {
  pushToDataLayer({
    event: 'view_item',
    ecommerce: {
      item_id: itemId,
      item_name: itemName,
    },
  });
};

export const trackAddToCart = (
  itemId: number,
  itemName: string,
  quantity: number,
) => {
  pushToDataLayer({
    event: 'add_to_cart',
    ecommerce: {
      item_id: itemId,
      item_name: itemName,
      quantity,
    },
  });
};
