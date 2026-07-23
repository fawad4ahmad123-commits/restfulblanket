export const parsePrice = (value: string | number | null | undefined) => {
  if (!value) return 0;

  if (typeof value === 'number') {
    return value;
  }

  const cleaned = value
    .toString()
    .replace(/\s/g, '')
    .replace('kr.', '')
    .replace('kr', '')
    .trim();

  if (cleaned.includes(',') && cleaned.includes('.')) {
    return Number(cleaned.replace(/\./g, '').replace(',', '.'));
  }

  if (cleaned.includes(',')) {
    return Number(cleaned.replace(',', '.'));
  }

  return Number(cleaned.replace(/[^\d]/g, '')) || 0;
};
