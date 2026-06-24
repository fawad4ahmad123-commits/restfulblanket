const ExtractFeaturesFromShortDescription = (
  html: string,
): { id: string; text: string }[] => {
  if (!html) return [];

  const regex = /<li[^>]*>(.*?)<\/li>/gi;
  const features: { id: string; text: string }[] = [];

  let match;
  let index = 0;

  while ((match = regex.exec(html)) !== null) {
    features.push({
      id: `f${++index}`,
      text: match[1]
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .trim(),
    });
  }

  return features;
};

export default ExtractFeaturesFromShortDescription;
