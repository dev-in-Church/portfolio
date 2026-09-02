"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Laugh, Home, Laptop, PhoneCall, User2 } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Projects", href: "/projects", icon: Laptop },
  { name: "Me", href: "/about", icon: User2 },
  { name: "Connect", href: "/contact", icon: PhoneCall },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu on route change / link click, and lock scroll while open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-black/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-8 py-4 text-white">
        {/* Logo */}
        <Link href="/" className="" onClick={() => setMobileOpen(false)}>
          <img src="/logo.png" alt="" className="h-10" />
        </Link>

        {/* Nav Links (desktop) */}
        <nav className="hidden md:flex gap-10 text-sm text-gray-300">
          {navLinks.map((link) => {
            // 1. Assign the component to a Capitalized variable
            const IconComponent = link.icon;

            return (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-2 hover:text-white transition-colors duration-200"
              >
                <IconComponent className="w-4 h-4" />
                {/* <span>{link.name}</span> */}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link
            href="/fn"
            aria-label="fn"
            title="fn"
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors text-primary hover:text-white duration-200"
          >
            <Laugh className="w-5 h-5 animate-bounce" />
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-200"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 pb-6 pt-2 text-gray-300">
          {navLinks.map((link) => {
            const IconComponent = link.icon;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 py-3 border-b border-white/5 text-base hover:text-white transition-colors duration-200"
              >
                {IconComponent && <IconComponent className="w-5 h-5" />}
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
