interface ActiveFilter {
  label: string;
  clear: () => void;
}

interface Props {
  filters: ActiveFilter[];
}

export default function ActiveFilters({ filters }: Props) {
  if (!filters.length) return null;

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <span className="text-sm font-medium text-[#6F6259]">Active Filter</span>

      {filters.map((filter, index) => (
        <button
          key={`${filter.label}-${index}`}
          onClick={filter.clear}
          className="flex items-center gap-2 rounded-full bg-[#EFE3D7] px-4 py-2 text-sm text-[#35281E]"
        >
          {filter.label}

          <svg
            className="h-3 w-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18 6L6 18M6 6l12 12"
            />
          </svg>
        </button>
      ))}
    </div>
  );
}
