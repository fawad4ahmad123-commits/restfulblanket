export const formatProductInformation = (product: any) => {
  const safeProduct = product || {};

  const description = safeProduct?.description || '';

  const stripHtml = (html: string) =>
    html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n')
      .replace(/<[^>]*>/g, '')
      .replace(/\n\s*\n/g, '\n')
      .trim();

  const matches = [
    ...description.matchAll(
      /<p>\s*<strong[^>]*>(.*?)<\/strong>\s*<\/p>\s*([\s\S]*?)(?=<p>\s*<strong|$)/gi,
    ),
  ];

  const faqs = matches
    .map((match, index) => {
      const title = stripHtml(match[1]);
      const body = stripHtml(match[2]);

      return {
        id: title?.toLowerCase()?.replace(/\s+/g, '-') || `section-${index}`,
        title,
        body,
      };
    })
    .filter((item) => item.title && item.body);

  return {
    heading: 'PRODUCT',
    headingItalic: 'INFORMATION',

    // ✅ ACCORDION DATA
    faqs:
      faqs.length > 0
        ? faqs
        : [
            {
              id: 'product-info',
              title: safeProduct?.name || 'Product Information',
              body: description || 'No product information available.',
            },
          ],

    detailsTitle: 'DETAILS',

    details: [
      {
        id: 'size',
        label: 'Size',
        value:
          safeProduct?.dimensions?.width && safeProduct?.dimensions?.length
            ? `${safeProduct.dimensions.width} × ${safeProduct.dimensions.length} cm`
            : '-',
      },

      {
        id: 'outer-material',
        label: 'Outer material',
        value: '100% cotton',
      },

      {
        id: 'inner-filling',
        label: 'Inner filling',
        value: 'Glass beads, poly wadding',
      },

      {
        id: 'wash',
        label: 'Wash',
        value: 'Machine 60°C',
      },

      {
        id: 'sku',
        label: 'SKU',
        value: safeProduct?.sku || '-',
      },

      {
        id: 'ean-gtin',
        label: 'EAN / GTIN',
        value:
          safeProduct?.stock_status === 'instock' ? 'In Stock' : 'Out of Stock',
      },
    ],

    attributesTitle: 'ATTRIBUTES',

    temperatureLabel: 'Temperature',

    temperatureOptions: [
      {
        id: 'cool',
        label: 'Cool',
        icon: 'cool',
        active: false,
      },
      {
        id: 'medium',
        label: 'Medium',
        icon: 'medium',
        active: true,
      },
      {
        id: 'warm',
        label: 'Warm',
        icon: 'warm',
        active: false,
      },
    ],
  };
};
