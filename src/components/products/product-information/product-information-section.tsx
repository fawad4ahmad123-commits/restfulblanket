import ProductAttributes from "./product-attribute";
import ProductDetailsTable from "./product-details-table";
import ProductFaqAccordion from "./product-faq-accordions";
import { ProductInformation } from "../types";

interface ProductInformationSectionProps {
  info: ProductInformation;
}

const ProductInformationSection = ({
  info,
}: ProductInformationSectionProps) => {
  return (
    <section
      id="product-information"
      className="mx-auto max-w-5xl scroll-mt-40 px-6 py-16 md:px-12"
    >
      <h2 className="mb-10 text-center font-serif text-3xl tracking-wide text-[#3F3A36] md:text-4xl">
        {info.heading} <span className="italic">{info.headingItalic}</span>
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ProductFaqAccordion
          items={info.faqs}
          defaultOpenId={info.faqs[0]?.id}
        />

        <div className="flex flex-col gap-6">
          <ProductDetailsTable title={info.detailsTitle} rows={info.details} />
          <ProductAttributes
            title={info.attributesTitle}
            temperatureLabel={info.temperatureLabel}
            options={info.temperatureOptions}
          />
        </div>
      </div>
    </section>
  );
};
export default ProductInformationSection;
