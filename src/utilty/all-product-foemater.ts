export function formatProducts(products: any[] | null | undefined) {
  return (products ?? [])
    .filter(
      (product) =>
        product.status === 'publish' &&
        product.name &&
        !product.name.toLowerCase().includes('import placeholder'),
    )
    .map((product) => {
      const colorAttribute = product.attributes?.find(
        (attr: any) => attr.name?.toLowerCase() === 'color',
      );

      const sizeAttribute = product.attributes?.find(
        (attr: any) => attr.name?.toLowerCase() === 'size',
      );

      const weightAttribute = product.attributes?.find(
        (attr: any) => attr.name?.toLowerCase() === 'weight',
      );

      const attributeLinks = Array.isArray(product.attribute_links)
        ? product.attribute_links
        : [];

      const linkedColors = attributeLinks
        .filter((item: any) => item.name?.toLowerCase() === 'color')
        .map((item: any) => item.value);

      const linkedSizes = attributeLinks
        .filter((item: any) => item.name?.toLowerCase() === 'size')
        .map((item: any) => item.value);

      const linkedWeights = attributeLinks
        .filter((item: any) => item.name?.toLowerCase() === 'weight')
        .map((item: any) => item.value);

      const offerBadge = product.meta_data?.find(
        (item: any) => item.key === '_cura_offer_badge',
      )?.value;

      return {
        id: String(product.id),

        slug: product.slug,

        name: product.name,

        categories:
          product.categories?.map((category: any) =>
            category.name.toLowerCase().trim(),
          ) || [],

        color: colorAttribute?.options?.[0] || linkedColors[0] || '',

        colors:
          linkedColors.length > 0
            ? linkedColors
            : colorAttribute?.options || [],

        image: product.images?.[0]?.src || '/product/placeholder.png',

        weight: weightAttribute?.options?.[0]
          ? `${weightAttribute.options[0].replace('kg', '')} kg`
          : linkedWeights[0] || '',

        weights:
          linkedWeights.length > 0
            ? linkedWeights
            : weightAttribute?.options?.map(
                (weight: string) => `${weight.replace('kg', '')} kg`,
              ) || [],

        dimensions: sizeAttribute?.options?.[0] || linkedSizes[0] || '',

        sizes:
          linkedSizes.length > 0 ? linkedSizes : sizeAttribute?.options || [],

        price: Number(product.price || 0),

        originalPrice: Number(product.regular_price || product.price || 0),

        currency: 'kr',

        rating: Number(product.average_rating || 0),

        reviewCount: Number(product.rating_count || 0),

        isBestSeller: Number(product.total_sales || 0) > 50,

        isNewArrival:
          new Date(product.date_created).getTime() >
          Date.now() - 30 * 24 * 60 * 60 * 1000,

        isOnDiscount: product.on_sale,

        discountPercentage: offerBadge
          ? Number(String(offerBadge).replace('%', ''))
          : product.regular_price
            ? Math.round(
                ((Number(product.regular_price) - Number(product.price)) /
                  Number(product.regular_price)) *
                  100,
              )
            : 0,

        stockQuantity: product.stock_quantity ?? null,

        stockStatus: product.stock_status ?? 'outofstock',

        attributeLinks,
      };
    });
}
