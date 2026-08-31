"use client";

interface Client {
  name: string;
  logo: string; // path to logo image, e.g. "/clients/acme.svg"
  url?: string;
}

interface ClientLogosProps {
  title?: string;
  clients: Client[];
}

export function ClientLogos({ title = "Clients", clients }: ClientLogosProps) {
  return (
    <section className="px-6 md:px-12 py-4 mb-16 text-white">
      <h2 className="text-2xl font-bold mb-8">{title}</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {clients.map((client, index) => {
          const content = (
            <img
              src={client.logo}
              alt={client.name}
              className="max-h-10 w-auto invert brightness-0 opacity-60 group-hover:opacity-100 hover:brightness-100 hover:invert-0 transition duration-300"
            />
          );

          return (
            <div
              key={index}
              className="group flex items-center justify-center h-20 rounded-lg bg-zinc-900 transition-colors  duration-300 px-4"
            >
              {client.url ? (
                <a
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full h-full"
                  aria-label={client.name}
                >
                  {content}
                </a>
              ) : (
                content
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
