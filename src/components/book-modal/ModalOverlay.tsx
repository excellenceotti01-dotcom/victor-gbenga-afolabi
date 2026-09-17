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
    const previousHtmlOverflow =
      document.documentElement.style.overflow;
    const previousOverscroll =
      document.body.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    window.dispatchEvent(
      new CustomEvent("book-modal-scroll-lock", {
        detail: { locked: true },
      })
    );

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
      document.documentElement.style.overflow =
        previousHtmlOverflow;
      document.body.style.overscrollBehavior =
        previousOverscroll;
      window.dispatchEvent(
        new CustomEvent("book-modal-scroll-lock", {
          detail: { locked: false },
        })
      );

      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
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
          h-[94dvh]
          w-[94vw]
          overflow-hidden
          rounded-3xl
          border
          border-white/6
          bg-[#090909]
          shadow-[0_40px_120px_rgba(0,0,0,0.65)]
          animate-[bookModalEnter_.55s_cubic-bezier(.22,1,.36,1)]
          sm:h-[90dvh]
          sm:w-[92vw]
          lg:h-[88vh]
          lg:w-[min(1440px,92vw)]
          lg:rounded-[34px]
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
