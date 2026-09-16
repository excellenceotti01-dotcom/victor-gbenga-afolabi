export type ServiceId =
  | "keynote"
  | "consulting"
  | "workshops"
  | "media";

export type BookingStep =
  | "services"
  | "form"
  | "success";

export type ServiceOption = {
  id: ServiceId;
  icon: string;
  title: string;
  description: string;
  engagementTypes: string[];
};

export type BookingFormData = {
  service: ServiceId;
  engagementType: string;
  name: string;
  email: string;
  organization: string;
  country: string;
  preferredDate: string;
  audienceSize: string;
  budget: string;
  message: string;
};