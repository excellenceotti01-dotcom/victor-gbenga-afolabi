export default function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Black base */}
      <div className="absolute inset-0 bg-black" />

      {/* Gold glow */}
      <div className="absolute -left-55 top-1/2 h-175 w-175 -translate-y-1/2 rounded-full bg-[#C6A86A]/10 blur-[180px]" />

      {/* White glow */}
      <div className="absolute -right-62.5 top-[18%] h-150 w-150 rounded-full bg-white/5 blur-[200px]" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.88)_100%)]" />
    </div>
  );
}