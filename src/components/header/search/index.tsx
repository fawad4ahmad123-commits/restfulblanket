import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchProducts = () => {
  return (
    <Button size="icon" variant="ghost">
      <Search className="size-4" />
    </Button>
  );
};

export default SearchProducts;
