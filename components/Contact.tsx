export default function Contact() {
  return (
    <section id="iletisim" className="bg-page py-16 sm:py-24">
      <div className="wrap">
        <h2 className="section-title">İletişim</h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-2 font-display text-xl font-semibold text-brass">Adres</h3>
            <address className="text-bone/75 not-italic">
              Konyaaltı Atatürk Bulvarı
              <br />
              Antalya
            </address>
          </div>

          <div>
            <h3 className="mb-2 font-display text-xl font-semibold text-brass">Çalışma Saatleri</h3>
            <p className="text-bone/75">Her gün</p>
            <p className="text-bone font-semibold">12:00 – 00:00</p>
          </div>

          <div>
            <h3 className="mb-2 font-display text-xl font-semibold text-brass">Telefon</h3>
            <a href="tel:+905070770707" className="text-bone/75 hover:text-bone transition-colors">
              0507 077 0707
            </a>
          </div>

          <div>
            <h3 className="mb-2 font-display text-xl font-semibold text-brass">Instagram</h3>
            <a 
              href="https://instagram.com/yorulmazetrestaurant"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-bone/75 hover:text-bone transition-colors"
            >
              <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
              @yorulmazetrestaurant
            </a>
          </div>
        </div>

        <div className="mt-12">
          <div className="overflow-hidden rounded-2xl border border-bone/10 shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.4!2d30.6932!3d36.8780!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c385b6a4f1b1b1%3A0x0!2sAtat%C3%BCrk+Bulvar%C4%B1%2C+Konyaalt%C4%B1%2C+Antalya!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
              className="w-full h-72 sm:h-96 border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Yorulmaz Et Restoranı Konumu"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Atat%C3%BCrk+Bulvar%C4%B1+Konyaalt%C4%B1+Antalya"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#4285F4] px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-[#2b6de8]"
            >
              <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              Google Haritalar&apos;da Görüntüle
            </a>

            <a
              href="#rezervasyon"
              className="inline-flex items-center gap-2 rounded-lg bg-brass px-5 py-2.5 text-sm font-semibold text-ink shadow transition hover:bg-bone"
            >
              <svg className="size-5 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              Rezervasyon Yap
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}