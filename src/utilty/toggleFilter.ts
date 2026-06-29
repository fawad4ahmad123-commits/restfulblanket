export function toggleFilter(list: string[], value: string) {
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value];
}
