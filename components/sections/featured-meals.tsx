"use client";
import MealCard from "@/components/cards/meal-card";
import { useEffect } from "react";
import { useFoodStore } from "@/store/food";

export type Meal = { id?: string; title: string; price?: string; status?: "Open Now" | "Closed"; rating?: number };

export default function FeaturedMealsSection({
  onEdit,
  onDelete,
}: {
  onEdit?: (meal: Meal) => void;
  onDelete?: (meal: Meal) => void;
}) {
  const { items, loading, error, fetch, query } = useFoodStore() as any;

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <section className="py-10 sm:py-14 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center text-zinc-800">Featured Meals</h2>
        {loading && (
          <div className="mt-8 text-center text-zinc-600" data-test-id="food-loading">Loading foods…</div>
        )}
        {error && (
          <div className="mt-8 text-center text-red-600" data-test-id="food-error">{error}</div>
        )}
        {(() => {
          if (loading) return null; // hide grid while loading

          // filter by food name (food_name || name)
          const q = (query ?? "").toString().trim().toLowerCase();
          const filtered = items.filter((it: any) => {
            const title: string = (it?.food_name || it?.name || "").toString().trim().toLowerCase();
            return q.length > 0 ? title.includes(q) : true;
          });

          if (!error && q.length > 0 && filtered.length === 0) {
            return (
              <div className="mt-8 text-center text-zinc-600" data-test-id="food-no-results">
                No results found for {query}
              </div>
            );
          }

          if (!error && q.length === 0 && items.length === 0) {
            return <div className="mt-8 text-center text-zinc-600 empty-state-message">No items available</div>;
          }

          return (
            <div className="mt-6 sm:mt-8 grid items-stretch grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((it: any, index: number) => {
            const title: string = (it as any).food_name || (it as any).name || "Food";
            const rawPrice: any = (it as any).price ?? (it as any).Price ?? "";
            const price: string = typeof rawPrice === "number" ? `$${rawPrice}` : (rawPrice ? String(rawPrice) : "");
            const rawRating: any = (it as any).food_rating ?? (it as any).rating;
            const rating: number = typeof rawRating === "string" ? parseFloat(rawRating) : (rawRating ?? 0);
            const rawStatus: any =
              (it as any).restaurant_status ??
              (it as any).status ??
              (typeof (it as any).open === "boolean" ? ((it as any).open ? "Open Now" : "Closed") : undefined) ??
              (it as any).restaurant?.status ??
              "Closed";
            const status = /open/i.test(String(rawStatus)) ? ("Open Now" as const) : ("Closed" as const);

            const imageUrl: string | undefined =
              (it as any).food_image ||
              (it as any).image ||
              (it as any).avatar ||
              (it as any).imageUrl ||
              undefined;

            const restaurantLogo: string | undefined =
              (it as any).restaurant_image ||
              (it as any).restaurant_logo ||
              (it as any).logo ||
              (it as any).restaurant?.logo ||
              undefined;

            const key = `${(it as any).id ?? "noid"}-${title}-${index}`;

            return (
              <div key={key} className="food-slide-up h-full">
                <MealCard
                  title={title}
                  price={price}
                  status={status}
                  rating={isNaN(rating) ? 0 : rating}
                  imageUrl={imageUrl}
                  restaurantLogo={restaurantLogo}
                  onEdit={() => onEdit?.({ id: (it as any).id, title, price, status, rating })}
                  onDelete={() => onDelete?.({ id: (it as any).id, title, price, status, rating })}
                />
              </div>
            );
          })}
        </div>
          );
        })()}
        <div className="mt-10 flex justify-center">
          <a href="#" className="inline-block">
            <div className="relative">
              <div className="absolute inset-0 blur-xl bg-foodSecondary/40 rounded-full" />
              <div className="relative">
                <button className="rounded-md bg-foodSecondary hover:bg-foodPrimary text-white px-6 py-3 font-semibold shadow-[0_8px_20px_rgba(255,179,14,0.35)]">Load more</button>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
