// lib/db.ts
// JSON dosya tabanlı basit "veritabanı".
// Tüm okuma/yazma işlemleri buradan geçer.
// İleride gerçek bir DB'ye geçmek istersen sadece bu dosyayı değiştirmen yeterli.

import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

// Genel okuma/yazma yardımcıları
function readJSON<T>(file: string): T {
  const filePath = path.join(DATA_DIR, file);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

function writeJSON(file: string, data: unknown): void {
  const filePath = path.join(DATA_DIR, file);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// ── Değerlendirmeler ──────────────────────────────────────────────

export type Review = {
  id: string;
  submittedAt: string;           // ISO tarih
  answers: Record<string, number>; // { "lezzet.pisirme": 4, ... }
  comment: string;
  averageScore: number;          // o değerlendirmenin ortalaması (1-5)
};

export function getReviews(): Review[] {
  return readJSON<Review[]>("reviews.json");
}

export function addReview(review: Omit<Review, "id">): Review {
  const reviews = getReviews();
  const newReview: Review = { id: Date.now().toString(), ...review };
  reviews.push(newReview);
  writeJSON("reviews.json", reviews);
  return newReview;
}

// Tüm değerlendirmelerin genel ortalaması (restoranın puanı)
export function getOverallScore(): number {
  const reviews = getReviews();
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((sum, r) => sum + r.averageScore, 0);
  return Math.round((total / reviews.length) * 10) / 10; // 1 ondalık
}

// ── Rezervasyonlar ────────────────────────────────────────────────

export type Reservation = {
  id: string;
  submittedAt: string;
  name: string;       // İsim soyisim
  date: string;       // YYYY-MM-DD
  time: string;       // HH:MM
  notes: string;
  status: "bekliyor" | "onaylandi" | "iptal";
};

export function getReservations(): Reservation[] {
  return readJSON<Reservation[]>("reservations.json");
}

export function addReservation(res: Omit<Reservation, "id" | "submittedAt" | "status">): Reservation {
  const reservations = getReservations();
  const newRes: Reservation = {
    id: Date.now().toString(),
    submittedAt: new Date().toISOString(),
    status: "bekliyor",
    ...res,
  };
  reservations.push(newRes);
  writeJSON("reservations.json", reservations);
  return newRes;
}

export function updateReservationStatus(
  id: string,
  status: Reservation["status"]
): void {
  const reservations = getReservations();
  const index = reservations.findIndex((r) => r.id === id);
  if (index !== -1) {
    reservations[index].status = status;
    writeJSON("reservations.json", reservations);
  }
}
