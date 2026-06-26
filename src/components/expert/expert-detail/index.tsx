import { ExperienceSection } from './experienceSection';
import { FAQSection } from './faq-Section';
import { ConsultationCard } from './her-words';

const ExpertDetail = () => {
  return (
    <main className="min-h-screen bg-[#fdf9f6]">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <ConsultationCard />
        <FAQSection />
      </div>
    </main>
  );
};
export default ExpertDetail;
