# Yorulmaz Et Restoranı

Next.js (App Router) + Tailwind CSS 4 + TypeScript. Node.js 20.9 veya üstü gerekir.

## Çalıştırma

```bash
npm install
npm run dev
```

Sonra tarayıcıda http://localhost:3000 adresini aç. Canlıya almadan önce `npm run build` ile derlemeyi dene.

## Klasör yapısı

```
app/
  layout.tsx          sayfanın genel çerçevesi: yazı tipleri, başlık, dil
  page.tsx            bölümleri sırayla dizer
  globals.css         RENKLER ve yazı tipleri (@theme), buton stilleri
  api/survey/route.ts anketin gönderildiği yer (POST /api/survey)
components/
  Header.tsx          üst çubuk + mobil menü
  Hero.tsx            açılış bölümü (büyük başlık, adres köşede)
  Marble.tsx          hero arka planındaki et lifi dokusu (SVG)
  About.tsx           hakkımızda (taslak)
  Menu.tsx            menü (örnek veri, dosyanın en üstünde)
  Survey.tsx          anket bölümü, data/survey.json'u okur
  Rating.tsx          tek bir sorunun 1-5 yıldız puanı
  Contact.tsx         adres, saatler, rezervasyon
  Footer.tsx
data/
  survey.json         anket kategorileri ve soruları (şu an ÖRNEK veri)
```

## Arka plan rengini değiştirmek

`app/globals.css` içindeki `@theme` bloğunda `--color-page`, `--color-panel`, `--color-glow`
ve `--color-ink` değerlerini değiştir. Hazır alternatifler orada yorum olarak duruyor.

## Anket verisi (data/survey.json)

```json
{
  "title": "Başlık",
  "intro": "Kısa açıklama",
  "scale": { "labels": ["Çok kötü", "Kötü", "Orta", "İyi", "Çok iyi"] },
  "categories": [
    {
      "id": "lezzet",
      "title": "Lezzet",
      "description": "İsteğe bağlı",
      "questions": [{ "id": "pisirme", "text": "Etin pişirme derecesi" }]
    }
  ],
  "commentLabel": "Eklemek istedikleriniz"
}
```

Puan sayısı `scale.labels` uzunluğu kadardır. JSON'un şekli değişirse `components/Survey.tsx`
içindeki `SurveyData` tipini de güncelle.

## Henüz yapılmayanlar

- **Değerlendirmeler kaydedilmiyor.** `app/api/survey/route.ts` gelen veriyi sadece sunucu
  konsoluna yazıyor. Yayına almadan önce oraya veritabanı ya da e-posta bağlanmalı.
- Menü, hakkımızda, çalışma saatleri, telefon ve fotoğraflar taslak.
- `AGENTS.md` ve `CLAUDE.md` Next.js'in kendi oluşturduğu dosyalar. İstersen silebilirsin,
  `npm run dev` yeniden oluşturur.
