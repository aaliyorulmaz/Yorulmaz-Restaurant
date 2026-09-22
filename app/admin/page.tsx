"use client";

import { useState, useEffect, useCallback } from "react";
import type { Review, Reservation } from "@/lib/db";

const TOKEN_KEY = "yorulmaz_admin_token";

// ── Küçük yardımcı: tarihi okunabilir yap ────────────────────────
function fmt(iso: string) {
  return new Date(iso).toLocaleString("tr-TR", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

// ── Durum rozeti ─────────────────────────────────────────────────
function StatusBadge({ status }: { status: Reservation["status"] }) {
  const colors = {
    bekliyor:   "bg-yellow-100 text-yellow-800",
    onaylandi:  "bg-green-100  text-green-800",
    iptal:      "bg-red-100    text-red-800",
  };
  const labels = { bekliyor: "Bekliyor", onaylandi: "Onaylandı", iptal: "İptal" };
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors[status]}`}>
      {labels[status]}
    </span>
  );
}

// ── Ana bileşen ───────────────────────────────────────────────────
export default function AdminPage() {
  const [token, setToken]                 = useState<string | null>(null);
  const [loginForm, setLoginForm]         = useState({ username: "", password: "" });
  const [loginError, setLoginError]       = useState("");
  const [tab, setTab]                     = useState<"rezervasyonlar" | "degerlendirmeler">("rezervasyonlar");
  const [reservations, setReservations]   = useState<Reservation[]>([]);
  const [reviews, setReviews]             = useState<Review[]>([]);
  const [overallScore, setOverallScore]   = useState(0);

  // Sayfa yüklenince localStorage'dan token al
  useEffect(() => {
    const saved = localStorage.getItem(TOKEN_KEY);
    if (saved) setToken(saved);
  }, []);

  // Token varsa verileri çek
  const fetchData = useCallback(async (t: string) => {
    const headers = { "x-admin-token": t };
    const [resRes, revRes] = await Promise.all([
      fetch("/api/reservation", { headers }),
      fetch("/api/survey",      { headers }),
    ]);
    const resData = await resRes.json();
    const revData = await revRes.json();
    setReservations(resData.reservations ?? []);
    setReviews(revData.reviews ?? []);
    setOverallScore(revData.overallScore ?? 0);
  }, []);

  useEffect(() => {
    if (token) fetchData(token);
  }, [token, fetchData]);

  // Giriş
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginForm),
    });
    const data = await res.json();
    if (data.ok) {
      localStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
    } else {
      setLoginError("Hatalı kullanıcı adı veya şifre.");
    }
  }

  // Çıkış
  function handleLogout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }

  // Rezervasyon durumu güncelle
  async function updateStatus(id: string, status: Reservation["status"]) {
    if (!token) return;
    await fetch("/api/reservation", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-token": token },
      body: JSON.stringify({ id, status }),
    });
    fetchData(token);
  }

  // ── Giriş ekranı ──────────────────────────────────────────────
  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-page">
        <div className="w-full max-w-sm rounded-2xl border border-bone/10 bg-panel p-8">
          <h1 className="font-display text-2xl font-bold text-bone">Admin Girişi</h1>
          <p className="mt-1 text-sm text-bone/60">Yorulmaz Et Restoranı</p>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-semibold text-bone">Kullanıcı Adı</label>
              <input
                type="text"
                required
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                className="w-full rounded-lg border border-bone/20 bg-page px-4 py-3 text-bone focus-visible:border-brass focus-visible:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-bone">Şifre</label>
              <input
                type="password"
                required
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full rounded-lg border border-bone/20 bg-page px-4 py-3 text-bone focus-visible:border-brass focus-visible:outline-none"
              />
            </div>
            {loginError && <p className="text-sm text-danger">{loginError}</p>}
            <button type="submit" className="btn btn-brass w-full">Giriş Yap</button>
          </form>
        </div>
      </div>
    );
  }

  // ── Admin paneli ───────────────────────────────────────────────
  const pending = reservations.filter((r) => r.status === "bekliyor").length;

  return (
    <div className="min-h-screen bg-page text-bone">
      {/* Üst çubuk */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-bone/10 bg-page/90 px-6 py-4 backdrop-blur">
        <div>
          <span className="font-display text-xl font-bold">Admin Paneli</span>
          <span className="ml-3 text-sm text-bone/50">Yorulmaz Et Restoranı</span>
        </div>
        <div className="flex items-center gap-4">
          {overallScore > 0 && (
            <span className="text-sm text-bone/70">
              Genel puan: <strong className="text-brass">{overallScore.toFixed(1)} / 5</strong>
              <span className="ml-1 text-bone/50">({reviews.length} değerlendirme)</span>
            </span>
          )}
          <a href="/" target="_blank" className="text-sm text-bone/60 hover:text-bone">Siteye git ↗</a>
          <button onClick={handleLogout} className="btn btn-ghost !py-2 !px-4 text-sm">Çıkış</button>
        </div>
      </header>

      {/* Sekmeler */}
      <div className="border-b border-bone/10 px-6">
        <div className="flex gap-0">
          {(["rezervasyonlar", "degerlendirmeler"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-3.5 text-sm font-semibold transition-colors border-b-2 ${
                tab === t
                  ? "border-brass text-brass"
                  : "border-transparent text-bone/60 hover:text-bone"
              }`}
            >
              {t === "rezervasyonlar" ? `Rezervasyonlar${pending > 0 ? ` (${pending} bekliyor)` : ""}` : "Değerlendirmeler"}
            </button>
          ))}
        </div>
      </div>

      <main className="p-6">
        {/* REZERVASYONLAR */}
        {tab === "rezervasyonlar" && (
          <div>
            {reservations.length === 0 ? (
              <p className="text-bone/50 mt-8 text-center">Henüz rezervasyon yok.</p>
            ) : (
              <div className="space-y-3">
                {[...reservations].reverse().map((r) => (
                  <div key={r.id} className="rounded-xl border border-bone/10 bg-panel p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-lg">{r.name}</p>
                        <p className="text-bone/70 mt-0.5">
                          📅 {r.date.split("-").reverse().join(".")} &nbsp; 🕐 {r.time}
                        </p>
                        {r.notes && (
                          <p className="mt-2 text-sm text-bone/60 border-l-2 border-brass/40 pl-3">
                            {r.notes}
                          </p>
                        )}
                        <p className="mt-2 text-xs text-bone/40">Gönderildi: {fmt(r.submittedAt)}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <StatusBadge status={r.status} />
                        {r.status === "bekliyor" && (
                          <div className="flex gap-2 mt-1">
                            <button
                              onClick={() => updateStatus(r.id, "onaylandi")}
                              className="rounded-lg bg-green-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-600"
                            >
                              Onayla
                            </button>
                            <button
                              onClick={() => updateStatus(r.id, "iptal")}
                              className="rounded-lg bg-red-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
                            >
                              İptal
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* DEĞERLENDİRMELER */}
        {tab === "degerlendirmeler" && (
          <div>
            {reviews.length === 0 ? (
              <p className="text-bone/50 mt-8 text-center">Henüz değerlendirme yok.</p>
            ) : (
              <div className="space-y-3">
                {[...reviews].reverse().map((r) => (
                  <div key={r.id} className="rounded-xl border border-bone/10 bg-panel p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex-1">
                        {/* Puanlar */}
                        <div className="flex flex-wrap gap-x-6 gap-y-1">
                          {Object.entries(r.answers).map(([key, val]) => {
                            const [cat, q] = key.split(".");
                            return (
                              <span key={key} className="text-sm text-bone/70">
                                <span className="text-bone/40">{cat} / {q}:</span>{" "}
                                <strong className="text-brass">{val}/5</strong>
                              </span>
                            );
                          })}
                        </div>
                        {/* Yorum */}
                        {r.comment && (
                          <p className="mt-3 text-sm text-bone/70 border-l-2 border-brass/40 pl-3">
                            "{r.comment}"
                          </p>
                        )}
                        <p className="mt-2 text-xs text-bone/40">{fmt(r.submittedAt)}</p>
                      </div>
                      {/* Ortalama puan */}
                      <div className="flex flex-col items-center rounded-lg border border-bone/10 px-4 py-2">
                        <span className="font-display text-2xl font-bold text-brass">{r.averageScore.toFixed(1)}</span>
                        <span className="text-xs text-bone/50">/ 5</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
