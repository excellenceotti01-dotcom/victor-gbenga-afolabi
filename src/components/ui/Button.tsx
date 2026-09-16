import { Link } from "react-router-dom";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;

  to?: string;
  onClick?: () => void;

  type?: "button" | "submit";
};

export default function Button({
  children,
  className,
  to,
  onClick,
  type = "button",
}: ButtonProps) {
  const classes = clsx(
    "inline-flex items-center justify-center rounded-full bg-(--color-gold) px-6 py-3 text-sm font-medium tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-(--color-gold-hover) focus-visible:outline-none",
    className
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
}
