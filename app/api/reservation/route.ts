import { addReservation, getReservations, updateReservationStatus } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || !body.name || !body.date || !body.time) {
    return Response.json({ ok: false, error: "Eksik bilgi" }, { status: 400 });
  }

  const reservation = await addReservation({
    name: body.name,
    date: body.date,
    time: body.time,
    notes: body.notes ?? "",
  });

  return Response.json({ ok: true, reservation });
}

export async function GET() {
  return Response.json({ reservations: await getReservations() });
}

export async function PATCH(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.id || !body?.status) {
    return Response.json({ ok: false }, { status: 400 });
  }
  await updateReservationStatus(body.id, body.status);
  return Response.json({ ok: true });
}