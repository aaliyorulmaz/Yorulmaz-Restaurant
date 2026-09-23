"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

type FormState = {
  name: string;
  date: string;
  time: string;
  notes: string;
  adult: number;
  child: number;
  baby: number;
};

const EMPTY_FORM: FormState = {
  name: "",
  date: "",
  time: "",
  notes: "",
  adult: 1,
  child: 0,
  baby: 0,
};

export default function Reservation() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<Status>("idle");

  function handleTextChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: Number(value) }));
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
  const totalGuests = form.adult + form.child + form.baby;

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
              <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              Google Haritalar&apos;da Konumumuzu Görün
            </a>
            <div className="mt-4">
              <button className="btn btn-brass" onClick={() => setForm(EMPTY_FORM)}>
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
          <svg className="size-4 shrink-0 text-[#4285F4]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          Konyaaltı Atatürk Bulvarı, Antalya
        </p>
        <p className="mt-3 text-bone/75">Bilgilerinizi girin, sizi arayarak konfirme edelim.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* İsim */}
          <div>
            <label htmlFor="res-name" className="mb-1.5 block text-sm font-semibold">
              İsim Soyisim <span className="text-brass">*</span>
            </label>
            <input
              id="res-name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleTextChange}
              placeholder="Adınız Soyadınız"
              className="w-full rounded-lg border border-bone/20 bg-page px-4 py-3 text-bone placeholder:text-bone/40 focus-visible:border-brass focus-visible:outline-none"
            />
          </div>

          {/* Kişi sayısı */}
          <div>
            <p className="mb-2 text-sm font-semibold">
              Kişi Sayısı{" "}
              {totalGuests > 0 && (
                <span className="font-normal text-bone/50">({totalGuests} kişi)</span>
              )}
            </p>
            <div className="grid grid-cols-3 gap-3">
              {(["adult", "child", "baby"] as const).map((type) => {
                const labels: Record<typeof type, string> = {
                  adult: "Yetişkin",
                  child: "Çocuk",
                  baby: "Bebek",
                };
                const max = type === "adult" ? 20 : 10;
                return (
                  <div key={type}>
                    <label htmlFor={`res-${type}`} className="mb-1 block text-xs text-bone/60">
                      {labels[type]}
                    </label>
                    <select
                      id={`res-${type}`}
                      name={type}
                      value={form[type]}
                      onChange={handleSelectChange}
                      className="w-full rounded-lg border border-bone/20 bg-page px-3 py-3 text-bone focus-visible:border-brass focus-visible:outline-none"
                    >
                      {Array.from({ length: max + 1 }, (_, i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tarih + Saat */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="res-date" className="mb-1.5 block text-sm font-semibold">
                Tarih <span className="text-brass">*</span>
              </label>
              <input
                id="res-date"
                name="date"
                type="date"
                required
                min={today}
                value={form.date}
                onChange={handleTextChange}
                className="w-full rounded-lg border border-bone/20 bg-page px-4 py-3 text-bone focus-visible:border-brass focus-visible:outline-none"
              />
            </div>
            <div>
              <label htmlFor="res-time" className="mb-1.5 block text-sm font-semibold">
                Saat <span className="text-brass">*</span>
              </label>
              <input
                id="res-time"
                name="time"
                type="time"
                required
                min="12:00"
                max="23:30"
                value={form.time}
                onChange={handleTextChange}
                className="w-full rounded-lg border border-bone/20 bg-page px-4 py-3 text-bone focus-visible:border-brass focus-visible:outline-none"
              />
            </div>
          </div>

          {/* Notlar */}
          <div>
            <label htmlFor="res-notes" className="mb-1.5 block text-sm font-semibold">
              Özel İstekler / Notlar
            </label>
            <textarea
              id="res-notes"
              name="notes"
              rows={4}
              value={form.notes}
              onChange={handleTextChange}
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