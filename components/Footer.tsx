import Link from "next/link";
import { Mail, Linkedin } from "lucide-react";
import { SiGithub, SiInstagram } from "react-icons/si";

const socials = [
  { name: "GitHub", Icon: SiGithub, href: "https://github.com/dev-in-Church" },
  {
    name: "LinkedIn",
    Icon: Linkedin,
    href: "https://www.linkedin.com/in/emmanuel-ambundo-b0130535b/",
  },
  {
    name: "Instagram",
    Icon: SiInstagram,
    href: "https://www.instagram.com/emmanuel_sporttechies",
  },
  { name: "Email", Icon: Mail, href: "mailto:undo19727@gmail.com" },
];

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-black text-gray-500 text-sm border-t border-white/10">
      <div className="max-w-6xl mx-auto px-8 py-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        {/* Identity */}
        <div>
          <p className="px-8 py-5 text-xs text-gray-600">
            © {new Date().getFullYear()} Emmanuel Ambundo. All rights reserved.
          </p>
        </div>

        {/* Nav links */}
        <nav className="flex gap-6">
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

        {/* Social icons */}
        <div className="flex gap-3">
          {socials.map(({ name, Icon, href }) => (
            <a
              key={name}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={name}
              title={name}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-colors duration-200"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
