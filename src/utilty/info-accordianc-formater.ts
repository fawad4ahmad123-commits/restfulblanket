const stripHtml = (html: string) => {
  if (!html) return '';
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/\n\s*\n/g, '\n')
    .trim();
};

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

  let faqItems: any[] = [];
  const metaFaqItems = getMetaValue('_cura_faq_items');
  if (metaFaqItems) {
    try {
      const parsed =
        typeof metaFaqItems === 'string'
          ? JSON.parse(metaFaqItems)
          : metaFaqItems;
      if (Array.isArray(parsed)) {
        faqItems = parsed.map((item: any) => ({
          ...item,
          question: stripHtml(item.question || ''),
          answer: stripHtml(item.answer || ''),
        }));
      }
    } catch {
      faqItems = [];
    }
  }

  const properties = getMetaValue('_cura_properties');
  const description = safeProduct?.description || '';
  const descriptionText = description ? stripHtml(description) : '';

  const attributeLinksRaw = Array.isArray(safeProduct.attribute_links)
    ? safeProduct.attribute_links
    : [];

  const currentSize = attributeLinksRaw.find(
    (item: any) =>
      item?.name?.toLowerCase() === 'size' && item?.related_product === 0,
  );

  const matches = [
    ...description.matchAll(
      /<p>\s*<strong[^>]*>(.*?)<\/strong>\s*<\/p>\s*([\s\S]*?)(?=<p>\s*<strong|$)/gi,
    ),
  ];

  const extractedFaqs = matches
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

  const finalFaqs = [
    {
      id: 'description',
      title: 'Beskrivelse',
      body: descriptionText,
    },
    ...(faqItems.length > 0
      ? faqItems.map((item: any, index: number) => ({
          id: `faq-${index + 1}`,
          title: item.question || `Spørgsmål ${index + 1}`,
          body: item.answer || '',
        }))
      : extractedFaqs.length > 0
        ? extractedFaqs
        : [
            {
              id: 'product-info',
              title: safeProduct?.name || 'Produktinformation',
              body: descriptionText || 'Ingen produktinformation tilgængelig.',
            },
          ]),
  ];

  return {
    heading: 'PRODUKT',
    headingItalic: 'INFORMATION',
    faqs: finalFaqs,
    detailsTitle: 'DETALJER',
    details: [
      {
        id: 'size',
        label: 'Størrelse',
        value: currentSize?.value || '-',
      },
      {
        id: 'outer-material',
        label: 'Ydermateriale',
        value:
          safeProduct?.attributes
            ?.find((attr: any) => attr.name?.toLowerCase() === 'material')
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
