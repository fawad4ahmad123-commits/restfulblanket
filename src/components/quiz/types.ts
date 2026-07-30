export interface QuizAnswer {
  id: string;
  label: string;
  score: number;
}

export interface QuizQuestion {
  id: string;
  title: string;
  answers: QuizAnswer[];
}
