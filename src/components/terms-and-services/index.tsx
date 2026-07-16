import Link from 'next/link';
import { TERMS_AND_CONDITIONS } from './contants';

export default function TermsContent() {
  return (
    <section className="bg-[#FDF9F6] py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-16 text-center">
          <h1 className="font-fraunces text-4xl font-light text-[#392A22] md:text-5xl">
            {TERMS_AND_CONDITIONS.title}
          </h1>
        </div>

        <div className="space-y-14">
          <div className="border-b border-[#E9DDD4] pb-12">
            <h2 className="mb-6 font-fraunces text-2xl text-[#392A22]">
              {TERMS_AND_CONDITIONS.company.name}
            </h2>

            <div className="space-y-2 text-[#6B5A4F]">
              {TERMS_AND_CONDITIONS.company.address.map((item) => (
                <p key={item}>{item}</p>
              ))}

              <p>Telefon: {TERMS_AND_CONDITIONS.company.phone}</p>

              <p>E-mail: {TERMS_AND_CONDITIONS.company.email}</p>
            </div>
          </div>

          {TERMS_AND_CONDITIONS.sections.map((section) => (
            <div
              key={section.title}
              className="border-b border-[#E9DDD4] pb-12"
            >
              <h2 className="mb-6 font-fraunces text-2xl text-[#392A22]">
                {section.title}
              </h2>

              <div className="space-y-5">
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="leading-8 text-[#6B5A4F]">
                    {paragraph}
                  </p>
                ))}

                {section.items && (
                  <ul className="space-y-3 pl-5 text-[#6B5A4F]">
                    {section.items.map((item) => (
                      <li key={item} className="list-disc leading-8">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {section.footer && (
                  <p className="leading-8 text-[#6B5A4F]">{section.footer}</p>
                )}
              </div>
            </div>
          ))}

          <div className="space-y-4">
            <h2 className="font-fraunces text-2xl text-[#392A22]">
              Eksterne Links
            </h2>

            <div className="flex flex-col gap-3">
              <Link
                href={TERMS_AND_CONDITIONS.complaintLinks.danish}
                target="_blank"
                className="text-[#392A22] underline"
              >
                www.forbrug.dk
              </Link>

              <Link
                href={TERMS_AND_CONDITIONS.complaintLinks.eu}
                target="_blank"
                className="text-[#392A22] underline"
              >
                EU Online Complaint Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
