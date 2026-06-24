export const formatProductInformation = (product: any) => {
  const safeProduct = product || {};

  const infoText =
    safeProduct?.attributes?.find(
      (attr: any) =>
        attr?.name?.toLowerCase() === 'info' ||
        attr?.slug?.toLowerCase() === 'info',
    )?.options?.[0] || '';

  const extractSection = (
    text: string,
    start: string,
    end?: string,
  ): string => {
    if (!text) return '';

    const startIndex = text.indexOf(start);

    if (startIndex === -1) return '';

    const contentStart = startIndex + start.length;

    if (!end) {
      return text.substring(contentStart).trim();
    }

    const endIndex = text.indexOf(end, contentStart);

    if (endIndex === -1) {
      return text.substring(contentStart).trim();
    }

    return text.substring(contentStart, endIndex).trim();
  };

  const faqs = [
    {
      id: 'materialer',
      title: 'Materialer',
      body: extractSection(infoText, 'Materialer', 'Størrelse og tyngde'),
    },
    {
      id: 'stoerrelse',
      title: 'Størrelse og tyngde',
      body: extractSection(
        infoText,
        'Størrelse og tyngde',
        'Målgruppe og brug',
      ),
    },
    {
      id: 'maalgruppe',
      title: 'Målgruppe og brug',
      body: extractSection(infoText, 'Målgruppe og brug', 'Produktion'),
    },
    {
      id: 'produktion',
      title: 'Produktion',
      body: extractSection(infoText, 'Produktion', 'Vask, tørring og pleje'),
    },
    {
      id: 'vask',
      title: 'Vask, tørring og pleje',
      body: extractSection(infoText, 'Vask, tørring og pleje', 'Sikkerhed'),
    },
    {
      id: 'sikkerhed',
      title: 'Sikkerhed',
      body: extractSection(infoText, 'Sikkerhed'),
    },
  ].filter((item) => item.body);

  return {
    heading: 'PRODUCT',
    headingItalic: 'INFORMATION',

    faqs:
      faqs.length > 0
        ? faqs
        : [
            {
              id: 'product-info',
              title: safeProduct?.name || 'Product Information',
              body:
                infoText ||
                safeProduct?.description ||
                'No product information available.',
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
