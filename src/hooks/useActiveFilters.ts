import { SelectedFilters } from '../components/all-products/types';

interface Props {
  filters: SelectedFilters;
  setFilters: React.Dispatch<React.SetStateAction<SelectedFilters>>;
}

export function useActiveFilters({ filters, setFilters }: Props) {
  return [
    ...filters.weights.map((weight) => ({
      label: weight,
      clear: () =>
        setFilters((f) => ({
          ...f,
          weights: f.weights.filter((item) => item !== weight),
        })),
    })),

    ...filters.sizes.map((size) => ({
      label: size,
      clear: () =>
        setFilters((f) => ({
          ...f,
          sizes: f.sizes.filter((item) => item !== size),
        })),
    })),

    ...filters.categories.map((category) => ({
      label: category,
      clear: () =>
        setFilters((f) => ({
          ...f,
          categories: f.categories.filter((item) => item !== category),
        })),
    })),

    ...filters.colors.map((color) => ({
      label: color,
      clear: () =>
        setFilters((f) => ({
          ...f,
          colors: f.colors.filter((item) => item !== color),
        })),
    })),
  ];
}
