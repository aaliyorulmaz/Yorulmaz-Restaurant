import { addReview, getOverallScore } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.answers !== "object") {
    return Response.json({ ok: false, error: "Geçersiz veri" }, { status: 400 });
  }

  // Gelen puanların ortalamasını hesapla
  const scores = Object.values(body.answers) as number[];
  const averageScore =
    scores.length > 0
      ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10
      : 0;

  addReview({
    submittedAt: new Date().toISOString(),
    answers: body.answers,
    comment: body.comment ?? "",
    averageScore,
  });

  return Response.json({ ok: true, overallScore: getOverallScore() });
}

// Admin için tüm değerlendirmeleri getir
export async function GET() {
  const { getReviews, getOverallScore } = await import("@/lib/db");
  return Response.json({ reviews: getReviews(), overallScore: getOverallScore() });
}
