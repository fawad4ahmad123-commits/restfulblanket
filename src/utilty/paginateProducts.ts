export function paginateProducts<T>(
  products: T[],
  currentPage: number,
  perPage: number,
) {
  return products.slice((currentPage - 1) * perPage, currentPage * perPage);
}
