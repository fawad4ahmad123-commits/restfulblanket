import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchProducts = () => {
  return (
    <Button
      size="icon"
      variant="ghost"
      aria-label="Search products"
      title="Search products"
    >
      <Search aria-hidden="true" className="size-4" />
    </Button>
  );
};

export default SearchProducts;
