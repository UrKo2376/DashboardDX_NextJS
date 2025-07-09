import { Metadata } from "next";
import AccountClient from "./my-account";

export const metadata: Metadata = {
  title: "My Account | Dashboard DX",
  description: "View your license, users, and account details",
  icons: {
    icon: [{ url: "/images/logo.png", type: "image/png" }],
  },
};

export default function AccountPage() {
  return <AccountClient />;
}
