export function ConsultationCard({ professional }: any) {
  console.log('t23', professional);

  const professionalList = Array.isArray(professional) ? professional : [];

  return (
    <section className="mt-12 pb-16 md:mt-5 md:pb-20">
      <h2 className="mb-6 font-serif text-xl text-[#736760] md:mb-8 md:text-2xl">
        Professionel erfaring
      </h2>

      <div className="space-y-4 md:space-y-6">
        {professionalList.map((item: any, index: number) => (
          <div
            key={item.title ?? index}
            className="flex flex-col gap-1 border-b border-[#e9ddd4] sm:grid sm:grid-cols-[100px_1fr] sm:gap-8"
          >
            <div className="text-sm font-medium text-[#35281E] sm:font-normal">
              {item.title}
            </div>

            <div className="w-full text-sm text-[#4F433B]">
              <div>{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
