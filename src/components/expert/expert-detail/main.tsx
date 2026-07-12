'use client';
import Image from 'next/image';
import {
  Heart,
  ShieldCheck,
  Lightbulb,
  Briefcase,
  FileText,
} from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { expertData } from '@/src/components/expert/contants';
import ExpertDetail from '@/src/components/expert/expert-detail';

const ExpertDetailPage = () => {
  return (
    <div className="min-h-screen bg-[#fdf9f6]">
      <div className="mx-auto max-w-7xl px-4 py-5">
        <div className="text-xs text-[#736760]">
          {`  Home > Shop experts > ${expertData.name}`}
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-4 md:py-8 lg:py-13">
        <div className="flex flex-col items-center gap-5 md:flex-row md:items-start">
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full md:h-20 md:w-20">
            <Image
              src={expertData.image}
              alt={expertData.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="font-serif text-3xl text-[#35281E] md:text-4xl">
              {expertData.name}
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#736760] md:max-w-3xl">
              {expertData.title}
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
              {expertData.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#E9DDD4] bg-[#faf4ee] px-3 py-1.5 text-xs text-[#5F5148] md:px-4 md:py-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <section className="mt-12 md:mt-16">
          <h2 className="mb-4 font-serif text-xl text-[#736760] md:mb-5 md:text-2xl">
            Introduction
          </h2>

          <p className="text-sm leading-7 text-[#6F6258] md:max-w-4xl md:leading-8">
            {expertData.introduction}
          </p>
        </section>

        <section className="mt-12 md:mt-16">
          <h2 className="mb-4 font-serif text-xl text-[#736760] md:mb-5 md:text-2xl">
            Role at RestfulBlanket
          </h2>

          <div className="flex items-center gap-3 rounded-xl border border-[#E9DED6] bg-[#faf4ee] px-4 py-3 md:px-5 md:py-4">
            <FileText className="h-4 w-4 flex-shrink-0 text-[#7C6E64]" />

            <p className="text-sm text-[#6F6258]">{expertData.role}</p>
          </div>
        </section>

        <section className="mt-12 md:mt-16">
          <h2 className="mb-5 font-serif text-xl text-[#736760] md:mb-6 md:text-2xl">
            Professional overview
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 md:gap-5">
            {expertData.professionalOverview.map((item, index) => {
              const icons = [Heart, ShieldCheck, Lightbulb, Briefcase];
              const IconComponent = icons[index];
              const titles = [
                'Background',
                'Core focus',
                'Working style',
                'Current role',
              ];

              return (
                <Card
                  key={index}
                  className="border-[#e9ddd4] bg-[#faf4ee] shadow-none transition-all hover:shadow-md"
                >
                  <CardContent className="p-4 md:p-6">
                    <IconComponent className="mb-3 h-5 w-5 text-[#7B6A5E] md:mb-4 md:h-6 md:w-6" />

                    <h3 className="mb-2 font-medium text-[#35281E] text-sm md:text-base">
                      {titles[index]}
                    </h3>

                    <p className="text-xs text-[#7A6E65] md:text-sm">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="mt-12 pb-16 md:mt-16 md:pb-20">
          <h2 className="mb-6 font-serif text-xl text-[#736760] md:mb-8 md:text-2xl">
            Education & Training
          </h2>

          <div className="space-y-4 md:space-y-6">
            {expertData.education.map((item) => (
              <div
                key={item.year}
                className="flex flex-col items-center justify-center gap-1 sm:grid sm:grid-cols-[100px_1fr] sm:gap-8 border-b border-[#e9ddd4]"
              >
                <div className="text-sm font-medium text-[#8B7E74] sm:font-normal text-center">
                  {item.year}
                </div>

                <div className="text-sm text-[#4F433B] text-center sm:text-left ">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
          <ExpertDetail />
        </section>
      </div>
    </div>
  );
};

export default ExpertDetailPage;
