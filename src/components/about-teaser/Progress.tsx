import type { FC } from "react";

type ProgressProps = {
  total: number;
  active: number;
  progress: number;

  onPause?: () => void;
  onResume?: () => void;
};

const Progress: FC<ProgressProps> = ({
  total,
  active,
  progress,
  onPause,
  onResume,
}) => {
  return (
    <div
  onMouseEnter={onPause}
  onMouseLeave={onResume}
  className="
    absolute
    bottom-10
    left-1/2
    z-30
    w-full
    max-w-350
    -translate-x-1/2
    px-8
    md:px-16
  "
>
      <div className="flex gap-4">
        {Array.from({ length: total }).map((_, index) => (
          <div
            key={index}
            className="
              h-0.5
              flex-1
              overflow-hidden
              bg-white/20
            "
          >
            <div
              className="h-full bg-white transition-[width] duration-100 ease-linear"
              style={{
                width:
                  index < active
                    ? "100%"
                    : index === active
                    ? `${progress}%`
                    : "0%",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Progress;
