import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Dashboard DX",
  description: "Contact D & S Signs regarding your DasboardDX account or enquire about registering for an account here.",
  icons: {
    icon: [{ url: "/images/logo.png", type: "image/png" }],
  },
};

export default function About() {
  return (
        <div>
          <h1>Contact Us</h1>
        </div>
      );
}