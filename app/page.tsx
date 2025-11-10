"use client";
import { useState } from "react";
import HeaderSection from "@/components/sections/header";
import HeroSection from "@/components/sections/hero";
import FeaturedMealsSection from "@/components/sections/featured-meals";
import FooterSection from "@/components/sections/footer";
import MealModal, { MealForm } from "@/components/modals/meal-modal";

type Mode = "add" | "edit" | "delete";
type SimpleMeal = { title: string; price: string; status: "Open" | "Closed"; rating: number } | null;

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("add");
  const [selected, setSelected] = useState<SimpleMeal>(null);

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
        status: selected.status,
      }
    : {};

  return (
    <main className="min-h-screen bg-zinc-50 font-sans">
      <HeaderSection onAddMeal={openAdd} />
      <HeroSection />
      <FeaturedMealsSection onEdit={openEdit} onDelete={openDelete} />
      <FooterSection />

      <MealModal
        open={modalOpen}
        mode={mode}
        initial={initial}
        onClose={() => setModalOpen(false)}
        onSubmit={(data) => {
          console.log("submit", mode, data);
          setModalOpen(false);
        }}
        onConfirmDelete={() => {
          console.log("delete", selected);
          setModalOpen(false);
        }}
      />
    </main>
  );
}
