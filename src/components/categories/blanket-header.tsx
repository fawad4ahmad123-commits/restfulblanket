import { RatingSummary } from './rating-summary';

export function BlanketHeader({ rating, reviewCount }: any) {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-serif">Tyngdedyner</h1>

      <p className="text-sm text-[#6B625B]">
        Oplev ægte ro med en <strong>tyngdedyne</strong> skabt til
        nervesystemet. Hvor traditionelle dyner med glas- eller plastikkugler
        ofte fanger varmen og forstyrrer søvnen med unødig støj, tilbyder vores
        varmebehandlede rapsfrø en lydløs, åndbar og kølende omfavnelse. Alle
        vores tyngdedyner er CE-mærkede som medicinsk udstyr klasse 1, lavet i
        OEKO-TEX-certificeret bomuld og kan vaskes ved 60 °C.
      </p>

      <RatingSummary rating={rating} reviewCount={reviewCount} />
    </div>
  );
}
