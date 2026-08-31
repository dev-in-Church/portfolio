"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NetflixIntro } from "@/components/NetflixIntro";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [started, setStarted] = useState<boolean | null>(null);

  useEffect(() => {
    const hasStarted = sessionStorage.getItem("started");
    setStarted(hasStarted === "true");
  }, []);

  // Wait until sessionStorage has been checked
  if (started === null) {
    return null;
  }

  const handleIntroFinish = () => {
    sessionStorage.setItem("started", "true");
    setStarted(true);
  };

  // Intro / gate mode
  if (!started) {
    return <NetflixIntro onFinish={handleIntroFinish} />;
  }

  // Main portfolio mode
  return (
    <>
      <Navbar />

      <main>{children}</main>

      <Footer />
    </>
  );
}
