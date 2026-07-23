import ComparisonSection from './comparison-section';

interface Benefit {
  title: string;
  text: string;
}

interface BenefitSectionProps {
  intro?: string;
  benefits: Benefit[];
  headers?: string[];
  rows?: any[];
  description?: string;
  isParentCategory?: boolean;
}

export default function BenefitSection({
  intro,
  benefits,
  headers,
  rows,
  description,
  isParentCategory = false,
}: BenefitSectionProps) {
  if (!benefits?.length) return null;

  const introLines = intro?.split('\n').filter(Boolean) || [];
  const introHeading = introLines[0] || '';
  const introDescription = introLines.slice(1).join('\n');

  const firstTwoBenefits = benefits.slice(0, 2);
  const remainingBenefits = benefits.slice(2);

  return (
    <section className="py-16">
      {intro && (
        <div className="mb-16">
          <h2 className="mb-10 text-[44px] font-normal text-[#34261D]">
            {introHeading}
          </h2>

          <p className="max-w-4xl whitespace-pre-line text-left text-[#4B4037]">
            {introDescription}
          </p>
        </div>
      )}

      {isParentCategory ? (
        <>
          <ComparisonSection
            headers={headers}
            rows={rows}
            description={description}
          />
          <div className="mt-16">
            {description && (
              <p className="max-w-4xl whitespace-pre-line text-left text-[#4B4037]">
                {description}
              </p>
            )}
          </div>
          <div className="mt-16 space-y-16">
            {benefits.map((item, index) => (
              <div key={index}>
                <h3 className="mb-6 text-3xl font-medium text-[#34261D]">
                  {item.title}
                </h3>

                <p className="max-w-4xl whitespace-pre-line text-left text-[#4B4037]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {firstTwoBenefits.map((item, index) => (
            <div key={index} className="mb-16">
              <h3 className="mb-6 text-3xl font-medium text-[#34261D]">
                {item.title}
              </h3>

              <p className="max-w-4xl whitespace-pre-line text-left text-[#4B4037]">
                {item.text}
              </p>
            </div>
          ))}

          <ComparisonSection
            headers={headers}
            rows={rows}
            description={description}
          />

          <div className="mt-16 space-y-16">
            {remainingBenefits.map((item, index) => (
              <div key={index}>
                <h3 className="mb-6 text-3xl font-medium text-[#34261D]">
                  {item.title}
                </h3>

                <p className="max-w-4xl whitespace-pre-line text-left text-[#4B4037]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
