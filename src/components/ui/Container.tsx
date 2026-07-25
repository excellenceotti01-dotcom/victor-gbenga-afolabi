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
        max-w-360
        px-6
        lg:px-12
        ${className}
      `}
    >
      {children}
    </div>
  );
}