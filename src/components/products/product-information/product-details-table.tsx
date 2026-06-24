import { DetailRow } from '../types';

interface ProductDetailsTableProps {
  title: string;
  rows: DetailRow[];
}

const ProductDetailsTable = ({ title, rows }: ProductDetailsTableProps) => {
  if (!rows.length) return null;

  return (
    <div className="rounded-xl border border-[#E3DCCD] bg-[#F7F2EA] p-5">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#3F3A36]">
        {title}
      </h3>
      <dl className="divide-y divide-[#E3DCCD]">
        {rows.map((row) => (
          <div
            key={row.id}
            className="flex items-center justify-between gap-4 py-2.5 text-sm"
          >
            <dt className="text-[#8A8377]">{row.label}</dt>
            <dd className="text-right text-[#3F3A36]">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
export default ProductDetailsTable;
