import { COMPARISON_DATA } from './constants';

export default function ComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[700px] overflow-hidden rounded-xl border border-[#E7DED6]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#34261D] text-white">
              <th className="border-r border-[#4A3B31] px-3 py-3 text-center text-xs font-medium md:px-6 md:py-4 md:text-sm">
                Funktion
              </th>

              <th className="border-r border-[#4A3B31] px-3 py-3 text-center text-xs font-medium md:px-6 md:py-4 md:text-sm">
                RestfulBlanket (Rapsfrø)
              </th>

              <th className="px-3 py-3 text-center text-xs font-medium md:px-6 md:py-4 md:text-sm">
                Traditionel Kugledyne (Glas/Plastik)
              </th>
            </tr>
          </thead>

          <tbody>
            {COMPARISON_DATA.map((item) => (
              <tr key={item.feature} className="border-t border-[#E7DED6]">
                <td className="border-r border-[#E7DED6] px-3 py-3 text-center text-xs text-[#4B4037] md:px-6 md:py-4 md:text-sm">
                  {item.feature}
                </td>

                <td className="border-r border-[#E7DED6] px-3 py-3 text-center text-xs text-[#4B4037] md:px-6 md:py-4 md:text-sm">
                  {item.restfull}
                </td>

                <td className="px-3 py-3 text-center text-xs text-[#4B4037] md:px-6 md:py-4 md:text-sm">
                  {item.traditional}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
