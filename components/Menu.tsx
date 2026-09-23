import menuData from "@/data/menu.json";

// Alerjen etiket tipleri
type Allergen = "gluten" | "sut" | "yumurta" | "kabuklu-deniz" | "hardal";

type MenuItem = {
  name: string;
  price: number;
  kcal: number | null;
  portion?: string;
  description?: string;
  allergens?: Allergen[];
};

type Category = {
  id: string;
  title: string;
  items: MenuItem[];
};

// Alerjen etiket görünümü
const ALLERGEN_LABELS: Record<Allergen, { label: string; color: string }> = {
  gluten:          { label: "⚠ Gluten",       color: "bg-amber-100 text-amber-800" },
  sut:             { label: "⚠ Süt",           color: "bg-blue-100 text-blue-800" },
  yumurta:         { label: "⚠ Yumurta",       color: "bg-yellow-100 text-yellow-800" },
  "kabuklu-deniz": { label: "⚠ Kabuklu Deniz", color: "bg-orange-100 text-orange-800" },
  hardal:          { label: "⚠ Hardal",        color: "bg-lime-100 text-lime-800" },
};

function AllergenBadges({ allergens }: { allergens?: Allergen[] }) {
  if (!allergens?.length) return null;
  return (
    <div className="mt-1 flex flex-wrap gap-1">
      {allergens.map((a) => (
        <span key={a} className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${ALLERGEN_LABELS[a].color}`}>
          {ALLERGEN_LABELS[a].label}
        </span>
      ))}
    </div>
  );
}

export default function Menu() {
  const categories: Category[] = menuData.categories;

  return (
    <section id="menu" className="bg-panel py-16 sm:py-24">
      <div className="wrap">
        <h2 className="section-title">Menümüz</h2>

        <div className="mt-12 space-y-16">
          {categories.map((category) => (
            <div key={category.id}>
              <h3 className="mb-6 border-b border-bone/15 pb-3 font-display text-2xl font-semibold text-brass">
                {category.title}
              </h3>

              <ul className="grid gap-x-12 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item) => (
                  <li key={item.name} className="flex flex-col gap-0.5">
                    <div className="flex items-baseline gap-2">
                      <span className="font-semibold">{item.name}</span>
                      <span className="min-w-2 flex-1 -translate-y-1 border-b border-dotted border-bone/30" />
                      <span className="shrink-0 text-brass tabular-nums">
                        ₺{item.price.toLocaleString("tr-TR")}
                      </span>
                    </div>

                    {item.description && (
                      <p className="text-xs text-bone/60 leading-relaxed">{item.description}</p>
                    )}

                    {(item.portion || item.kcal !== null) && (
                      <p className="text-xs text-bone/45">
                        {[item.portion, item.kcal != null ? `${item.kcal} kcal` : null]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    )}

                    <AllergenBadges allergens={item.allergens} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}