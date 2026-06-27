import Image from 'next/image';
import { CERTIFICATIONS } from './contants';

export function Certifications() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl rounded-[28px] bg-[#F5F0EA] px-8 py-12">
        <p className="mb-10 text-center text-sm text-[#8A817B]">
          Recognised & verified — reviewed by independent ethical and
          sustainability bodies
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8">
          {CERTIFICATIONS.map((logo) => (
            <Image key={logo} src={logo} alt="" width={90} height={90} />
          ))}
        </div>
      </div>
    </section>
  );
}
