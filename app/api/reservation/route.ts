import { addReservation, getReservations, updateReservationStatus } from "@/lib/db";

// Yeni rezervasyon oluştur
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || !body.name || !body.date || !body.time) {
    return Response.json({ ok: false, error: "Eksik bilgi" }, { status: 400 });
  }

  const reservation = addReservation({
    name: body.name,
    date: body.date,
    time: body.time,
    notes: body.notes ?? "",
  });

  return Response.json({ ok: true, reservation });
}

// Admin: tüm rezervasyonları getir
export async function GET() {
  return Response.json({ reservations: getReservations() });
}

// Admin: rezervasyon durumunu güncelle (onayla / iptal)
export async function PATCH(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.id || !body?.status) {
    return Response.json({ ok: false }, { status: 400 });
  }
  updateReservationStatus(body.id, body.status);
  return Response.json({ ok: true });
}
