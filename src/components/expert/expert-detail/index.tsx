import { ExperienceSection } from './experienceSection';
import { FAQSection } from './faq-Section';
import { ConsultationCard } from './her-words';

const ExpertDetail = ({ professional }: any) => {
  return (
    <main className=" bg-[#fdf9f6]">
      <div className="container mx-auto max-w-7xl px-1 py-12">
        <ConsultationCard professional={professional} />
        {/* <FAQSection /> */}
      </div>
    </main>
  );
};
export default ExpertDetail;
