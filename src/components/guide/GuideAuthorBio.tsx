import { AuthorBio } from '@/src/types/wp';
import Image from 'next/image';

interface GuideAuthorBioProps {
  authorBio: AuthorBio | null;
}

export function GuideAuthorBio({ authorBio }: GuideAuthorBioProps) {
  if (!authorBio) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 pt-4 sm:px-6">
      <div className="flex flex-col gap-6 rounded-2xl border border-[#e7ded6] bg-[#faf7f4] p-6 sm:flex-row sm:items-start sm:gap-8 sm:p-8">
        {authorBio.image && (
          <Image
            src={authorBio.image.src}
            alt={authorBio.image.alt || authorBio.name}
            width={112}
            height={112}
            className="mx-auto h-28 w-28 flex-shrink-0 rounded-full object-cover sm:mx-0"
          />
        )}

        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-lg font-semibold text-[#4a3f38]">
            {authorBio.name}
          </h3>

          <div
            className="mt-2 text-sm leading-relaxed text-[#736760] [&_a]:font-semibold [&_a]:text-[#392A22] [&_a]:underline [&_a]:underline-offset-2"
            dangerouslySetInnerHTML={{ __html: authorBio.bioHtml }}
          />

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 sm:justify-start">
            <a
              href={authorBio.bioLinkHref}
              className="inline-flex items-center justify-center rounded-full bg-[#392A22] px-5 py-2.5 text-sm font-medium text-white no-underline shadow-sm transition-opacity hover:opacity-90"
            >
              Se Zafirs bio
            </a>

            {authorBio.phone && (
              <a
                href={`tel:${authorBio.phone.replace(/\s+/g, '')}`}
                className="text-sm font-medium text-[#392A22] underline underline-offset-2"
              >
                Ring til os på {authorBio.phone}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
