import { User, Baby, Users, Dog, LucideIcon } from 'lucide-react';

export type Answer = {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
};

export type Question = {
  id: string;
  title: string;
  subtitle: string;
  answers: Answer[];
};

type UserType = 'adult' | 'child' | 'baby' | 'couple' | 'dog';

export const USER_QUESTION: Question = {
  id: 'user',
  title: 'Hvem skal bruge tyngdeproduktet?',
  subtitle: 'Vi tilpasser anbefalingen til alder og behov.',
  answers: [
    { id: 'adult', title: 'Voksen', subtitle: '15+ år', icon: User },
    { id: 'child', title: 'Barn', subtitle: '5–14 år', icon: User },
    {
      id: 'baby',
      title: 'Baby / Småbørn',
      subtitle: '0–4 år (kun under opsyn)',
      icon: Baby,
    },
    {
      id: 'couple',
      title: 'Par (delt seng)',
      subtitle: 'To voksne',
      icon: Users,
    },
    { id: 'dog', title: 'Hund', subtitle: 'Til urolige hunde', icon: Dog },
  ],
};

function getWeightQuestion(userType: UserType | undefined): Question {
  switch (userType) {
    case 'dog':
      return {
        id: 'weight',
        title: 'Hvor stor er din hund?',
        subtitle: 'Vi finder den rette DoggyRo størrelse.',
        answers: [
          {
            id: 'small',
            title: 'Lille hund',
            subtitle: 'Op til 15 kg',
            icon: Dog,
          },
          {
            id: 'large',
            title: 'Stor hund',
            subtitle: 'Over 15 kg',
            icon: Dog,
          },
        ],
      };
    case 'child':
      return {
        id: 'weight',
        title: 'Hvad vejer barnet?',
        subtitle: 'Vi bruger vægten til at finde den rette model.',
        answers: [
          {
            id: 'under25',
            title: 'Under 25 kg',
            subtitle: 'Let vægt',
            icon: User,
          },
          {
            id: '25-40',
            title: '25 - 40 kg',
            subtitle: 'Mellem vægt',
            icon: User,
          },
          {
            id: '40plus',
            title: 'Over 40 kg',
            subtitle: 'Høj vægt',
            icon: User,
          },
        ],
      };
    case 'couple':
      return {
        id: 'weight',
        title: 'Hvad er jeres samlede vægt cirka?',
        subtitle: 'Vi finder en dyne, der passer til jer begge.',
        answers: [
          {
            id: 'under130',
            title: 'Under 130 kg',
            subtitle: 'Til sammen',
            icon: Users,
          },
          {
            id: '130-180',
            title: '130 - 180 kg',
            subtitle: 'Til sammen',
            icon: Users,
          },
          {
            id: '180plus',
            title: 'Over 180 kg',
            subtitle: 'Til sammen',
            icon: Users,
          },
        ],
      };
    default: // adult
      return {
        id: 'weight',
        title: 'Hvad vejer personen?',
        subtitle: 'Vi bruger vægten til at finde den rette model.',
        answers: [
          {
            id: 'under60',
            title: 'Under 60 kg',
            subtitle: 'Let vægt',
            icon: User,
          },
          {
            id: '60-90',
            title: '60 - 90 kg',
            subtitle: 'Mellem vægt',
            icon: User,
          },
          {
            id: '90plus',
            title: 'Over 90 kg',
            subtitle: 'Høj vægt',
            icon: User,
          },
        ],
      };
  }
}

