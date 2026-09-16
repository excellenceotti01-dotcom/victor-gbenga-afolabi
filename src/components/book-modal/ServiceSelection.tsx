import { useState } from "react";

import ServiceCard from "./ServiceCard";

import { services } from "./services";

import type { ServiceOption } from "./types";

type Props = {
  onSelect: (service: ServiceOption) => void;
};

export default function ServiceSelection({
  onSelect,
}: Props) {
  const [selectedId, setSelectedId] =
    useState<ServiceOption["id"] | null>(null);

  const handleSelect = (
    service: ServiceOption
  ) => {
    setSelectedId(service.id);

    // Allow the selected card to visually
    // settle before the parent changes step.
    window.setTimeout(() => {
      onSelect(service);
    }, 450);
  };

  return (
    <div
      className="
        flex
        h-full
        flex-col
      "
    >
      <div
        className="
          mb-14
          max-w-2xl
        "
      >
        <p
          className="
            mb-4
            text-sm
            uppercase
            tracking-[0.28em]
            text-[var(--color-gold)]
          "
        >
          Book VGA
        </p>

        <h2
          className="
            mb-6
            font-[var(--font-heading)]
            text-5xl
            leading-[1]
            text-white
          "
        >
          Let's Build Something
          <br />
          Meaningful.
        </h2>

        <p
          className="
            max-w-xl
            text-lg
            leading-8
            text-white/65
          "
        >
          Whether you're planning a keynote,
          strategic engagement, workshop or
          media appearance, begin by choosing
          the service that best matches your
          enquiry.
        </p>
      </div>

      <div
        className="
          grid
          flex-1
          grid-cols-2
          gap-6
        "
      >
        {services.map((service) => {
          const hasSelection =
            selectedId !== null;

          const isSelected =
            selectedId === service.id;

          return (
            <div
              key={service.id}
              className={`
                transition-all
                duration-500
                ease-out

                ${
                  hasSelection &&
                  !isSelected
                    ? "scale-95 opacity-0 pointer-events-none"
                    : "opacity-100"
                }
              `}
            >
              <ServiceCard
                service={service}
                selected={isSelected}
                disabled={
                  hasSelection &&
                  !isSelected
                }
                onClick={handleSelect}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}