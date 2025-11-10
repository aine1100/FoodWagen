"use client";
import { useState } from "react";
import HeaderSection from "@/components/sections/header";
import HeroSection from "@/components/sections/hero";
import FeaturedMealsSection from "@/components/sections/featured-meals";
import FooterSection from "@/components/sections/footer";
import MealModal, { MealForm } from "@/components/modals/meal-modal";
import { useFoodStore } from "@/store/food";
import { useNotify } from "@/store/notify";
import ToastContainer from "@/components/utils/toast";

type Mode = "add" | "edit" | "delete";
type SimpleMeal = { title: string; price: string; status: "Open Now" | "Closed"; rating: number; id?: string } | null;

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("add");
  const [selected, setSelected] = useState<SimpleMeal>(null);
  const { add, update, remove, loading } = useFoodStore();
  const { push } = useNotify();

  const openAdd = () => { setSelected(null); setMode("add"); setModalOpen(true); };
  const openEdit = (meal: SimpleMeal) => { setSelected(meal); setMode("edit"); setModalOpen(true); };
  const openDelete = (meal: SimpleMeal) => { setSelected(meal); setMode("delete"); setModalOpen(true); };

  const initial: Partial<MealForm> = selected
    ? {
        name: selected.title,
        rating: String(selected.rating ?? ""),
        imageUrl: "",
        restaurant: "",
        restaurantLogo: "",
        status: selected.status === "Open Now" ? "Open Now" : "Closed",
      }
    : {};

  return (
    <main className="min-h-screen bg-zinc-50 font-sans">
      <ToastContainer />
      <HeaderSection onAddMeal={openAdd} />
      <HeroSection />
      <FeaturedMealsSection onEdit={openEdit} onDelete={openDelete} />
      <FooterSection />

      <MealModal
        open={modalOpen}
        mode={mode}
        initial={initial}
        loading={loading}
        onClose={() => setModalOpen(false)}
        onSubmit={async (data) => {
          try {
            if (mode === "add") {
              await add({
                name: data.name,
                rating: Number(data.rating),
                imageUrl: data.imageUrl,
                restaurant: {
                  name: data.restaurant,
                  logo: data.restaurantLogo,
                  status: data.status,
                },
              });
              push("success", "Food added successfully");
            } else if (mode === "edit" && selected?.id) {
              await update(selected.id, {
                name: data.name,
                rating: Number(data.rating),
                imageUrl: data.imageUrl,
                restaurant: {
                  name: data.restaurant,
                  logo: data.restaurantLogo,
                  status: data.status,
                },
              });
              push("success", "Food updated successfully");
            }
            setModalOpen(false);
          } catch (e: any) {
            push("error", e?.message || "Operation failed");
          }
        }}
        onConfirmDelete={async () => {
          try {
            if (selected?.id) {
              await remove(selected.id);
              push("success", "Food deleted successfully");
            }
            setModalOpen(false);
          } catch (e: any) {
            push("error", e?.message || "Delete failed");
          }
        }}
      />
    </main>
  );
}
