import getColorHex from "./color-hexa";

export const formatProduct = (product: any) => {
  const getMetaValue = (key: string) =>
    product.meta_data?.find((item: any) => item.key === key)?.value;

  const getAttributeOptions = (...names: string[]): string[] => {
    const attribute = product.attributes?.find((attr: any) =>
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
        typeof option === "string" && option.trim().length > 0,
    );
  };

  const getAttributeValue = (...names: string[]): string => {
    const attribute = product.attributes?.find((attr: any) =>
      names.some((name) => {
        const searchName = name.toLowerCase();

        return (
          attr?.name?.toLowerCase() === searchName ||
          attr?.slug?.toLowerCase() === `pa_${searchName}` ||
          attr?.slug?.toLowerCase() === searchName
        );
      }),
    );

    return attribute?.options?.[0] || "";
  };

  const extractSection = (
    text: string,
    start: string,
    end?: string,
  ): string => {
    if (!text) return "";

    const startIndex = text.indexOf(start);

    if (startIndex === -1) return "";

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

  const COLOR_MAP: Record<string, string> = {
    SalvieAften: "#A8B5A2",
    AftenAske: "#6B6B6B",
    Skovnat: "#1F3A2E",
    MidnatsRo: "#2C3E50",
    StrandRo: "#D8C3A5",
    Morgensky: "#D6DCE5",
    LavendelgråRo: "#B7AEC8",
    HonningRo: "#D4A24C",
    Nattestilhed: "#1A1A1A",
  };

  const infoText = getAttributeValue("Info");

  const productInformation = {
    heading: "PRODUCT",
    headingItalic: "INFORMATION",

    faqs: [
      {
        id: "materialer",
        title: "Materialer",
        body: extractSection(infoText, "Materialer", "Størrelse og tyngde"),
      },
      {
        id: "stoerrelse",
        title: "Størrelse og tyngde",
        body: extractSection(
          infoText,
          "Størrelse og tyngde",
          "Målgruppe og brug",
        ),
      },
      {
        id: "maalgruppe",
        title: "Målgruppe og brug",
        body: extractSection(infoText, "Målgruppe og brug", "Produktion"),
      },
      {
        id: "produktion",
        title: "Produktion",
        body: extractSection(infoText, "Produktion", "Vask, tørring og pleje"),
      },
      {
        id: "vask",
        title: "Vask, tørring og pleje",
        body: extractSection(infoText, "Vask, tørring og pleje", "Sikkerhed"),
      },
      {
        id: "sikkerhed",
        title: "Sikkerhed",
        body: extractSection(infoText, "Sikkerhed"),
      },
    ].filter((faq) => faq.body),

    detailsTitle: "DETAILS",

    details: [
      {
        id: "size",
        label: "Size",
        value:
          product.dimensions?.width && product.dimensions?.length
            ? `${product.dimensions.width} × ${product.dimensions.length} cm`
            : "-",
      },
      {
        id: "height",
        label: "Height",
        value: product.dimensions?.height
          ? `${product.dimensions.height} cm`
          : "-",
      },
      {
        id: "weight",
        label: "Weight",
        value: product.weight ? `${Number(product.weight) * 1000} g` : "-",
      },
      {
        id: "sku",
        label: "SKU",
        value: product.sku || "-",
      },
      {
        id: "product-id",
        label: "Product ID",
        value: String(product.id || "-"),
      },
    ],

    attributesTitle: "ATTRIBUTES",

    temperatureLabel: "Temperature",

    temperatureOptions: [
      {
        id: "cool",
        label: "Cool",
        icon: "cool",
        active: false,
      },
      {
        id: "medium",
        label: "Medium",
        icon: "medium",
        active: true,
      },
      {
        id: "warm",
        label: "Warm",
        icon: "warm",
        active: false,
      },
    ],
  };

  return {
    id: String(product.id || ""),
    name: product.name || "",
    slug: product.slug || "",

    breadcrumbs: product.categories?.map((cat: any) => cat.name) || [],

    badge: getMetaValue("badge") || "",

    rating: Number(product.average_rating || 0),
    reviewCount: Number(product.rating_count || 0),

    price: Number(product.price || 0),
    compareAtPrice: Number(product.regular_price || 0),
    currency: "kr",

    stockQuantity: product.stock_quantity,
    stockStatus: product.stock_status || "outofstock",
    manageStock: product.manage_stock || false,

    productWeight: product.weight || "",

    dimensions: {
      length: product.dimensions?.length || "",
      width: product.dimensions?.width || "",
      height: product.dimensions?.height || "",
    },

    features:
      getMetaValue("features")?.map((item: string, index: number) => ({
        id: `f${index + 1}`,
        text: item,
      })) || [],

    colors: getAttributeOptions("Color", "Farve", "Colour", "Farver").map(
      (color: string, index: number) => ({
        id: `${index + 1}`,
        label: color.trim(),
        value: color.trim().toLowerCase(),
        hex: getColorHex(color),
      }),
    ),

    weights: getAttributeOptions("Weight", "Vægt").map(
      (weight: string, index: number) => ({
        id: `${index + 1}`,
        label: weight,
        inStock: true,
      }),
    ),

    sizes: getAttributeOptions("Size", "Størrelse").map(
      (size: string, index: number) => ({
        id: `${index + 1}`,
        label: size,
        inStock: true,
      }),
    ),

    heights: getAttributeOptions("Height", "Højde").map(
      (height: string, index: number) => ({
        id: `${index + 1}`,
        label: height,
      }),
    ),

    materials: getAttributeOptions("Material", "Materiale").map(
      (material: string, index: number) => ({
        id: `${index + 1}`,
        label: material,
      }),
    ),

    images:
      product.images
        ?.filter((img: any) => img?.src)
        .map((img: any) => img.src) || [],

    shortDescription: product.short_description || "",
    description: product.description || "",

    sku: product.sku || "",
    type: product.type || "",
    permalink: product.permalink || "",

    categories:
      product.categories?.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
      })) || [],

    tags:
      product.tags?.map((tag: any) => ({
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
      })) || [],

    infoSections:
      getMetaValue("infoSections")?.map((section: any, index: number) => ({
        id: section.id || `section-${index}`,
        title: section.title,
        body: section.body,
      })) || [],

    productInformation,
  };
};
