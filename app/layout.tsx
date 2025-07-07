import type { Metadata } from "next";
import { Poppins} from "next/font/google";
import "./globals.css";
import Top_Bar from "@/components/global/top-bar";
import MainNav from "@/components/global/main-nav";
import { Main } from "next/document";
import BottomBar from "@/components/global/bottom-bar";
import AuthSessionProvider from "@/components/global/AuthSessionProvider";
import Breadcrumb from "@/components/Breadcrumbs/breadcrumb";


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
    <html lang="en" className={poppins.variable}>
      <AuthSessionProvider><body className="min-h-screen flex flex-col items-center">
        
          <div className="flex justify-center bg-[var(--mainBGLight)] w-full">
            <Top_Bar />
          </div>
          <MainNav />

          <div className="w-full bg-[var(--mainBGLight)] flex justify-center flex-grow">

            {children}
            
          </div>
          <BottomBar />
        
      </body></AuthSessionProvider>
    </html>
  );
}