const DOG_QUESTIONS: Question[] = [
  {
    id: 'trigger',
    title: 'Hvad udløser oftest uroen?',
    subtitle: 'Vælg det, der passer bedst.',
    answers: [
      {
        id: 'fireworks',
        title: 'Fyrværkeri',
        subtitle: 'Høje lyde',
        icon: Dog,
      },
      {
        id: 'thunder',
        title: 'Tordenvejr',
        subtitle: 'Vejr-relateret',
        icon: Dog,
      },
      {
        id: 'separation',
        title: 'Adskillelse',
        subtitle: 'Når hunden er alene',
        icon: Dog,
      },
      {
        id: 'general',
        title: 'Generel nervøsitet',
        subtitle: 'Ingen tydelig grund',
        icon: Dog,
      },
    ],
  },
  {
    id: 'frequency',
    title: 'Hvor ofte virker hunden urolig?',
    subtitle: 'Dette hjælper os med anbefalingen.',
    answers: [
      { id: 'often', title: 'Ofte', subtitle: 'Dagligt', icon: Dog },
      {
        id: 'sometimes',
        title: 'Nogle gange',
        subtitle: 'Indimellem',
        icon: Dog,
      },
      {
        id: 'never',
        title: 'Sjældent',
        subtitle: 'Kun ved specifikke hændelser',
        icon: Dog,
      },
    ],
  },
  {
    id: 'goal',
    title: 'Hvad ønsker du hjælp til?',
    subtitle: 'Vælg det vigtigste mål.',
    answers: [
      {
        id: 'calm',
        title: 'Mere ro i hverdagen',
        subtitle: 'Generel tryghed',
        icon: Dog,
      },
      {
        id: 'events',
        title: 'Håndtere fyrværkeri/torden',
        subtitle: 'Specifikke hændelser',
        icon: Dog,
      },
      {
        id: 'alone',
        title: 'Mindre adskillelsesangst',
        subtitle: 'Når hunden er alene',
        icon: Dog,
      },
    ],
  },
];

const BABY_QUESTIONS: Question[] = [
  {
    id: 'need',
    title: 'Hvad er det primære behov?',
    subtitle: 'Vælg det, der bedst beskriver situationen.',
    answers: [
      {
        id: 'sleep',
        title: 'Bedre søvn',
        subtitle: 'Svært ved at falde eller blive i søvn',
        icon: Baby,
      },
      {
        id: 'crying',
        title: 'Uro og gråd',
        subtitle: 'Kolik, uro eller generel utilfredshed',
        icon: Baby,
      },
      {
        id: 'safety',
        title: 'Tryghed og ro',
        subtitle: 'Behov for at føle sig tryg og holdt',
        icon: Baby,
      },
    ],
  },
  {
    id: 'age',
    title: 'Hvor gammelt er barnet?',
    subtitle: 'Vi anbefaler den letteste vægt til de mindste.',
    answers: [
      {
        id: '0-12m',
        title: '0–12 måneder',
        subtitle: 'Kun under opsyn',
        icon: Baby,
      },
      { id: '1-2y', title: '1–2 år', subtitle: 'Cirka 10–14 kg', icon: Baby },
      { id: '3-4y', title: '3–4 år', subtitle: 'Cirka 14–20 kg', icon: Baby },
    ],
  },
];

const HUMAN_QUESTIONS: Question[] = [
  {
    id: 'sleep',
    title: 'Hvordan sover personen?',
    subtitle: 'Fortæl lidt om søvnen.',
    answers: [
      { id: 'poor', title: 'Dårligt', subtitle: 'Vågner ofte', icon: User },
      {
        id: 'average',
        title: 'Nogenlunde',
        subtitle: 'Varierende søvn',
        icon: User,
      },
      { id: 'good', title: 'Godt', subtitle: 'Sover normalt', icon: User },
    ],
  },
  {
    id: 'stress',
    title: 'Oplever personen stress eller uro?',
    subtitle: 'Dette hjælper os med anbefalingen.',
    answers: [
      { id: 'often', title: 'Ofte', subtitle: 'Dagligt', icon: User },
      {
        id: 'sometimes',
        title: 'Nogle gange',
        subtitle: 'Indimellem',
        icon: User,
      },
      { id: 'never', title: 'Sjældent', subtitle: 'Næsten aldrig', icon: User },
    ],
  },
  {
    id: 'goal',
    title: 'Hvad ønsker du hjælp til?',
    subtitle: 'Vælg det vigtigste mål.',
    answers: [
      {
        id: 'sleep',
        title: 'Bedre søvn',
        subtitle: 'Sov hurtigere',
        icon: User,
      },
      { id: 'stress', title: 'Mindre stress', subtitle: 'Mere ro', icon: User },
      {
        id: 'focus',
        title: 'Mere fokus',
        subtitle: 'Bedre koncentration',
        icon: User,
      },
    ],
  },
];

export function getQuestions(answers: Record<string, string>): Question[] {
  const userType = answers.user as UserType | undefined;

  if (userType === 'baby') {
    return [USER_QUESTION, ...BABY_QUESTIONS];
  }

  const weightQuestion = getWeightQuestion(userType);

  if (userType === 'dog') {
    return [USER_QUESTION, weightQuestion, ...DOG_QUESTIONS];
  }

  return [USER_QUESTION, weightQuestion, ...HUMAN_QUESTIONS];
}
