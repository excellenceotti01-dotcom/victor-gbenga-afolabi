import Container from "../ui/Container";
import logos from "./logos";

import "./TrustedBy.css";

export default function TrustedBy() {
  return (
    <section className="trusted-by" aria-label="Trusted partnerships">
      <Container>
        <div className="trusted-by__layout">
          <div
            className="trusted-by__marquee"
            aria-label={`Trusted organizations: ${logos.join(", ")}`}
          >
            <div className="trusted-by__track" aria-hidden="true">
              {[0, 1].map((group) => (
                <div key={group} className="trusted-by__group">
                  {logos.map((logo) => (
                    <span key={`${group}-${logo}`} className="trusted-by__wordmark">
                      {logo}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

    </section>
  );
}
