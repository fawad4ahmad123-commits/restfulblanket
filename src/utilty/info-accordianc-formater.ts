export const formatProductInformation = (product: any) => {
  const infoText =
    product.attributes?.find(
      (attr: any) =>
        attr?.name?.toLowerCase() === "info" ||
        attr?.slug?.toLowerCase() === "info",
    )?.options?.[0] || "";

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

  const faqs = [
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
  ].filter((item) => item.body);

  return {
    heading: "PRODUCT",
    headingItalic: "INFORMATION",

    faqs:
      faqs.length > 0
        ? faqs
        : [
            {
              id: "product-info",
              title: product.name,
              body: infoText || product.description || "",
            },
          ],

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

      {
        id: "stock",
        label: "Stock",
        value: product.stock_status === "instock" ? "In Stock" : "Out of Stock",
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
};
