import { Link } from "react-router-dom";
import clsx from "clsx";

type ButtonProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
};

export default function Button({
  to,
  children,
  className,
}: ButtonProps) {
  return (
    <Link
      to={to}
      className={clsx(
        "rounded-full bg-[#C6A86A] px-6 py-3 text-sm font-medium tracking-wide text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D8BA7A]",
        className
      )}
    >
      {children}
    </Link>
  );
}