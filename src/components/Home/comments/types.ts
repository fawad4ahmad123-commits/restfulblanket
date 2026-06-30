export interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  review: string;
  reviewer: string;
}

export interface LeftReview {
  review: Review;
  current: number;
  animating: boolean;
  direction: 'left' | 'right';
}

export interface RightReviews {
  reviews: Review[];
  current: number;
  animating: boolean;
  direction: 'left' | 'right';
  onWriteReview: () => void;
}

export interface Info {
  showModal: boolean;
  isHome: boolean;
  current: number;
  totalReviews: number;
  direction: 'left' | 'right';
  animating: boolean;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  setDirection: React.Dispatch<React.SetStateAction<'left' | 'right'>>;
  setAnimating: React.Dispatch<React.SetStateAction<boolean>>;
  setReview: React.Dispatch<React.SetStateAction<boolean>>;
}
