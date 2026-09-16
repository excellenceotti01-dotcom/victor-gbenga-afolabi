import {
  useEffect,
  type ReactNode,
} from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function ModalOverlay({
  open,
  onClose,
  children,
}: Props) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-black/40
        backdrop-blur-2xl
        transition-all
        duration-500
      "
    >
      <div
        onClick={(event) =>
          event.stopPropagation()
        }
        className="
          relative
          h-[88vh]
          w-[min(1440px,92vw)]
          overflow-hidden
          rounded-[34px]
          border
          border-white/6
          bg-[#090909]
          shadow-[0_40px_120px_rgba(0,0,0,0.65)]
          animate-[bookModalEnter_.55s_cubic-bezier(.22,1,.36,1)]
        "
      >
        {children}
      </div>

      <style>{`
        @keyframes bookModalEnter {
          0% {
            opacity: 0;
            transform:
              translateY(32px)
              scale(.97);
          }

          100% {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
          }
        }
      `}</style>
    </div>
  );
}