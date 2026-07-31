'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

export type QuizResultData = {
  productName: string;
  size: string;
  weightLabel: string;
  price: string;
  productSlug?: string;
  ctaLabel: string;
};

type QuizResultContextValue = {
  result: QuizResultData | null;
  setResult: (data: QuizResultData) => void;
  clearResult: () => void;
};

const STORAGE_KEY = 'quiz-result';

const QuizResultContext = createContext<QuizResultContextValue | undefined>(
  undefined,
);

export function QuizResultProvider({ children }: { children: ReactNode }) {
  const [result, setResultState] = useState<QuizResultData | null>(null);

  // Hydrate from localStorage on mount (handles direct load / refresh of the result page)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setResultState(JSON.parse(stored));
      }
    } catch {
      // ignore malformed/inaccessible storage
    }
  }, []);

  const setResult = (data: QuizResultData) => {
    setResultState(data);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore storage write failures (e.g. private browsing)
    }
  };

  const clearResult = () => {
    setResultState(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <QuizResultContext.Provider value={{ result, setResult, clearResult }}>
      {children}
    </QuizResultContext.Provider>
  );
}

export function useQuizResult() {
  const ctx = useContext(QuizResultContext);
  if (!ctx) {
    throw new Error('useQuizResult must be used within a QuizResultProvider');
  }
  return ctx;
}
