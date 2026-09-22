type RatingProps = {
  name: string; // form alanı adı, ör. "lezzet.pisirme"
  labels: string[]; // puan yazıları: ["Çok kötü", ..., "Çok iyi"]
  value: number; // seçili puan (0 = seçilmemiş)
  onChange: (value: number) => void;
  showError: boolean; // "puanlayın" uyarısı gösterilsin mi
};

export default function Rating({ name, labels, value, onChange, showError }: RatingProps) {
  return (
    <div role="radiogroup" className="mt-1 flex flex-wrap items-center gap-x-4">
      <div className="flex">
        {labels.map((label, i) => {
          const star = i + 1;
          const filled = star <= value;

          return (
            <label
              key={star}
              className="grid size-11 cursor-pointer place-items-center rounded-lg has-focus-visible:outline-2 has-focus-visible:-outline-offset-2 has-focus-visible:outline-ink"
            >
              {/* Gerçek radio düğmesi gizli, yıldız onun görünümü */}
              <input
                type="radio"
                className="sr-only"
                name={name}
                id={`${name}-${star}`}
                value={star}
                checked={value === star}
                onChange={() => onChange(star)}
              />
              <svg
                viewBox="0 0 24 24"
                className={`size-8 ${filled ? "fill-current text-brass-deep" : "fill-none text-ink/35"}`}
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 2.5l2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.52l-5.88 3.09 1.12-6.55L2.48 9.42l6.58-.96L12 2.5z" />
              </svg>
              <span className="sr-only">
                {star} puan, {label}
              </span>
            </label>
          );
        })}
      </div>

      {/* Seçilen puanın yazısı */}
      <span className="min-w-[6ch] text-sm text-ink/75" aria-hidden="true">
        {value ? labels[value - 1] : ""}
      </span>

      {showError && <p className="w-full text-sm text-danger">Lütfen bu soruyu puanlayın.</p>}
    </div>
  );
}
