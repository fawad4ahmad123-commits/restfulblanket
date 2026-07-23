import ComparisonTable from './comparison-table';

type ComparisonRow = {
  label: string;
  col1: string;
  col2: string;
};

type ComparisonSectionProps = {
  title?: string;
  headers?: string[];
  rows?: ComparisonRow[];
  description?: string;
};

export default function ComparisonSection({
  title,
  headers,
  rows,
  description,
}: ComparisonSectionProps) {
  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-[#F7F3EE] py-20">
      <div className="mx-auto max-w-6xl px-4">
        {title && (
          <h2 className="mb-10 text-center text-[44px] font-normal text-[#34261D]">
            {title}
          </h2>
        )}

        <ComparisonTable headers={headers} rows={rows} />
      </div>
    </section>
  );
}
