export default function HeroVideo() {
  return (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
    >
      <source src="/videos/hero-placeholder.mp4" type="video/mp4" />
    </video>
  );
}