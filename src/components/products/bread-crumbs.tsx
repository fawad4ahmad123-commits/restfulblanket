import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  items: string[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center text-sm text-[#8A8377]"
    >
      {items.map((item, i) => (
        <span key={item} className="flex items-center">
          <span className={i === items.length - 1 ? 'text-[#3F3A36]' : ''}>
            {item}
          </span>
          {i < items.length - 1 && (
            <ChevronRight className="mx-1.5 h-3.5 w-3.5" />
          )}
        </span>
      ))}
    </nav>
  );
};
export default Breadcrumbs;
