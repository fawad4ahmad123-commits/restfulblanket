const normalizeColor = (colorName: string) => {
  return colorName.toLowerCase().trim().replace(/\s+/g, '').replace(/-/g, '');
};

const colorMap: Record<string, string> = {
  // Product custom colors
  antracitnat: '#3B3B3B',
  salvieaften: '#A8B5A2',
  aftenaske: '#6B6B6B',
  skovnat: '#1F3A2E',
  midnatsro: '#2C3E50',
  strandro: '#D8C3A5',
  morgensky: '#D6DCE5',
  lavendelgraro: '#B7AEC8',
  honningro: '#D4A24C',
  nattestilhed: '#1A1A1A',

  // Danish colors
  beige: '#DCC9A3',
  brun: '#7A5230',
  lysebrun: '#C7A27C',
  creme: '#F5F1E8',
  blacreme: '#B7C9D6',

  sort: '#111111',
  hvid: '#FFFFFF',
  gra: '#9CA3AF',

  // English colors
  black: '#111111',
  white: '#FFFFFF',
  gray: '#9CA3AF',
  grey: '#9CA3AF',

  red: '#EF4444',
  blue: '#3B82F6',
  green: '#22C55E',
  yellow: '#FACC15',
  orange: '#F97316',
  pink: '#EC4899',
  purple: '#8B5CF6',

  // Extra common product shades
  darkgreen: '#1F3A2E',
  olive: '#808000',
  sand: '#D8C3A5',
  taupe: '#8B8589',
  charcoal: '#36454F',
  anthracite: '#3B3B3B',
  silver: '#C0C0C0',
  gold: '#D4AF37',
};

const getColorHex = (colorName: string): string => {
  if (!colorName) {
    return '#CCCCCC';
  }

  const color = normalizeColor(colorName);

  // exact match
  if (colorMap[color]) {
    return colorMap[color];
  }

  // automatic matching
  if (color.includes('bla') || color.includes('blue')) {
    return '#3B82F6';
  }

  if (color.includes('gron') || color.includes('green')) {
    return '#22C55E';
  }

  if (color.includes('sort') || color.includes('black')) {
    return '#111111';
  }

  if (color.includes('hvid') || color.includes('white')) {
    return '#FFFFFF';
  }

  if (
    color.includes('gra') ||
    color.includes('gray') ||
    color.includes('grey')
  ) {
    return '#9CA3AF';
  }

  if (color.includes('brun') || color.includes('brown')) {
    return '#7A5230';
  }

  if (color.includes('creme') || color.includes('cream')) {
    return '#F5F1E8';
  }

  if (color.includes('beige')) {
    return '#DCC9A3';
  }

  return '#CCCCCC';
};

// default export
export default getColorHex;

// used in ProductSidebar
export function getProductsColorHex(color: string) {
  return getColorHex(color);
}
