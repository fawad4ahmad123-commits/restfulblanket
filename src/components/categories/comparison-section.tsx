import ComparisonTable from './comparison-table';

export default function ComparisonSection() {
  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-[#F7F3EE] py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-10 text-center text-[44px] font-normal text-[#34261D]">
          The Modern <span className="font-serif italic">Weighted Blanket</span>{' '}
          Difference
        </h2>

        <ComparisonTable />
      </div>
    </section>
  );
}
