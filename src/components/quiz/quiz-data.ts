import { QuizQuestion } from './types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'sleep',
    title: 'Hvordan sover du typisk?',
    answers: [
      { id: 'bad', label: 'Jeg vågner ofte', score: 3 },
      { id: 'ok', label: 'Nogenlunde', score: 2 },
      { id: 'good', label: 'Ret godt', score: 1 },
    ],
  },
  {
    id: 'stress',
    title: 'Hvor stresset føler du dig?',
    answers: [
      { id: 'high', label: 'Meget stresset', score: 3 },
      { id: 'medium', label: 'Lidt stresset', score: 2 },
      { id: 'low', label: 'Sjældent', score: 1 },
    ],
  },
  {
    id: 'anxiety',
    title: 'Oplever du uro eller tankemylder?',
    answers: [
      { id: 'often', label: 'Ofte', score: 3 },
      { id: 'sometimes', label: 'Nogle gange', score: 2 },
      { id: 'never', label: 'Sjældent', score: 1 },
    ],
  },
  {
    id: 'adhd',
    title: 'Har du ADHD, autisme eller sensorisk uro?',
    answers: [
      { id: 'yes', label: 'Ja', score: 3 },
      { id: 'maybe', label: 'Lidt', score: 2 },
      { id: 'no', label: 'Nej', score: 1 },
    ],
  },
  {
    id: 'weight',
    title: 'Hvad er din vægt?',
    answers: [
      { id: 'small', label: 'Under 60 kg', score: 1 },
      { id: 'medium', label: '60-90 kg', score: 2 },
      { id: 'large', label: 'Over 90 kg', score: 3 },
    ],
  },
];
