import { businessRecords } from "./businessData";
import type { BusinessRecord } from "./types";

export const getBusinesses = (): readonly BusinessRecord[] => businessRecords;

export const getPrimaryEcosystemBusinesses = (): readonly BusinessRecord[] =>
  businessRecords.filter((business) => business.isPrimaryEcosystem);

export const getBusinessBySlug = (slug: string | undefined) =>
  businessRecords.find((business) => business.slug === slug);
