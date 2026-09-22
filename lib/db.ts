import fs from "fs";
import path from "path";

let redis: import("ioredis").Redis | null = null;

async function getRedis() {
  if (!process.env.REDIS_URL) return null;
  if (redis) return redis;
  const { default: Redis } = await import("ioredis");
  redis = new Redis(process.env.REDIS_URL, {
    tls: process.env.REDIS_URL.startsWith("rediss://") ? {} : undefined,
    maxRetriesPerRequest: 3,
  });
  return redis;
}

export type Review = {
  id: string;
  submittedAt: string;
  answers: Record<string, number>;
  comment: string;
  averageScore: number;
};

export type Reservation = {
  id: string;
  submittedAt: string;
  name: string;
  date: string;
  time: string;
  notes: string;
  status: "bekliyor" | "onaylandi" | "iptal";
};

const KEYS = {
  reviews: "yorulmaz:reviews",
  reservations: "yorulmaz:reservations",
};

const DATA_DIR = path.join(process.cwd(), "data");

function readJSONFile<T>(file: string): T {
  try {
    return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), "utf-8")) as T;
  } catch {
    return [] as unknown as T;
  }
}

function writeJSONFile(file: string, data: unknown) {
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2));
}

async function getList<T>(key: string, fallbackFile: string): Promise<T[]> {
  const r = await getRedis();
  if (r) {
    const raw = await r.get(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  }
  return readJSONFile<T[]>(fallbackFile);
}

async function setList(key: string, fallbackFile: string, data: unknown[]) {
  const r = await getRedis();
  if (r) {
    await r.set(key, JSON.stringify(data));
  } else {
    writeJSONFile(fallbackFile, data);
  }
}

export async function getReviews(): Promise<Review[]> {
  return getList<Review>(KEYS.reviews, "reviews.json");
}

export async function addReview(review: Omit<Review, "id">): Promise<Review> {
  const reviews = await getReviews();
  const newReview: Review = { id: Date.now().toString(), ...review };
  reviews.push(newReview);
  await setList(KEYS.reviews, "reviews.json", reviews);
  return newReview;
}

export async function getOverallScore(): Promise<number> {
  const reviews = await getReviews();
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((sum, r) => sum + r.averageScore, 0);
  return Math.round((total / reviews.length) * 10) / 10;
}

export async function getReservations(): Promise<Reservation[]> {
  return getList<Reservation>(KEYS.reservations, "reservations.json");
}

export async function addReservation(
  res: Omit<Reservation, "id" | "submittedAt" | "status">
): Promise<Reservation> {
  const reservations = await getReservations();
  const newRes: Reservation = {
    id: Date.now().toString(),
    submittedAt: new Date().toISOString(),
    status: "bekliyor",
    ...res,
  };
  reservations.push(newRes);
  await setList(KEYS.reservations, "reservations.json", reservations);
  return newRes;
}

export async function updateReservationStatus(
  id: string,
  status: Reservation["status"]
): Promise<void> {
  const reservations = await getReservations();
  const index = reservations.findIndex((r) => r.id === id);
  if (index !== -1) {
    reservations[index].status = status;
    await setList(KEYS.reservations, "reservations.json", reservations);
  }
}