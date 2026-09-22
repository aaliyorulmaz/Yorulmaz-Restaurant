import menuData from "@/data/menu.json";

// JSON'daki tek bir ürünün şekli
type MenuItem = {
  name: string;
  price: number;
  kcal: number | null;
  portion?: string;
};

type Category = {
  id: string;
  title: string;
  items: MenuItem[];
};

export default function Menu() {
  const categories: Category[] = menuData.categories;

  return (
    <section id="menu" className="bg-panel py-16 sm:py-24">
      <div className="wrap">
        <h2 className="section-title">Menümüz</h2>

        <div className="mt-12 space-y-16">
          {categories.map((category) => (
            <div key={category.id}>
              {/* Kategori başlığı */}
              <h3 className="mb-6 border-b border-bone/15 pb-3 font-display text-2xl font-semibold text-brass">
                {category.title}
              </h3>

              <ul className="grid gap-x-12 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item) => (
                  <li key={item.name} className="flex flex-col gap-1">
                    {/* İsim ...... fiyat */}
                    <div className="flex items-baseline gap-2">
                      <span className="font-semibold">{item.name}</span>
                      <span className="min-w-2 flex-1 -translate-y-1 border-b border-dotted border-bone/30" />
                      <span className="shrink-0 text-brass tabular-nums">
                        ₺{item.price.toLocaleString("tr-TR")}
                      </span>
                    </div>

                    {/* Porsiyon ve kalori – sadece varsa göster */}
                    {(item.portion || item.kcal !== null) && (
                      <p className="text-xs text-bone/50">
                        {[item.portion, item.kcal != null ? `${item.kcal} kcal` : null]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    )}
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
