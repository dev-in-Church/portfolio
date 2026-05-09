export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-xl w-full space-y-8">
        <h1 className="text-4xl font-black text-center">Contact Me</h1>

        <p className="text-center text-gray-400">
          Let’s build something amazing together.
        </p>

        {/* Form */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-4 bg-zinc-900 rounded-lg outline-none border border-white/10 focus:border-red-600"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-4 bg-zinc-900 rounded-lg outline-none border border-white/10 focus:border-red-600"
          />

          <textarea
            placeholder="Your Message"
            rows={5}
            className="w-full p-4 bg-zinc-900 rounded-lg outline-none border border-white/10 focus:border-red-600"
          />

          <button
            type="submit"
            className="w-full py-4 bg-red-600 rounded-lg font-bold hover:bg-red-700 transition"
          >
            Send Message
          </button>
        </form>

        {/* Optional socials */}
        <div className="text-center text-sm text-gray-500">
          Or reach me via GitHub / LinkedIn
        </div>
      </div>
    </main>
  );
}
