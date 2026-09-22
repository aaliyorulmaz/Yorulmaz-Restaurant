"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function Reservation() {
  const [form, setForm] = useState({ name: "", date: "", time: "", notes: "" });
  const [status, setStatus] = useState<Status>("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  const today = new Date().toISOString().split("T")[0];

  if (status === "sent") {
    return (
      <section id="rezervasyon" className="bg-panel py-16 sm:py-24">
        <div className="wrap max-w-xl">
          <h2 className="section-title">Rezervasyon</h2>
          <div className="mt-8 rounded-2xl border border-brass/30 bg-page p-8 text-center">
            <p className="text-4xl">🎉</p>
            <p className="mt-4 text-xl font-semibold text-brass">Rezervasyonunuz alındı!</p>
            <p className="mt-2 text-bone/75">
              <strong className="text-bone">Konyaaltı Atatürk Bulvarı</strong> şubemiz için
              rezervasyon talebiniz başarıyla oluşturuldu.
              <br />
              En kısa sürede sizi arayarak konfirme edeceğiz.
            </p>
            
              href="https://www.google.com/maps/search/?api=1&query=Atat%C3%BCrk+Bulvar%C4%B1+Konyaalt%C4%B1+Antalya"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#4285F4] px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-[#2b6de8]"
            >
              <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              Google Haritalar'da Konumumuzu Görün
            </a>
            <div className="mt-4">
              <button
                className="btn btn-brass"
                onClick={() => { setStatus("idle"); setForm({ name: "", date: "", time: "", notes: "" }); }}
              >
                Yeni Rezervasyon
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rezervasyon" className="bg-panel py-16 sm:py-24">
      <div className="wrap max-w-xl">
        <h2 className="section-title">Rezervasyon</h2>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-bone/60">
          <svg className="size-4 shrink-0 text-[#4285F4]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          Konyaaltı Atatürk Bulvarı, Antalya
        </p>
        <p className="mt-3 text-bone/75">Bilgilerinizi girin, sizi arayarak konfirme edelim.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-semibold">
              İsim Soyisim <span className="text-brass">*</span>
            </label>
            <input
              id="name" name="name" type="text" required
              value={form.name} onChange={handleChange}
              placeholder="Adınız Soyadınız"
              className="w-full rounded-lg border border-bone/20 bg-page px-4 py-3 text-bone placeholder:text-bone/40 focus-visible:border-brass focus-visible:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="mb-1.5 block text-sm font-semibold">
                Tarih <span className="text-brass">*</span>
              </label>
              <input
                id="date" name="date" type="date" required
                min={today} value={form.date} onChange={handleChange}
                className="w-full rounded-lg border border-bone/20 bg-page px-4 py-3 text-bone focus-visible:border-brass focus-visible:outline-none"
              />
            </div>
            <div>
              <label htmlFor="time" className="mb-1.5 block text-sm font-semibold">
                Saat <span className="text-brass">*</span>
              </label>
              <input
                id="time" name="time" type="time" required
                min="12:00" max="23:30"
                value={form.time} onChange={handleChange}
                className="w-full rounded-lg border border-bone/20 bg-page px-4 py-3 text-bone focus-visible:border-brass focus-visible:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="mb-1.5 block text-sm font-semibold">
              Özel İstekler / Notlar
            </label>
            <textarea
              id="notes" name="notes" rows={4}
              value={form.notes} onChange={handleChange}
              placeholder="Doğum günü, alerji, özel istek..."
              className="w-full resize-y rounded-lg border border-bone/20 bg-page px-4 py-3 text-bone placeholder:text-bone/40 focus-visible:border-brass focus-visible:outline-none"
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn btn-brass disabled:opacity-60"
            >
              {status === "sending" ? "Gönderiliyor…" : "Rezervasyon Yap"}
            </button>
            {status === "error" && (
              <p className="text-sm text-danger">Bir hata oluştu, tekrar deneyin.</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}