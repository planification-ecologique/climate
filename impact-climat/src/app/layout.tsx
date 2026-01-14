import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Impact Climat - Projections climatiques France",
  description:
    "Portail français de référence pour accéder aux projections climatiques régionalisées. Visualisez les scénarios climatiques pour la France et anticipez les impacts du changement climatique.",
  keywords: [
    "climat",
    "changement climatique",
    "projections climatiques",
    "France",
    "Impact Climat",
    "Météo-France",
    "RCP",
    "adaptation",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" data-fr-scheme="light">
      <head>
        {/* DSFR CSS from CDN */}
        <link 
          rel="stylesheet" 
          href="https://unpkg.com/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css"
        />
        <link 
          rel="stylesheet" 
          href="https://unpkg.com/@gouvfr/dsfr@1.11.2/dist/utility/icons/icons.min.css"
        />
        {/* MapLibre GL CSS */}
        <link 
          rel="stylesheet" 
          href="https://unpkg.com/maplibre-gl@4.0.0/dist/maplibre-gl.css"
        />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" type="image/x-icon" />
      </head>
      <body style={{ margin: 0, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div className="fr-app" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Header />
          <main 
            role="main" 
            id="main-content"
            style={{ display: "flex", flexDirection: "column", flex: 1 }}
          >
            {children}
          </main>
          <Footer />
        </div>
        {/* DSFR JS from CDN */}
        <script 
          type="module" 
          src="https://unpkg.com/@gouvfr/dsfr@1.11.2/dist/dsfr.module.min.js"
          defer
        />
      </body>
    </html>
  );
}
