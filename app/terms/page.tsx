import { Metadata } from "next";
import TermsAndConditions from "./terms";

export const metadata: Metadata = {
  title: "Terms & Conditions | Dashboard DX",
  description: "DashboardDX Terms & Conditions",
  icons: {
    icon: [{ url: "/images/logo.png", type: "image/png" }],
  },
};

export default function Terms() {
  return (
        <TermsAndConditions />
      );
}