import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emmanuel | Software Developer",
  description:
    "Emmanuel is a software developer building modern, responsive web applications and digital solutions for businesses and organizations.",
  icons: {
    icon: "/lg_white.png",
  },
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
