const getColorHex = (colorName: string): string => {
  if (!colorName) return '#CCCCCC';

  const color = colorName.trim().toLowerCase();

  const exactColors: Record<string, string> = {
    beige: '#DCC9A3',
    brun: '#7A5230',
    lysebrun: '#C7A27C',
    creme: '#F5F1E8',
    'blå creme': '#B7C9D6',

    salvieaften: '#A8B5A2',
    aftenaske: '#6B6B6B',
    skovnat: '#1F3A2E',
    midnatsro: '#2C3E50',
    strandro: '#D8C3A5',
    morgensky: '#D6DCE5',
    lavendelgråro: '#B7AEC8',
    honningro: '#D4A24C',
    nattestilhed: '#1A1A1A',
  };

  if (exactColors[color]) {
    return exactColors[color];
  }

  if (
    color.includes('blå') ||
    color.includes('blue') ||
    color.includes('navy')
  ) {
    return '#3B82F6';
  }

  if (
    color.includes('grøn') ||
    color.includes('green') ||
    color.includes('olive')
  ) {
    return '#22C55E';
  }

  if (color.includes('rød') || color.includes('red')) {
    return '#EF4444';
  }

  if (color.includes('gul') || color.includes('yellow')) {
    return '#FACC15';
  }

  if (color.includes('orange')) {
    return '#F97316';
  }

  if (color.includes('pink')) {
    return '#EC4899';
  }

  if (color.includes('purple') || color.includes('lilla')) {
    return '#8B5CF6';
  }

  if (color.includes('sort') || color.includes('black')) {
    return '#111111';
  }

  if (color.includes('hvid') || color.includes('white')) {
    return '#FFFFFF';
  }

  if (
    color.includes('grå') ||
    color.includes('gray') ||
    color.includes('grey')
  ) {
    return '#9CA3AF';
  }

  if (color.includes('brun') || color.includes('brown')) {
    return '#7A5230';
  }

  if (color.includes('beige')) {
    return '#DCC9A3';
  }

  if (color.includes('creme') || color.includes('cream')) {
    return '#F5F1E8';
  }

  return '#CCCCCC';
};
export default getColorHex;

export function getProductsColorHex(color: string) {
  if (!color) return '#D9D9D9';

  const value = color.trim();

  if (/^#([0-9A-F]{3}){1,2}$/i.test(value)) {
    return value;
  }

  const colorMap: Record<string, string> = {
    red: '#FF0000',
    blue: '#0000FF',
    green: '#008000',
    yellow: '#FFFF00',
    orange: '#FFA500',
    purple: '#800080',
    pink: '#FFC0CB',
    black: '#000000',
    white: '#FFFFFF',
    gray: '#808080',
    grey: '#808080',
    brown: '#8B4513',
    beige: '#F5F5DC',
    cream: '#FFFDD0',
    brun: '#8B4513',
    lysebrun: '#C4A484',
    'blå creme': '#BFD7EA',
    'bla creme': '#BFD7EA',
    creme: '#FFFDD0',
  };

  return colorMap[value.toLowerCase()] || '#D9D9D9';
}
