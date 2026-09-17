import {
  useEffect,
  useRef,
  useState,
} from "react";

import BookingForm from "./BookingForm";
import { BOOK_IMAGES } from "./bookImages";
import ModalImage from "./ModalImage";
import ModalOverlay from "./ModalOverlay";
import { services } from "./services";
import ServiceSelection from "./ServiceSelection";
import SuccessState from "./SuccessState";

import type {
  BookingFormData,
  BookingStep,
  ServiceOption,
} from "./types";

type Props = {
  open: boolean;
  onClose: () => void;
};

const initialForm = (
  service: ServiceOption
): BookingFormData => ({
  service: service.id,
  engagementType: "",
  name: "",
  email: "",
  organization: "",
  country: "",
  preferredDate: "",
  audienceSize: "",
  budget: "",
  message: "",
});

export default function BookVGAModal({
  open,
  onClose,
}: Props) {
  const [step, setStep] =
    useState<BookingStep>("services");

  const [
    selectedService,
    setSelectedService,
  ] = useState<ServiceOption | null>(
    null
  );

  const [formData, setFormData] =
    useState<BookingFormData | null>(
      null
    );

  const transitionTimer =
    useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (
        transitionTimer.current !== null
      ) {
        window.clearTimeout(
          transitionTimer.current
        );
      }
    };
  }, []);

  const currentImage =
    BOOK_IMAGES[selectedService?.id ?? "keynote"];

  const clearTransitionTimer = () => {
    if (
      transitionTimer.current !== null
    ) {
      window.clearTimeout(
        transitionTimer.current
      );

      transitionTimer.current = null;
    }
  };

  const handleClose = () => {
    clearTransitionTimer();

    setStep("services");
    setSelectedService(null);
    setFormData(null);

    onClose();
  };

  const handleServiceSelect = (
    service: ServiceOption
  ) => {
    clearTransitionTimer();

    setSelectedService(service);
    setFormData(initialForm(service));

    transitionTimer.current =
      window.setTimeout(() => {
        setStep("form");
        transitionTimer.current = null;
      }, 350);
  };

  const updateField = <
    K extends keyof BookingFormData
  >(
    field: K,
    value: BookingFormData[K]
  ) => {
    if (!formData) return;

    if (field === "service") {
      const nextService = services.find(
        (service) => service.id === value
      );

      if (!nextService) return;

      setSelectedService(nextService);
      setFormData({
        ...formData,
        service: nextService.id,
        engagementType: "",
      });
      return;
    }

    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    clearTransitionTimer();

    // TODO:
    // Connect Formspree / Resend / API

    transitionTimer.current =
      window.setTimeout(() => {
        setStep("success");
        transitionTimer.current = null;
      }, 300);
  };

  return (
    <ModalOverlay
      open={open}
      onClose={handleClose}
    >
      <div
        className="
          grid
          h-full
          min-h-0
          grid-cols-1
          grid-rows-[minmax(0,1fr)_13rem]
          lg:grid-cols-[1.2fr_.8fr]
          lg:grid-rows-1
        "
      >
        <div
          data-lenis-prevent
          className="
            flex
            min-h-0
            flex-col
            overflow-y-auto
            overscroll-contain
            p-5
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            sm:p-8
            lg:p-14
          "
        >
          {step === "services" && (
            <ServiceSelection
              onSelect={
                handleServiceSelect
              }
            />
          )}

          {step === "form" &&
            selectedService &&
            formData && (
              <div
                className="
                  flex
                  h-full
                  flex-col
                "
              >
                <div
                  className="
                    mb-6
                    rounded-3xl
                    border
                    border-[var(--color-gold)]
                    bg-white/[0.04]
                    p-5
                    lg:mb-10
                    lg:p-6
                  "
                >
                  <p
                    className="
                      mb-2
                      text-xs
                      uppercase
                      tracking-[0.24em]
                      text-[var(--color-gold)]
                    "
                  >
                    Selected Service
                  </p>

                  <h3
                    className="
                      mb-2
                      text-2xl
                      font-medium
                      text-white
                    "
                  >
                    {selectedService.title}
                  </h3>

                  <p
                    className="
                      text-white/60
                    "
                  >
                    {
                      selectedService.description
                    }
                  </p>
                </div>

                <BookingForm
                  data={formData}
                  onChange={updateField}
                  onSubmit={handleSubmit}
                />
              </div>
            )}

          {step === "success" && (
            <SuccessState
              onClose={handleClose}
            />
          )}
        </div>

        <ModalImage
          config={currentImage}
        />
      </div>
    </ModalOverlay>
  );
}
