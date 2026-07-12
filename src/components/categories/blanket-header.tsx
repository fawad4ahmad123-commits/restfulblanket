import { RatingSummary } from './rating-summary';

export function BlanketHeader({ description, name, rating, reviewCount }: any) {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-serif">{name}</h1>

      <p className="text-sm text-[#6B625B]">{description}</p>

      <RatingSummary rating={rating} reviewCount={reviewCount} />
    </div>
  );
}
