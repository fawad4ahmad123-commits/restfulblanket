import { Card, CardContent } from '@/components/ui/card';
import { PRIVACY_POLICY } from './contants';

export default function PrivacyPolicyContent() {
  return (
    <section className="bg-[#FDF9F6] py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          <div className="space-y-6 text-center">
            <h1 className="font-fraunces text-4xl font-light text-[#392A22] md:text-5xl">
              {PRIVACY_POLICY.title}
            </h1>

            <p className="mx-auto max-w-3xl text-base leading-8 text-[#6B5A4F]">
              {PRIVACY_POLICY.intro}
            </p>
          </div>

          <div className="border-[#E9DDD4] shadow-none">
            <p className="p-8">
              <div className="space-y-2">
                <h2 className="font-fraunces text-2xl text-[#392A22]">
                  {PRIVACY_POLICY.company.name} (ApS)
                </h2>

                {PRIVACY_POLICY.company.address.map((line: any) => (
                  <p key={line} className="text-[#6B5A4F]">
                    {line}
                  </p>
                ))}

                <p className="text-[#6B5A4F]">
                  Tel: {PRIVACY_POLICY.company.phone}
                </p>

                <p className="text-[#6B5A4F]">
                  Email: {PRIVACY_POLICY.company.email}
                </p>

                <p className="pt-4 text-[#6B5A4F]">
                  {PRIVACY_POLICY.company.description}
                </p>
              </div>
            </p>
          </div>

          {PRIVACY_POLICY.sections.map((section: any) => (
            <div key={section.title} className="border-[#E9DDD4] shadow-none">
              <p className="p-8">
                <div className="space-y-6">
                  <h2 className="font-fraunces text-2xl text-[#392A22]">
                    {section.title}
                  </h2>

                  <p className="leading-8 text-[#6B5A4F]">{section.content}</p>

                  <ul className="list-disc space-y-2 pl-6 text-[#6B5A4F]">
                    {section.items?.map((item: any) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  {section.purpose && (
                    <div>
                      <h3 className="mb-2 text-lg font-medium text-[#392A22]">
                        Purpose
                      </h3>
                      <p className="leading-8 text-[#6B5A4F]">
                        {section.purpose}
                      </p>
                    </div>
                  )}

                  {section.legalBasis && (
                    <div>
                      <h3 className="mb-2 text-lg font-medium text-[#392A22]">
                        Legal Basis
                      </h3>
                      <p className="leading-8 text-[#6B5A4F]">
                        {section.legalBasis}
                      </p>
                    </div>
                  )}

                  {section.storage && (
                    <div>
                      <h3 className="mb-2 text-lg font-medium text-[#392A22]">
                        Storage
                      </h3>
                      <p className="leading-8 text-[#6B5A4F]">
                        {section.storage}
                      </p>
                    </div>
                  )}

                  {section.sharing && (
                    <div>
                      <h3 className="mb-2 text-lg font-medium text-[#392A22]">
                        Sharing
                      </h3>
                      <p className="leading-8 text-[#6B5A4F]">
                        {section.sharing}
                      </p>
                    </div>
                  )}
                </div>
              </p>
            </div>
          ))}

          <div className="border-[#E9DDD4] shadow-none">
            <p className="p-8">
              <div className="space-y-6">
                <h2 className="font-fraunces text-2xl text-[#392A22]">
                  Your Rights
                </h2>

                <ul className="list-disc space-y-2 pl-6 text-[#6B5A4F]">
                  {PRIVACY_POLICY.rights.map((right: any) => (
                    <li key={right}>{right}</li>
                  ))}
                </ul>

                <p className="text-[#6B5A4F]">
                  Would you like to exercise your rights? Contact us at{' '}
                  <a
                    href={`mailto:${PRIVACY_POLICY.rightsContact}`}
                    className="font-medium text-[#392A22]"
                  >
                    {PRIVACY_POLICY.rightsContact}
                  </a>
                </p>
              </div>
            </p>
          </div>

          <div className="border-[#E9DDD4] shadow-none">
            <p className="p-8">
              <div className="space-y-4">
                <h2 className="font-fraunces text-2xl text-[#392A22]">
                  If You Are Dissatisfied
                </h2>

                <p className="leading-8 text-[#6B5A4F]">
                  {PRIVACY_POLICY.complaint.text}
                </p>

                <a
                  href={PRIVACY_POLICY.complaint.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex text-[#392A22] underline"
                >
                  www.datatilsynet.dk
                </a>
              </div>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
