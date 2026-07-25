export default function HeroOverlay() {
  return (
    <>
      {/* Main dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Bottom vignette */}
      <div className="absolute inset-x-0 bottom-0 h-[35%] bg-linear-to-t from-black via-black/50 to-transparent" />

      {/* Top fade */}
      <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black/60 to-transparent" />
    </>
  );
}