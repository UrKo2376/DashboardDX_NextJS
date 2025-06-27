import type { Metadata } from "next";
import { Poppins} from "next/font/google";
import "./globals.css";
import Top_Bar from "@/components/global/top-bar";

const poppins = Poppins({
  subsets: ['latin'],
  weight:['200', '400', '600', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Dashboad DX",
  description: "D & S Signs Ltd's work management tool",
  icons: {
    icon: [ {url: '/images/logo.png', type: 'image/png'}]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Top_Bar />
        {children}
      </body>
    </html>
  );
}
