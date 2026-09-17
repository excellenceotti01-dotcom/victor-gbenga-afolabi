import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  CalendarDays,
  Check,
  ChevronDown,
} from "lucide-react";

import { services } from "./services";

import type {
  BookingFormData,
  ServiceId,
} from "./types";

type Props = {
  data: BookingFormData;
  onChange: (
    field: keyof BookingFormData,
    value: string
  ) => void;
  onSubmit: () => void;
};

export default function BookingForm({
  data,
  onChange,
  onSubmit,
}: Props) {
  const engagementTypes = useMemo(() => {
    return (
      services.find(
        (service) => service.id === data.service
      )?.engagementTypes ?? []
    );
  }, [data.service]);

  return (
    <form
      className="flex h-full flex-col"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field label="Name">
          <Input
            value={data.name}
            onChange={(value) => onChange("name", value)}
          />
        </Field>

        <Field label="Email">
          <Input
            type="email"
            value={data.email}
            onChange={(value) => onChange("email", value)}
          />
        </Field>

        <Field label="Organization">
          <Input
            value={data.organization}
            onChange={(value) => onChange("organization", value)}
          />
        </Field>

        <Field label="Country">
          <Input
            value={data.country}
            onChange={(value) => onChange("country", value)}
          />
        </Field>

        <Field label="Service">
          <Select
            value={data.service}
            onChange={(value) => onChange("service", value as ServiceId)}
            options={services.map((service) => ({
              value: service.id,
              label: service.title,
            }))}
          />
        </Field>

        <Field label="Engagement Type">
          <Select
            value={data.engagementType}
            onChange={(value) => onChange("engagementType", value)}
            placeholder="Select..."
            options={engagementTypes.map((type) => ({
              value: type,
              label: type,
            }))}
          />
        </Field>

        <Field label="Preferred Date">
          <Input
            type="date"
            value={data.preferredDate}
            onChange={(value) => onChange("preferredDate", value)}
          />
        </Field>

        <Field label="Estimated Audience">
          <Input
            value={data.audienceSize}
            onChange={(value) => onChange("audienceSize", value)}
          />
        </Field>

        <Field label="Budget">
          <Input
            value={data.budget}
            onChange={(value) => onChange("budget", value)}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Message">
          <textarea
            rows={6}
            value={data.message}
            onChange={(event) => onChange("message", event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white outline-none transition-colors duration-300 focus:border-[var(--color-gold)]"
          />
        </Field>
      </div>

      <button
        type="submit"
        className="mt-8 self-start rounded-full bg-[var(--color-gold)] px-8 py-4 text-sm font-medium text-black transition-all duration-300 hover:scale-[1.02]"
      >
        Send Enquiry
      </button>
    </form>
  );
}

type FieldProps = {
  label: string;
  children: React.ReactNode;
};

function Field({ label, children }: FieldProps) {
  return (
    <label className="flex flex-col gap-3">
      <span className="text-sm text-white/60">{label}</span>
      {children}
    </label>
  );
}

type InputProps = {
  value: string;
  type?: string;
  onChange: (value: string) => void;
};

function Input({ value, type = "text", onChange }: InputProps) {
  const isDate = type === "date";

  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white outline-none transition-colors duration-300 focus:border-[var(--color-gold)] ${
          isDate
            ? "pr-14 [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-4 [&::-webkit-calendar-picker-indicator]:h-6 [&::-webkit-calendar-picker-indicator]:w-6 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
            : ""
        }`}
      />

      {isDate && (
        <CalendarDays
          aria-hidden="true"
          className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/65"
          strokeWidth={1.6}
        />
      )}
    </div>
  );
}

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  value: string;
  options: SelectOption[];
  placeholder?: string;
  onChange: (value: string) => void;
};

function Select({
  value,
  options,
  placeholder = "Select...",
  onChange,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleEscape, true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape, true);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((current) => !current)}
        className={`flex w-full items-center justify-between rounded-2xl border bg-white/[0.04] py-4 pl-5 pr-5 text-left outline-none transition-colors duration-300 ${
          open ? "border-[var(--color-gold)]" : "border-white/10"
        }`}
      >
        <span className={selectedOption ? "text-white" : "text-white/45"}>
          {selectedOption?.label ?? placeholder}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={`ml-4 h-5 w-5 shrink-0 text-white/65 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          strokeWidth={1.6}
        />
      </button>

      {open && (
        <div
          id={listboxId}
          role="listbox"
          className="absolute left-0 top-[calc(100%+.4rem)] z-[80] max-h-64 w-full overflow-y-auto rounded-2xl border border-white/12 bg-[#111111] p-1.5 shadow-[0_18px_55px_rgba(0,0,0,.55)] backdrop-blur-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {options.map((option) => {
            const selected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition-colors ${
                  selected
                    ? "bg-[var(--color-gold)]/14 text-[var(--color-gold)]"
                    : "text-white/75 hover:bg-white/[0.07] hover:text-white"
                }`}
              >
                <span>{option.label}</span>
                {selected && (
                  <Check
                    aria-hidden="true"
                    className="h-4 w-4"
                    strokeWidth={1.8}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
