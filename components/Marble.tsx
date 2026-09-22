// Hero arka planındaki et lifi / mermerleşme dokusu.
// Fotoğraf değil, tarayıcının ürettiği gürültü (feTurbulence).
// Yoğunluğu en alttaki iki <rect>'in opacity değerinden ayarlayabilirsin.
export default function Marble() {
  return (
    <svg className="pointer-events-none absolute inset-0 -z-20 h-full w-full" aria-hidden="true">
      <defs>
        {/* İnce damarlar */}
        <filter id="damar" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.0022 0.028" numOctaves="4" seed="11" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.94  0 0 0 0 0.9  0 0 0 0 0.84  1 0 0 0 0" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0 0 0 0 0 0 0 0 0.35 1 0.35 0 0 0 0 0 0 0 0 0" />
          </feComponentTransfer>
        </filter>

        {/* Kalın yağ lekeleri */}
        <filter id="yag" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.0012 0.009" numOctaves="3" seed="4" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.94  0 0 0 0 0.86  0 0 0 0 0.78  1 0 0 0 0" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0 0 0 0 0.3 0.8 1 0.8 0.3 0 0 0 0 0 0 0 0 0 0 0" />
          </feComponentTransfer>
        </filter>
      </defs>

      <rect width="100%" height="100%" filter="url(#yag)" opacity="0.08" />
      <rect width="100%" height="100%" filter="url(#damar)" opacity="0.17" />
    </svg>
  );
}
