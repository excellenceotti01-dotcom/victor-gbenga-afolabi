import Hero from "../../components/hero/Hero";
import TrustedBy from "../../components/trusted-by/TrustedBy";
import AboutTeaser from "../../components/about-teaser/AboutTeaser";
import OnTheRadar from "../../components/on-the-radar-teaser/OnTheRadar";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <AboutTeaser />
      <OnTheRadar />
    </>
  );
}
