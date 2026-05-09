export function Footer() {
  return (
    <footer className="bg-black text-gray-500 text-sm py-10 px-8 border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
        <p>© {new Date().getFullYear()} Emmanuel Ambundo</p>

        <div className="flex gap-6">
          <a className="hover:text-white transition" href="#">
            GitHub
          </a>
          <a className="hover:text-white transition" href="#">
            LinkedIn
          </a>
          <a className="hover:text-white transition" href="#">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
