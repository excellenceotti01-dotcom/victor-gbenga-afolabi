import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Container({
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`
        mx-auto
        w-full
        max-w-[var(--container-width)]
        px-5
        sm:px-8
        lg:px-12
        ${className}
      `}
    >
      {children}
    </div>
  );
}
