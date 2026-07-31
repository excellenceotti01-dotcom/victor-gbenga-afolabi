import { useOutletContext } from "react-router-dom";

import AboutHero from "@/components/about-hero/AboutHero";
import Biography from "@/components/biography/Biography";
import Library from "@/components/library/Library";

type LayoutContext = {
  scrollTo: (target: HTMLElement) => void;
};

export default function About() {
  const { scrollTo } = useOutletContext<LayoutContext>();

  return (
    <>
      <AboutHero
        onMeetVga={() => {
          const biography = document.getElementById("biography");

          if (biography) scrollTo(biography);
        }}
      />
      <Biography />
      <Library />
    </>
  );
}
