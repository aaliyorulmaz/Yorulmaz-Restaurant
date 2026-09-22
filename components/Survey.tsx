"use client";

import { useState, useEffect, type FormEvent } from "react";
import surveyData from "@/data/survey.json";
import Rating from "./Rating";

type SurveyData = {
  title: string;
  intro: string;
  scale: { labels: string[] };
  categories: {
    id: string;
    title: string;
    description?: string;
    questions: { id: string; text: string }[];
  }[];
  commentLabel: string;
};

const survey: SurveyData = surveyData;

export default function SurveySection() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "missing" | "sending" | "sent" | "error">("idle");
  const [overallScore, setOverallScore] = useState<number | null>(null);
  const [reviewCount, setReviewCount] = useState<number>(0);

  // Sayfa açılınca mevcut puanı çek
  useEffect(() => {
    fetch("/api/survey")
      .then((r) => r.json())
      .then((data) => {
        setOverallScore(data.overallScore);
        setReviewCount(data.reviews.length);
      })
      .catch(() => {});
  }, []);

  const allKeys = survey.categories.flatMap((c) =>
    c.questions.map((q) => `${c.id}.${q.id}`)
  );
  const missing = allKeys.filter((key) => !answers[key]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (missing.length > 0) {
      setStatus("missing");
      document.getElementById(`${missing[0]}-1`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, comment }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("sent");
        setOverallScore(data.overallScore);
        setReviewCount((prev) => prev + 1);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  let message = "";
  if (status === "missing") message = `Lütfen tüm soruları puanlayın (${missing.length} soru eksik).`;
  if (status === "sending") message = "Gönderiliyor…";
  if (status === "sent") message = "Teşekkür ederiz! Değerlendirmeniz kaydedildi.";
  if (status === "error") message = "Gönderilemedi. Lütfen biraz sonra tekrar deneyin.";

  // Yıldızları doldur (1-5 arası yarım yıldız yok, tam yıldız)
  function renderStars(score: number) {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        viewBox="0 0 24 24"
        className={`size-5 ${i < Math.round(score) ? "fill-brass-deep text-brass-deep" : "fill-none text-ink/25"}`}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      >
        <path d="M12 2.5l2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.52l-5.88 3.09 1.12-6.55L2.48 9.42l6.58-.96L12 2.5z" />
      </svg>
    ));
  }

  return (
    <section id="degerlendirme" className="bg-bone py-16 text-ink sm:py-24">
      <div className="wrap">
        {/* Başlık + mevcut puan */}
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <h2 className="section-title">{survey.title}</h2>
            <p className="mt-4 max-w-prose text-ink/75">{survey.intro}</p>
          </div>

          {/* Genel puan kartı */}
          {overallScore !== null && overallScore > 0 && (
            <div className="flex flex-col items-center rounded-2xl border border-ink/15 bg-white/60 px-8 py-5 shadow-sm">
              <span className="font-display text-4xl font-bold">{overallScore.toFixed(1)}</span>
              <div className="mt-1 flex">{renderStars(overallScore)}</div>
              <span className="mt-1 text-xs text-ink/60">{reviewCount} değerlendirme</span>
            </div>
          )}
        </div>

        {status === "sent" ? (
          <p className="mt-10 text-lg font-semibold text-brass">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-10">
            {survey.categories.map((category) => (
              <div
                key={category.id}
                className="grid gap-5 border-t border-ink/20 py-8 md:grid-cols-[1fr_1.8fr] md:gap-12"
              >
                <div>
                  <h3 className="font-display text-2xl font-semibold">{category.title}</h3>
                  {category.description && (
                    <p className="mt-1 text-ink/75">{category.description}</p>
                  )}
                </div>
                <div className="space-y-6">
                  {category.questions.map((question) => {
                    const key = `${category.id}.${question.id}`;
                    return (
                      <div key={key}>
                        <p className="font-semibold">{question.text}</p>
                        <Rating
                          name={key}
                          labels={survey.scale.labels}
                          value={answers[key] ?? 0}
                          onChange={(value) => setAnswers({ ...answers, [key]: value })}
                          showError={status === "missing" && !answers[key]}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="border-t border-ink/20 py-8">
              <label htmlFor="yorum" className="mb-2 block font-semibold">
                {survey.commentLabel}
              </label>
              <textarea
                id="yorum"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="block w-full max-w-2xl resize-y rounded-lg border border-ink/40 bg-white/50 px-4 py-3 focus-visible:outline-ink"
              />
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn btn-dark focus-visible:outline-ink"
              >
                Değerlendirmeyi gönder
              </button>
              <p
                role="status"
                className={status === "missing" || status === "error" ? "text-danger" : "text-ink/75"}
              >
                {message}
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
