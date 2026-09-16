import heroVideo from "@/assets/videos/hero-placeholder.mp4";

export default function HeroVideo() {
  return (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    >
      <source src={heroVideo} type="video/mp4" />
    </video>
  );
}
