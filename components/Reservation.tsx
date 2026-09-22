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

  // Bugünün tarihi (min değeri için)
  const today = new Date().toISOString().split("T")[0];

  if (status === "sent") {
    return (
      <section id="rezervasyon" className="bg-panel py-16 sm:py-24">
        <div className="wrap max-w-xl">
          <h2 className="section-title">Rezervasyon</h2>
          <div className="mt-8 rounded-2xl border border-brass/30 bg-page p-8 text-center">
            <p className="text-3xl">🎉</p>
            <p className="mt-4 text-xl font-semibold text-brass">Rezervasyon talebiniz alındı!</p>
            <p className="mt-2 text-bone/75">
              En kısa sürede sizi arayarak konfirme edeceğiz.
            </p>
            <button
              className="btn btn-brass mt-6"
              onClick={() => { setStatus("idle"); setForm({ name: "", date: "", time: "", notes: "" }); }}
            >
              Yeni rezervasyon
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rezervasyon" className="bg-panel py-16 sm:py-24">
      <div className="wrap max-w-xl">
        <h2 className="section-title">Rezervasyon</h2>
        <p className="mt-4 text-bone/75">
          Tarihinizi ve bilgilerinizi girin, sizi arayarak konfirme edelim.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* İsim Soyisim */}
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-semibold">
              İsim Soyisim <span className="text-brass">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Adınız Soyadınız"
              className="w-full rounded-lg border border-bone/20 bg-page px-4 py-3 text-bone placeholder:text-bone/40 focus-visible:border-brass focus-visible:outline-none"
            />
          </div>

          {/* Tarih + Saat yan yana */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="mb-1.5 block text-sm font-semibold">
                Tarih <span className="text-brass">*</span>
              </label>
              <input
                id="date"
                name="date"
                type="date"
                required
                min={today}
                value={form.date}
                onChange={handleChange}
                className="w-full rounded-lg border border-bone/20 bg-page px-4 py-3 text-bone focus-visible:border-brass focus-visible:outline-none"
              />
            </div>
            <div>
              <label htmlFor="time" className="mb-1.5 block text-sm font-semibold">
                Saat <span className="text-brass">*</span>
              </label>
              <input
                id="time"
                name="time"
                type="time"
                required
                min="12:00"
                max="23:30"
                value={form.time}
                onChange={handleChange}
                className="w-full rounded-lg border border-bone/20 bg-page px-4 py-3 text-bone focus-visible:border-brass focus-visible:outline-none"
              />
            </div>
          </div>

          {/* Notlar */}
          <div>
            <label htmlFor="notes" className="mb-1.5 block text-sm font-semibold">
              Özel İstekler / Notlar
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              value={form.notes}
              onChange={handleChange}
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
