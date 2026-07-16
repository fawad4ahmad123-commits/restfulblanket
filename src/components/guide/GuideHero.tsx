import Image from 'next/image';

interface GuideHeroProps {
  title: string;
  heroImage: { src: string; alt: string } | null;
}

export function GuideHero({ title, heroImage }: GuideHeroProps) {
  return (
    <header className="mx-auto max-w-3xl px-4 pt-10 text-center sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
        {title}
      </h1>

      {heroImage && (
        <div className="relative mt-8 aspect-[3/2] w-full overflow-hidden rounded-3xl shadow-sm">
          <Image
            src={heroImage.src}
            alt={heroImage.alt || title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      )}
    </header>
  );
}
