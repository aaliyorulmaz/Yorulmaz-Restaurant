// Basit admin girişi. Kullanıcı adı ve şifre burada sabit tanımlı.
// İleride .env dosyasına taşıyabilirsin.
const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123";
const SESSION_TOKEN = "yorulmaz-admin-token-2024"; // sabit, gizli tutulacak

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (body?.username === ADMIN_USER && body?.password === ADMIN_PASS) {
    // Gerçek bir uygulamada httpOnly cookie kullanılır.
    // Burada basit tutmak için token döndürüyoruz.
    return Response.json({ ok: true, token: SESSION_TOKEN });
  }

  return Response.json({ ok: false, error: "Hatalı kullanıcı adı veya şifre" }, { status: 401 });
}

// Token doğrulama (admin sayfası yüklenirken çağırır)
export async function GET(request: Request) {
  const token = request.headers.get("x-admin-token");
  return Response.json({ ok: token === SESSION_TOKEN });
}
