import { useParams } from "react-router-dom";

import { getBusinessBySlug } from "@/components/business/businessUtils";
import BusinessDetailExperience from "@/components/business/BusinessDetail";
import BusinessThemeScope from "@/components/business/BusinessThemeScope";
import NotFound from "@/pages/NotFound/NotFound";

import "./Business.css";
import "./BusinessDetail.css";

export default function BusinessDetail() {
  const { slug } = useParams();
  const business = getBusinessBySlug(slug);

  if (!business) {
    return <NotFound />;
  }

  return (
    <BusinessThemeScope theme={business.theme}>
      <BusinessDetailExperience business={business} />
    </BusinessThemeScope>
  );
}
