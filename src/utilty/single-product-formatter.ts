import getColorHex from '../helper/color-hexa';
import ExtractFeaturesFromShortDescription from '../helper/product-feature';

const stripHtml = (html: string) => {
  if (!html) return '';
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/\n\s*\n/g, '\n')
    .trim();
};

const safeJsonParse = (value: any) => {
  if (!value) return null;
  try {
    return typeof value === 'string' ? JSON.parse(value) : value;
  } catch {
    return null;
  }
};

export const formatProduct = (product: any) => {
  if (!product) {
    return null;
  }

  const asArray = <T>(value: T): T extends any[] ? T : never[] =>
    (Array.isArray(value) ? value : []) as any;

  const meta = asArray(product.meta_data);
  const attributes = asArray(product.attributes);
  const categories = asArray(product.categories);
  const tags = asArray(product.tags);
  const images = asArray(product.images);
  const variationData = asArray(product.variationData);

  const getMetaValue = (key: string) =>
    meta.find((item: any) => item.key === key)?.value;

  const getAttributeOptions = (...names: string[]): string[] => {
    const attribute = attributes.find((attr: any) =>
      names.some((name) => {
        const searchName = name.toLowerCase();
        return (
          attr?.name?.toLowerCase() === searchName ||
          attr?.slug?.toLowerCase() === `pa_${searchName}` ||
          attr?.slug?.toLowerCase() === searchName
        );
      }),
    );
    return (attribute?.options || []).filter(
      (option: any): option is string =>
        typeof option === 'string' && option.trim().length > 0,
    );
  };

  const getAttributeValue = (...names: string[]): string => {
    const attribute = attributes.find((attr: any) =>
      names.some((name) => {
        const searchName = name.toLowerCase();
        return (
          attr?.name?.toLowerCase() === searchName ||
          attr?.slug?.toLowerCase() === `pa_${searchName}` ||
          attr?.slug?.toLowerCase() === searchName
        );
      }),
    );
    return attribute?.options?.[0] || '';
  };

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

  const attributeLinksRaw = Array.isArray(product.attribute_links)
    ? product.attribute_links
    : [];

  const getAttributeLinks = (name: string) =>
    attributeLinksRaw.filter(
      (item: any) => item?.name?.toLowerCase() === name.toLowerCase(),
    );

  const infoText = getAttributeValue('Info');

  const metaOfferBadge = getMetaValue('_cura_offer_badge') || '';
  const metaOfferText = getMetaValue('_cura_offer_text') || '';
  const metaPromoText = getMetaValue('_cura_promo_text') || '';
  const metaPromoColor = getMetaValue('_cura_promo_color') || '#e5cfba';
  const metaTemperature = getMetaValue('_cura_temperature') || '';
  const metaThemeColor = getMetaValue('_cura_theme_color') || '#143f62';
  const metaProperties = getMetaValue('_cura_properties') || '';

  let certificateImages: string[] = [];
  const metaCertImages = getMetaValue('_cura_certificate_images');
  if (metaCertImages) {
    const parsed = safeJsonParse(metaCertImages);
    if (Array.isArray(parsed)) {
      certificateImages = parsed;
    }
  }

  const metaCertificateImage = getMetaValue('_cura_certificate_image') || '';

  let faqItems: any[] = [];
  const metaFaqItems = getMetaValue('_cura_faq_items');
  if (metaFaqItems) {
    const parsed = safeJsonParse(metaFaqItems);
    if (Array.isArray(parsed)) {
      faqItems = parsed.map((item: any) => ({
        ...item,
        question: stripHtml(item.question || ''),
        answer: stripHtml(item.answer || ''),
      }));
    }
  }

  const productInformation = {
    heading: 'PRODUCT',
    headingItalic: 'INFORMATION',
    faqs:
      faqItems.length > 0
        ? faqItems.map((item: any, index: number) => ({
            id: `faq-${index + 1}`,
            title: item.question || `Spørgsmål ${index + 1}`,
            body: item.answer || '',
          }))
        : [
            {
              id: 'materialer',
              title: 'Materialer',
              body: extractSection(
                infoText,
                'Materialer',
                'Størrelse og tyngde',
              ),
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
              body: extractSection(
                infoText,
                'Produktion',
                'Vask, tørring og pleje',
              ),
            },
            {
              id: 'vask',
              title: 'Vask, tørring og pleje',
              body: extractSection(
                infoText,
                'Vask, tørring og pleje',
                'Sikkerhed',
              ),
            },
            {
              id: 'sikkerhed',
              title: 'Sikkerhed',
              body: extractSection(infoText, 'Sikkerhed'),
            },
          ].filter((faq) => faq.body),
    detailsTitle: 'DETAILS',
    details: [
      {
        id: 'size',
        label: 'Size',
        value:
          product.dimensions?.width && product.dimensions?.length
            ? `${product.dimensions.width} × ${product.dimensions.length} cm`
            : '-',
      },
      {
        id: 'height',
        label: 'Height',
        value: product.dimensions?.height
          ? `${product.dimensions.height} cm`
          : '-',
      },
      {
        id: 'weight',
        label: 'Weight',
        value: product.weight ? `${Number(product.weight) * 1000} g` : '-',
      },
      {
        id: 'sku',
        label: 'SKU',
        value: product.sku || '-',
      },
      {
        id: 'product-id',
        label: 'Product ID',
        value: String(product.id || '-'),
      },
    ],
    attributesTitle: 'ATTRIBUTES',
    temperatureLabel: 'Temperature',
    temperatureOptions: [
      {
        id: 'cool',
        label: 'Cool',
        icon: 'cool',
        active: metaTemperature === 'cool',
      },
      {
        id: 'medium',
        label: 'Medium',
        icon: 'medium',
        active: metaTemperature === 'medium' || !metaTemperature,
      },
      {
        id: 'warm',
        label: 'Warm',
        icon: 'warm',
        active: metaTemperature === 'warm',
      },
    ],
    certificates:
      certificateImages.length > 0
        ? certificateImages
        : metaCertificateImage
          ? [metaCertificateImage]
          : [],
  };

  return {
    id: String(product.id || ''),
    name: product.name || '',
    slug: product.slug || '',
    breadcrumbs: categories.map((cat: any) => cat.name),
    badge: getMetaValue('badge') || '',
    rating: Number(product.average_rating || 0),
    reviewCount: Number(product.rating_count || 0),
    price: Number(product.price || 0),
    compareAtPrice: Number(product.regular_price || 0),
    currency: 'kr',
    stockQuantity: product.stock_quantity,
    stockStatus: product.stock_status || 'outofstock',
    manageStock: product.manage_stock || false,
    productWeight: product.weight || '',
    dimensions: {
      length: product.dimensions?.length || '',
      width: product.dimensions?.width || '',
      height: product.dimensions?.height || '',
    },
    features:
      getMetaValue('features')?.length > 0
        ? getMetaValue('features').map((item: string, index: number) => ({
            id: `f${index + 1}`,
            text: item,
          }))
        : ExtractFeaturesFromShortDescription(product.short_description || ''),
    colors: getAttributeLinks('color').map((item: any, index: number) => ({
      id: `${index + 1}`,
      label: item.value,
      value: item.value.toLowerCase(),
      hex: getColorHex(item.value),
      relatedProduct: Number(item.related_product || 0),
    })),
    sizes: getAttributeLinks('size').map((item: any, index: number) => ({
      id: `${index + 1}`,
      label: item.value,
      inStock: true,
      relatedProduct: Number(item.related_product || 0),
    })),
    weights: getAttributeLinks('weight').map((item: any, index: number) => ({
      id: `${index + 1}`,
      label: item.value,
      inStock: true,
      relatedProduct: Number(item.related_product || 0),
    })),
    heights: getAttributeOptions('Height', 'Højde').map(
      (height: string, index: number) => ({
        id: `${index + 1}`,
        label: height,
      }),
    ),
    materials: getAttributeOptions('Material', 'Materiale').map(
      (material: string, index: number) => ({
        id: `${index + 1}`,
        label: material,
      }),
    ),
    images: images.filter((img: any) => img?.src).map((img: any) => img.src),
    shortDescription: product.short_description || '',
    description: product.description || '',
    sku: product.sku || '',
    type: product.type || '',
    permalink: product.permalink || '',
    categories: categories.map((cat: any) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
    })),
    tags: tags.map((tag: any) => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
    })),
    infoSections:
      getMetaValue('infoSections')?.map((section: any, index: number) => ({
        id: section.id || `section-${index}`,
        title: section.title,
        body: section.body,
      })) || [],
    variations: variationData.map((variation: any) => ({
      id: variation.id,
      price: Number(variation.price || 0),
      regularPrice: Number(variation.regular_price || 0),
      stockStatus: variation.stock_status,
      stockQuantity: variation.stock_quantity,
      image: variation.image?.src || '',
      description: variation.description || '',
      attributes: asArray(variation.attributes).map((attr: any) => ({
        name: attr.name,
        option: attr.option,
      })),
    })),
    attributeLinks: attributeLinksRaw.map((item: any, index: number) => ({
      id: `${index + 1}`,
      name: item?.name || '',
      value: item?.value || '',
      relatedProduct: Number(item?.related_product || 0),
    })),
    productInformation,
    metaFields: {
      offerBadge: metaOfferBadge,
      offerText: metaOfferText,
      promoText: metaPromoText,
      promoColor: metaPromoColor,
      temperature: metaTemperature,
      themeColor: metaThemeColor,
      properties: metaProperties,
      certificateImages: certificateImages,
      certificateImage: metaCertificateImage,
      faqItems: faqItems,
    },
  };
};
