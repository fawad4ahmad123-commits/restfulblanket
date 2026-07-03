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
    heading: 'PRODUKT',
    headingItalic: 'INFORMATION',
    faqs:
      faqs.length > 0
        ? faqs
        : [
            {
              id: 'product-info',
              title: safeProduct?.name || 'Produktinformation',
              body: description || 'Ingen produktinformation tilgængelig.',
            },
          ],

    detailsTitle: 'DETALJER',

    details: [
      {
        id: 'size',
        label: 'Størrelse',
        value:
          safeProduct?.dimensions?.width && safeProduct?.dimensions?.length
            ? `${safeProduct.dimensions.width} × ${safeProduct.dimensions.length} cm`
            : '-',
      },

      {
        id: 'outer-material',
        label: 'Ydermateriale',
        value: '100% bomuld',
      },

      {
        id: 'inner-filling',
        label: 'Fyld',
        value: 'Glasperler, polyvat',
      },

      {
        id: 'wash',
        label: 'Vask',
        value: 'Maskinvask 60°C',
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
          safeProduct?.stock_status === 'instock'
            ? 'På lager'
            : 'Ikke på lager',
      },
    ],

    attributesTitle: 'EGENSKABER',

    temperatureLabel: 'Temperatur',

    temperatureOptions: [
      {
        id: 'cool',
        label: 'Kølig',
        icon: 'cool',
        active: false,
      },
      {
        id: 'medium',
        label: 'Mellem',
        icon: 'medium',
        active: true,
      },
      {
        id: 'warm',
        label: 'Varm',
        icon: 'warm',
        active: false,
      },
    ],
  };
};
