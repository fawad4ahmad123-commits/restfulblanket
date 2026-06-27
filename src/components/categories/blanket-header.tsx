import { RatingSummary } from './rating-summary';

export function BlanketHeader() {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-serif">Weighted Blankets</h1>

      <p className="max-w-3xl text-sm text-[#6B625B]">
        Experience true peace with a weighted blanket designed for the nervous
        system. Where traditional blankets with glass or plastic beads often
        trap heat and disturb sleep with unnecessary noise, our heat-treated
        rapeseed offers a silent, breathable and cooling embrace. All our
        weighted blankets are CE marked as medical devices class 1, made from
        OEKO-TEX certified cotton and can be washed at 60°C.
      </p>

      <RatingSummary rating={4.9} reviewCount={3254} />
    </div>
  );
}
