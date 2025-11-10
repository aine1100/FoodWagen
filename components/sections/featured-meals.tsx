import MealCard from "@/components/cards/meal-card";

type Meal = { title: string; price: string; status: "Open" | "Closed"; rating: number };

const meals: Meal[] = [
  { title: "Bow Lasagna", price: "$2.99", status: "Closed", rating: 4.6 },
  { title: "Mixed Avocado", price: "$5.99", status: "Closed", rating: 4.0 },
  { title: "Pancake", price: "$3.99", status: "Open", rating: 5 },
  { title: "Cupcake", price: "$1.99", status: "Open", rating: 5 },
  { title: "Creamy Stake", price: "$12.99", status: "Open", rating: 4.5 },
  { title: "Stake  Potatos", price: "$15.99", status: "Open", rating: 5 },
  { title: "Indian Spicy Soup", price: "$9.99", status: "Open", rating: 4.5 },
  { title: "Stake Omlet", price: "$11.99", status: "Open", rating: 4.9 },
];

export default function FeaturedMealsSection({
  onEdit,
  onDelete,
}: {
  onEdit?: (meal: Meal) => void;
  onDelete?: (meal: Meal) => void;
}) {
  return (
    <section className="py-14 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center text-zinc-800">Featured Meals</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {meals.map((m) => (
            <MealCard
              key={m.title}
              title={m.title}
              price={m.price}
              status={m.status as any}
              rating={m.rating}
              onEdit={() => onEdit?.(m)}
              onDelete={() => onDelete?.(m)}
            />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <a href="#" className="inline-block">
            <div className="relative">
              <div className="absolute inset-0 blur-xl bg-foodSecondary/40 rounded-full" />
              <div className="relative">
                <button className="rounded-full bg-foodSecondary hover:bg-foodPrimary text-white px-6 py-3 font-semibold shadow-[0_8px_20px_rgba(255,179,14,0.35)]">Load more</button>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
