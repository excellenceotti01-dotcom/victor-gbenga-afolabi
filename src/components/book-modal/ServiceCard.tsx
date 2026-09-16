import clsx from "clsx";

import type { ServiceOption } from "./types";

type Props = {
  service: ServiceOption;
  selected: boolean;
  disabled?: boolean;
  onClick: (service: ServiceOption) => void;
};

export default function ServiceCard({
  service,
  selected,
  disabled = false,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onClick(service)}
      className={clsx(
        `
          group
          relative
          flex
          w-full
          flex-col
          rounded-[28px]
          border
          border-white/10
          bg-white/[0.03]
          p-7
          text-left
          transition-all
          duration-500
          ease-out
        `,
        !disabled &&
          `
            hover:-translate-y-1
            hover:border-white/25
            hover:bg-white/[0.05]
          `,
        selected &&
          `
            border-[var(--color-gold)]
            bg-white/[0.06]
          `
      )}
    >
      <span
        className="
          mb-6
          text-3xl
        "
      >
        {service.icon}
      </span>

      <h3
        className="
          mb-3
          text-2xl
          font-medium
          leading-tight
          text-white
        "
      >
        {service.title}
      </h3>

      <p
        className="
          text-sm
          leading-7
          text-white/65
        "
      >
        {service.description}
      </p>

      <div
        className={clsx(
          `
            absolute
            inset-0
            rounded-[28px]
            ring-1
            ring-transparent
            transition-all
            duration-500
          `,
          selected &&
            "ring-[var(--color-gold)]/30"
        )}
      />
    </button>
  );
}
