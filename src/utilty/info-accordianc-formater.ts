export const formatProductInformation = (product: any) => {
  const safeProduct = product || {};

  const metaData = safeProduct?.meta_data || [];

  const getMetaValue = (key: string) =>
    metaData.find((item: any) => item.key === key)?.value;

  const temperature = getMetaValue('_cura_temperature');

  let certificates: any[] = [];

  try {
    certificates = JSON.parse(getMetaValue('_cura_certificate_images') || '[]');
  } catch {
    certificates = [];
  }

  const properties = getMetaValue('_cura_properties');

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
        value:
          safeProduct?.attributes
            ?.find((attr: any) => attr.name?.toLowerCase() === 'materials')
            ?.options?.join(', ') || '-',
      },

      {
        id: 'inner-filling',
        label: 'Fyld',
        value: properties || '-',
      },

      {
        id: 'wash',
        label: 'Vask',
        value: safeProduct?.short_description?.includes('60°C')
          ? 'Maskinvask 60°C'
          : '-',
      },

      {
        id: 'sku',
        label: 'SKU',
        value: safeProduct?.sku || '-',
      },
    ],

    attributesTitle: 'EGENSKABER',

    certificates,

    temperatureLabel: 'Temperatur',

    temperatureOptions: [
      {
        id: 'cool',
        label: 'Kølig',
        icon: 'cool',
        active: temperature === 'cool',
      },
      {
        id: 'medium',
        label: 'Mellem',
        icon: 'medium',
        active:
          temperature === 'medium' ||
          !['cool', 'medium', 'warm'].includes(temperature),
      },
      {
        id: 'warm',
        label: 'Varm',
        icon: 'warm',
        active: temperature === 'warm',
      },
    ],
  };
};
