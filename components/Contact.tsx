export default function Contact() {
  return (
    <section id="iletisim" className="bg-page py-16 sm:py-24">
      <div className="wrap">
        <h2 className="section-title">İletişim</h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Adres */}
          <div>
            <h3 className="mb-2 font-display text-xl font-semibold text-brass">Adres</h3>
            <address className="text-bone/75 not-italic">
              Konyaaltı Atatürk Bulvarı
              <br />
              Antalya
              <br />
              <a
                href="https://www.google.com/maps/search/?api=1&query=Konyaalt%C4%B1+Atat%C3%BCrk+Bulvar%C4%B1+Antalya"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-brass underline underline-offset-4 hover:text-bone"
              >
                Haritada aç
              </a>
            </address>
          </div>

          {/* Çalışma Saatleri */}
          <div>
            <h3 className="mb-2 font-display text-xl font-semibold text-brass">Çalışma Saatleri</h3>
            <p className="text-bone/75">Her gün</p>
            <p className="text-bone font-semibold">12:00 – 00:00</p>
          </div>

          {/* Telefon */}
          <div>
            <h3 className="mb-2 font-display text-xl font-semibold text-brass">Telefon</h3>
            <a
              href="tel:+905070770707"
              className="text-bone/75 hover:text-bone transition-colors"
            >
              0507 077 0707
            </a>
          </div>

          {/* Instagram */}
          <div>
            <h3 className="mb-2 font-display text-xl font-semibold text-brass">Instagram</h3>
            <a
              href="https://instagram.com/yorulmazetrestaurant"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-bone/75 hover:text-bone transition-colors"
            >
              {/* Instagram ikonu */}
              <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
              @yorulmazetrestaurant
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
