import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import ClientLayout from "@/components/ClientLayout";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emmanuel Ambundo - Full Stack Developer",
  description: "Netflix-style portfolio experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${geist.className} bg-black text-white antialiased`}>
        {/* <Navbar /> */}

        <ClientLayout>{children}</ClientLayout>
        {/* <Footer /> */}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
