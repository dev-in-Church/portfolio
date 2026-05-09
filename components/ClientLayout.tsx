"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const hasStarted = sessionStorage.getItem("started");

    if (hasStarted) {
      setStarted(true);
    }

    setReady(true);
  }, []);

  if (!ready) return null;

  // 🟢 Gate screen mode
  if (!started) {
    return <>{children}</>;
  }

  // 🔵 App mode
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
