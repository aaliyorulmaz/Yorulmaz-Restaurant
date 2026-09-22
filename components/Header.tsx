"use client";

import { useState } from "react";

const links = [
  { href: "#hakkimizda", label: "Hakkımızda" },
  { href: "#menu", label: "Menümüz" },
  { href: "#degerlendirme", label: "Değerlendirme" },
  { href: "#iletisim", label: "İletişim" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-18 border-b border-bone/10 bg-page/85 backdrop-blur">
      <div className="wrap flex h-full items-center justify-between">

        {/* Logo: "Yorulmaz Et Restoranı" tek satırda yan yana */}
        <a href="#top" className="flex items-baseline gap-2 leading-none">
          <span className="font-display text-2xl font-bold tracking-tight">Yorulmaz</span>
          <span className="font-display text-2xl font-normal text-brass tracking-tight">Et Restoranı</span>
        </a>

        {/* Mobil menü düğmesi */}
        <button
          type="button"
          className="grid size-11 place-items-center rounded-lg md:hidden"
          aria-label="Menüyü aç veya kapat"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <svg viewBox="0 0 24 24" className="size-6 fill-none stroke-current" strokeWidth="2" strokeLinecap="round">
            <path d={open ? "M6 6l12 12M18 6L6 18" : "M4 8h16M4 16h16"} />
          </svg>
        </button>

        {/* Gezinti */}
        <nav
          className={`${open ? "flex" : "hidden"} absolute top-full right-0 left-0 flex-col items-start gap-5 border-b border-bone/10 bg-page px-5 py-6 md:static md:flex md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0`}
        >
          <ul className="flex flex-col md:flex-row md:gap-7">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-bone/75 transition-colors hover:text-bone"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#rezervasyon" onClick={() => setOpen(false)} className="btn btn-brass">
            Rezervasyon
          </a>
        </nav>
      </div>
    </header>
  );
}
