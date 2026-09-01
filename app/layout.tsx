import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emmanuel | Software Developer",
  description: "Software Dev Portfolio experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${geist.className} bg-black text-white antialiased`}>
        <ClientLayout>{children}</ClientLayout>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
