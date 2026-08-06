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

  const getAttributeValue = (name: string) =>
    safeProduct?.attributes
      ?.find(
        (attr: any) =>
          attr.name?.toLowerCase() === name.toLowerCase() ||
          attr.slug?.toLowerCase() === name.toLowerCase(),
      )
      ?.options?.join(', ');

  const temperature = getMetaValue('_cura_temperature');

  const certificateMeta = getMetaValue('_cura_certificate_items');

  const certificates = Array.isArray(certificateMeta)
    ? certificateMeta
    : typeof certificateMeta === 'string'
      ? JSON.parse(certificateMeta || '[]')
      : [];

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
          answer: item.answer || '',
        }));
      }
    } catch {
      faqItems = [];
    }
  }

  const properties = getMetaValue('_cura_properties');
  const description = safeProduct?.description || '';

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
      const body = match[2];

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
      body: description,
    },
    ...(faqItems.length > 0
      ? faqItems.map((item: any, index: number) => ({
          id: `faq-${index + 1}`,
          title: item.question || `Spørgsmål ${index + 1}`,
          body: item.answer || '',
        }))
      : extractedFaqs.length > 0
        ? extractedFaqs
        : []),
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
        value: currentSize?.value || getAttributeValue('size') || '-',
      },
      {
        id: 'outer-material',
        label: 'Ydermateriale',
        value: getAttributeValue('material') || '-',
      },
      {
        id: 'inner-filling',
        label: 'Fyld',
        value: getAttributeValue('fyld') || properties || '-',
      },
      {
        id: 'wash',
        label: 'Vask',
        value: getAttributeValue('vask') || '-',
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
        active: temperature === 'medium',
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
