type Props = {
  onClose: () => void;
};

export default function SuccessState({
  onClose,
}: Props) {
  return (
    <div
      className="
        flex
        h-full
        flex-col
        items-center
        justify-center
        text-center
      "
    >
      <div
        className="
          mb-8
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          border
          border-[var(--color-gold)]
          text-3xl
          text-[var(--color-gold)]
        "
      >
        ✓
      </div>

      <p
        className="
          mb-3
          text-sm
          uppercase
          tracking-[0.28em]
          text-[var(--color-gold)]
        "
      >
        Enquiry Sent
      </p>

      <h2
        className="
          mb-6
          font-[var(--font-heading)]
          text-5xl
          leading-none
          text-white
        "
      >
        Thank You.
      </h2>

      <p
        className="
          mb-12
          max-w-lg
          text-lg
          leading-8
          text-white/65
        "
      >
        Your enquiry has been received.
        Our team will review the details and
        get back to you shortly.
      </p>

      <button
        type="button"
        onClick={onClose}
        className="
          rounded-full
          border
          border-white/10
          px-8
          py-4
          text-sm
          text-white
          transition-all
          duration-300
          hover:border-[var(--color-gold)]
          hover:text-[var(--color-gold)]
        "
      >
        Back to Website
      </button>
    </div>
  );
}