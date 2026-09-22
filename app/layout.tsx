import type { Metadata } from "next";
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource-variable/manrope";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yorulmaz Et Restoranı | Konyaaltı, Antalya",
  description:
    "Yorulmaz Et Restoranı, Konyaaltı, Antalya. Menü, rezervasyon ve misafir değerlendirmeleri.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className="scroll-pt-18 motion-safe:scroll-smooth">
      <body>
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-bone focus:px-4 focus:py-2 focus:text-ink"
        >
          İçeriğe geç
        </a>
        {children}
      </body>
    </html>
  );
}
