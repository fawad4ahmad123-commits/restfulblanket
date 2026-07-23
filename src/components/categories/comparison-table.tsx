type ComparisonRow = {
  label: string;
  col1: string;
  col2: string;
};

type ComparisonTableProps = {
  headers?: string[];
  rows?: ComparisonRow[];
};

export default function ComparisonTable({
  headers,
  rows,
}: ComparisonTableProps) {
  const [h0, h1, h2] =
    headers && headers.length === 3
      ? headers
      : [
          'Funktion',
          'RestfulBlanket (Rapsfrø)',
          'Traditionel Kugledyne (Glas/Plastik)',
        ];

  const data: ComparisonRow[] = rows && rows.length > 0 ? rows : [];

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[700px] overflow-hidden rounded-xl border border-[#E7DED6]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#34261D] text-white">
              <th className="border-r border-[#4A3B31] px-3 py-3 text-center text-xs font-medium md:px-6 md:py-4 md:text-sm">
                {h0}
              </th>

              <th className="border-r border-[#4A3B31] px-3 py-3 text-center text-xs font-medium md:px-6 md:py-4 md:text-sm">
                {h1}
              </th>

              <th className="px-3 py-3 text-center text-xs font-medium md:px-6 md:py-4 md:text-sm">
                {h2}
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-t border-[#E7DED6]">
                <td className="border-r border-[#E7DED6] px-3 py-3 text-center text-xs text-[#4B4037] md:px-6 md:py-4 md:text-sm">
                  {item.label}
                </td>

                <td className="border-r border-[#E7DED6] px-3 py-3 text-center text-xs text-[#4B4037] md:px-6 md:py-4 md:text-sm">
                  {item.col1}
                </td>

                <td className="px-3 py-3 text-center text-xs text-[#4B4037] md:px-6 md:py-4 md:text-sm">
                  {item.col2}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
