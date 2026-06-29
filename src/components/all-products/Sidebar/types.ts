import { SelectedFilters } from '../types';

export interface ProductSideCategory {
  filters: SelectedFilters;
  setFilters: React.Dispatch<React.SetStateAction<SelectedFilters>>;
  filterOptions: {
    categories: string[];
    colors: string[];
    weights: string[];
    sizes: string[];
    minPrice: number;
    maxPrice: number;
  };
}
