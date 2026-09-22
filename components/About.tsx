export default function About() {
  return (
    <section id="hakkimizda" className="bg-page py-16 sm:py-24">
      <div className="wrap grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-start md:gap-16">
        <div>
          <h2 className="section-title">Hakkımızda</h2>
          {/* Slogan */}
          <p className="mt-6 font-display text-lg italic text-brass leading-snug">
            "Toroslardan sofranıza uzanır."
            <span className="block mt-1 not-italic text-sm text-bone/50 font-body tracking-widest uppercase">
              Since 1978
            </span>
          </p>
        </div>

        <p className="text-lg text-bone/75 leading-relaxed">
          Antalya'nın eşsiz doğasıyla iç içe, etin en doğal ve lezzetli halini sunmak için
          yola çıktık. Yorulmaz Et Restoranı olarak en büyük sırrımız, coğrafyamızın sunduğu
          zenginlikte saklı. Mutfağımıza giren her et, Toros Dağları'nın tertemiz havasında
          ve doğal yaylalarında beslenen hayvanlardan özenle seçilmektedir. Bizim için yemek
          pişirmek sadece bir iş değil, doğanın sunduğu bu kaliteyi sofralarınıza taşıyan
          bir sanattır.
        </p>
      </div>
    </section>
  );
}
