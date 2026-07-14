export function toggleFilter(list: string[], value: string) {
  const normalizedValue = value.toLowerCase().trim();

  return list.includes(normalizedValue)
    ? list.filter((v) => v !== normalizedValue)
    : [...list, normalizedValue];
}
