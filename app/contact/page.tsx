"use client";

import { useState } from "react";
import { Mail, Phone, Send, Linkedin } from "lucide-react";
import { SiGithub, SiInstagram } from "react-icons/si";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const contacts = [
    {
      name: "Email",
      Icon: Mail,
      href: "mailto:undo19727@gmail.com",
      label: "undo19727@gmail.com",
    },
    {
      name: "Phone",
      Icon: Phone,
      href: "tel:+254795198141",
      label: "+254 795 198 141",
    },
    {
      name: "GitHub",
      Icon: SiGithub,
      href: "https://github.com/dev-in-Church",
      label: "UNDO",
    },
    {
      name: "LinkedIn",
      Icon: Linkedin,
      href: "https://www.linkedin.com/in/emmanuel-ambundo-b0130535b/",
      label: "Emmanuel Ambundo",
    },
    {
      name: "Instagram",
      Icon: SiInstagram,
      href: "https://instagram.com/emmanuel_sporttechies",
      label: "@emmanuel_sporttechies",
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      // TODO: point this at your actual email-sending endpoint
      // (e.g. an API route using Resend, SendGrid, or EmailJS)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="relative min-h-screen bg-black text-white px-6 md:px-12 py-20 md:py-28 overflow-hidden">
      {/* Background grid pattern, fading toward the edges */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 85%)",
        }}
      />

      {/* Soft accent glow */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-red-600/20 blur-[120px]"
        aria-hidden
      />

      <div className="relative max-w-4xl mx-auto">
        <h1 className="text-3xl font-black leading-tight">Get in touch</h1>
        <p className="mt-2 text-gray-400 max-w-[60ch]">
          Have a project in mind or just want to say hi? Reach out directly or
          send a message below.
        </p>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-14">
          {/* Contact info + socials */}
          <div className="space-y-3">
            {contacts.map(({ name, Icon, href, label }) => (
              <a
                key={name}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={
                  href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="group flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-white/5 hover:border-white/20 transition-colors duration-300"
              >
                <span className="flex items-center justify-center w-9 h-9 bg-white/10 rounded-full shrink-0">
                  <Icon size={16} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-gray-500">{name}</span>
                  <span className="block text-sm truncate group-hover:text-red-500 transition-colors duration-300">
                    {label}
                  </span>
                </span>
              </a>
            ))}
          </div>

          {/* Email form */}
          <form
            onSubmit={handleSubmit}
            className="p-6 rounded-xl bg-zinc-900 border border-white/5 space-y-5"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm text-gray-400 mb-1"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-red-500/60 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-400 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-red-500/60 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm text-gray-400 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="What's on your mind?"
                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-red-500/60 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 disabled:opacity-60 disabled:cursor-not-allowed rounded-lg font-bold transition-colors"
            >
              <Send size={16} />
              {status === "sending" ? "Sending..." : "Send message"}
            </button>

            {status === "sent" && (
              <p className="text-sm text-green-500 text-center">
                Thanks! Your message has been sent.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-500 text-center">
                Something went wrong. Please try again or email me directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
