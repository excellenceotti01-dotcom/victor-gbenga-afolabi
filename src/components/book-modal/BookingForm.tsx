import { useMemo } from "react";

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
        (service) =>
          service.id === data.service
      )?.engagementTypes ?? []
    );
  }, [data.service]);

  return (
    <form
      className="
        flex
        h-full
        flex-col
      "
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div
        className="
          grid
          grid-cols-2
          gap-5
        "
      >
        <Field
          label="Name"
        >
          <Input
            value={data.name}
            onChange={(value) =>
              onChange("name", value)
            }
          />
        </Field>

        <Field
          label="Email"
        >
          <Input
            type="email"
            value={data.email}
            onChange={(value) =>
              onChange("email", value)
            }
          />
        </Field>

        <Field
          label="Organization"
        >
          <Input
            value={data.organization}
            onChange={(value) =>
              onChange(
                "organization",
                value
              )
            }
          />
        </Field>

        <Field
          label="Country"
        >
          <Input
            value={data.country}
            onChange={(value) =>
              onChange(
                "country",
                value
              )
            }
          />
        </Field>

        <Field
          label="Service"
        >
          <Select
            value={data.service}
            onChange={(value) =>
              onChange(
                "service",
                value as ServiceId
              )
            }
          >
            {services.map((service) => (
              <option
                key={service.id}
                value={service.id}
              >
                {service.title}
              </option>
            ))}
          </Select>
        </Field>

        <Field
          label="Engagement Type"
        >
          <Select
            value={
              data.engagementType
            }
            onChange={(value) =>
              onChange(
                "engagementType",
                value
              )
            }
          >
            <option value="">
              Select...
            </option>

            {engagementTypes.map(
              (type) => (
                <option
                  key={type}
                  value={type}
                >
                  {type}
                </option>
              )
            )}
          </Select>
        </Field>

        <Field
          label="Preferred Date"
        >
          <Input
            type="date"
            value={
              data.preferredDate
            }
            onChange={(value) =>
              onChange(
                "preferredDate",
                value
              )
            }
          />
        </Field>

        <Field
          label="Estimated Audience"
        >
          <Input
            value={
              data.audienceSize
            }
            onChange={(value) =>
              onChange(
                "audienceSize",
                value
              )
            }
          />
        </Field>

        <Field
          label="Budget"
        >
          <Input
            value={data.budget}
            onChange={(value) =>
              onChange(
                "budget",
                value
              )
            }
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field
          label="Message"
        >
          <textarea
            rows={6}
            value={data.message}
            onChange={(event) =>
              onChange(
                "message",
                event.target.value
              )
            }
            className="
              w-full
              rounded-2xl
              border
              border-white/10
              bg-white/[0.04]
              px-5
              py-4
              text-white
              outline-none
              transition-colors
              duration-300
              focus:border-[var(--color-gold)]
            "
          />
        </Field>
      </div>

      <button
        type="submit"
        className="
          mt-auto
          self-start
          rounded-full
          bg-[var(--color-gold)]
          px-8
          py-4
          text-sm
          font-medium
          text-black
          transition-all
          duration-300
          hover:scale-[1.02]
        "
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

function Field({
  label,
  children,
}: FieldProps) {
  return (
    <label
      className="
        flex
        flex-col
        gap-3
      "
    >
      <span
        className="
          text-sm
          text-white/60
        "
      >
        {label}
      </span>

      {children}
    </label>
  );
}

type InputProps = {
  value: string;
  type?: string;
  onChange: (
    value: string
  ) => void;
};

function Input({
  value,
  type = "text",
  onChange,
}: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(event) =>
        onChange(
          event.target.value
        )
      }
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/[0.04]
        px-5
        py-4
        text-white
        outline-none
        transition-colors
        duration-300
        focus:border-[var(--color-gold)]
      "
    />
  );
}

type SelectProps = {
  value: string;
  children: React.ReactNode;
  onChange: (
    value: string
  ) => void;
};

function Select({
  value,
  children,
  onChange,
}: SelectProps) {
  return (
    <select
      value={value}
      onChange={(event) =>
        onChange(
          event.target.value
        )
      }
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/[0.04]
        px-5
        py-4
        text-white
        outline-none
        transition-colors
        duration-300
        focus:border-[var(--color-gold)]
      "
    >
      {children}
    </select>
  );
}