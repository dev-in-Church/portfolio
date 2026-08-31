"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Laugh } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
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
        <Link
          href="/"
          className="text-red-600 font-black text-2xl tracking-widest"
          onClick={() => setMobileOpen(false)}
        >
          UNDO
        </Link>

        {/* Nav Links (desktop) */}
        <nav className="hidden md:flex gap-6 text-sm text-gray-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-white transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
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
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-3 border-b border-white/5 text-base hover:text-white transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
