export type QuizAnswers = Record<string, string>;

export type QuizRecommendation = {
  isDog: boolean;
  isBaby: boolean;
  idealWeight: number;
  dogSize: 'small' | 'large' | null;
  categorySlug: string;
  supervisionNote: boolean;
};

export function getRecommendation(answers: QuizAnswers): QuizRecommendation {
  const isDog = answers.user === 'dog';
  const isBaby = answers.user === 'baby';

  if (isDog) {
    return {
      isDog: true,
      isBaby: false,
      idealWeight: 0,
      dogSize: answers.weight === 'large' ? 'large' : 'small',
      categorySlug: 'doggyro',
      supervisionNote: false,
    };
  }

  if (isBaby) {
    return {
      isDog: false,
      isBaby: true,
      idealWeight: getIdealBabyWeight(answers.age),
      dogSize: null,
      categorySlug: 'baby',
      supervisionNote: answers.age === '0-12m',
    };
  }

  return {
    isDog: false,
    isBaby: false,
    dogSize: null,
    idealWeight: getIdealHumanWeight(answers),
    categorySlug: getTargetCategorySlug(answers),
    supervisionNote: false,
  };
}

function getIdealBabyWeight(age: string | undefined): number {
  switch (age) {
    case '0-12m':
      return 1.5;
    case '1-2y':
      return 2;
    case '3-4y':
      return 2.5;
    default:
      return 2;
  }
}

function getIdealHumanWeight(answers: QuizAnswers): number {
  if (answers.user === 'couple') {
    switch (answers.weight) {
      case 'under130':
        return 8;
      case '130-180':
        return 9.5;
      case '180plus':
        return 11;
      default:
        return 9;
    }
  }

  if (answers.user === 'child') {
    switch (answers.weight) {
      case 'under25':
        return 3.5;
      case '25-40':
        return 5;
      case '40plus':
        return 6.5;
      default:
        return 4;
    }
  }

  switch (answers.weight) {
    case 'under60':
      return 6;
    case '60-90':
      return 7.5;
    case '90plus':
      return 9;
    default:
      return 7;
  }
}

function getTargetCategorySlug(answers: QuizAnswers): string {
  if (answers.user === 'child') return 'tyngdedyner-boern';
  if (answers.goal === 'focus' || answers.stress === 'often')
    return 'adhd-fokus';
  if (answers.goal === 'sleep' || answers.sleep === 'poor') return 'soevn';
  return 'tyngdedyner-voksen';
}

function extractProductWeight(product: any): number | null {
  const topLevel = parseFloat(product?.weight);
  if (!Number.isNaN(topLevel) && topLevel > 0) return topLevel;

  const weightAttr = product?.attributes?.find((a: any) =>
    ['vægt', 'vaegt', 'tyngde', 'weight', 'kg'].includes(
      a?.name?.toLowerCase?.().trim(),
    ),
  );

  if (weightAttr?.options?.length) {
    const match = String(weightAttr.options[0]).match(/[\d.,]+/);
    if (match) {
      const parsed = parseFloat(match[0].replace(',', '.'));
      if (!Number.isNaN(parsed)) return parsed;
    }
  }

  return null;
}

export function findBestMatch(
  products: any[],
  recommendation: QuizRecommendation,
) {
  if (!products?.length || recommendation.isDog) return null;

  const inCategory = products.filter((p) =>
    p.categories?.some((c: any) => c.slug === recommendation.categorySlug),
  );

  const pool = inCategory.length > 0 ? inCategory : products;

  const withWeight = pool
    .map((p) => ({ product: p, weight: extractProductWeight(p) }))
    .filter((p) => p.weight !== null);

  if (withWeight.length === 0) {
    console.warn(
      '[quiz] Koi bhi product mein weight nahi mila — sabhi products same lag rahe honge. ' +
        'Ek product ka structure check karo: console.log(products[0])',
    );
    return pool[0] ?? null;
  }

  const sorted = [...withWeight].sort(
    (a, b) =>
      Math.abs((a.weight as number) - recommendation.idealWeight) -
      Math.abs((b.weight as number) - recommendation.idealWeight),
  );

  return sorted[0].product;
}

export function findBestDogMatch(
  products: any[],
  dogSize: 'small' | 'large' | null,
) {
  if (!products?.length || !dogSize) return null;

  const inCategory = products.filter((p) =>
    p.categories?.some((c: any) => c.slug === 'doggyro'),
  );

  const pool = inCategory.length > 0 ? inCategory : products;

  const sizeMatch = pool.find((p) => {
    const sizeAttr = p.attributes?.find(
      (a: any) =>
        a.name?.toLowerCase() === 'størrelse' ||
        a.name?.toLowerCase() === 'size',
    );
    const value = sizeAttr?.options?.[0]?.toLowerCase();
    return dogSize === 'small'
      ? value?.includes('small') || value?.includes('lille')
      : value?.includes('large') || value?.includes('stor');
  });

  return sizeMatch ?? pool[0] ?? null;
}
