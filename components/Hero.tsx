import Marble from "./Marble";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[calc(100svh-4.5rem)] flex-col justify-end overflow-hidden bg-radial-[at_18%_8%] from-glow via-panel via-45% to-page py-10 sm:py-20"
    >
      <Marble />
      {/* Alt kısmı karartır, yazılar okunaklı kalsın */}
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-page/70 to-transparent to-55%" />

      <div className="wrap grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
        {/* Başlık: her satır ayrı kutuda, aşağıdan yukarı kayarak açılır */}
        <h1 className="font-display text-[clamp(3.25rem,16.5vw,15rem)] leading-[0.9] font-semibold tracking-[-0.025em] md:col-span-2">
          <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
            <span className="inline-block motion-safe:animate-rise">Yorulmaz</span>
          </span>
          <span className="mt-[0.12em] -mb-[0.14em] block overflow-hidden pb-[0.14em] text-[0.3em] leading-tight font-normal tracking-normal text-brass">
            <span className="inline-block motion-safe:animate-rise [animation-delay:140ms]">
              Et Restoranı
            </span>
          </span>
        </h1>

        <div className="motion-safe:animate-fade [animation-delay:500ms]">
          <p className="max-w-[34ch] text-lg text-bone/75 sm:text-xl">Konyaaltı’nda et restoranı.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#iletisim" className="btn btn-brass">
              Rezervasyon yap
            </a>
            <a href="#menu" className="btn btn-ghost">
              Menümüzü incele
            </a>
          </div>
        </div>

        {/* Adres köşede */}
        <address className="flex items-center gap-2.5 text-bone/75 motion-safe:animate-fade [animation-delay:500ms] md:justify-self-end">
          <svg viewBox="0 0 24 24" className="size-5 shrink-0 fill-none stroke-brass" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0113 0c0 5.4-6.5 11-6.5 11z" />
            <circle cx="12" cy="10" r="2.3" />
          </svg>
          Konyaaltı, Antalya
        </address>
      </div>
    </section>
  );
}
