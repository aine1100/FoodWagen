"use client";

import React, { useEffect, useMemo, useState } from "react";
import FoodButton from "@/components/utils/button";
import Dropdown, { Option } from "@/components/utils/dropdown";

export type MealStatus = "Open" | "Closed";
export type MealForm = {
  name: string;
  rating: string; // keep as string for input compatibility
  imageUrl: string;
  restaurant: string;
  restaurantLogo: string;
  status: MealStatus | "";
};

export type MealModalMode = "add" | "edit" | "delete";

type Props = {
  open: boolean;
  mode: MealModalMode;
  initial?: Partial<MealForm>;
  onClose: () => void;
  onSubmit?: (data: MealForm) => void;
  onConfirmDelete?: () => void;
};

const emptyForm: MealForm = {
  name: "",
  rating: "",
  imageUrl: "",
  restaurant: "",
  restaurantLogo: "",
  status: "",
};

export default function MealModal({ open, mode, initial, onClose, onSubmit, onConfirmDelete }: Props) {
  const [form, setForm] = useState<MealForm>(emptyForm);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (open) {
      setForm({
        name: initial?.name ?? "",
        rating: initial?.rating ?? "",
        imageUrl: initial?.imageUrl ?? "",
        restaurant: initial?.restaurant ?? "",
        restaurantLogo: initial?.restaurantLogo ?? "",
        status: (initial?.status as MealStatus) ?? "",
      });
      setTouched(false);
    }
  }, [open, initial]);

  const title = useMemo(() => {
    if (mode === "add") return "Add a meal";
    if (mode === "edit") return "Edit Meal";
    return "Delete Meal";
  }, [mode]);

  const requiredError = touched && !form.name;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (mode === "delete") return;
    if (!form.name) return;
    onSubmit?.({ ...form } as MealForm);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div
        role="dialog"
        aria-modal
        className={`relative w-[92vw] max-w-xl rounded-2xl bg-white shadow-2xl ${
          mode === "delete" 
        }`}
      >
        <div className="px-6 pt-6">
          <h3 className="text-center text-2xl font-extrabold text-foodSecondary">{title}</h3>
        </div>

        {mode !== "delete" ? (
          <form onSubmit={submit} className="p-6 space-y-4">
            <div>
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Food name"
                className="w-full rounded-md bg-zinc-100 text-black px-4 py-3 outline-none placeholder:text-black"
              />
              {requiredError && (
                <p className="mt-1 text-sm text-red-500">Food name is required</p>
              )}
            </div>

            <input
              value={form.rating}
              onChange={(e) => setForm((f) => ({ ...f, rating: e.target.value }))}
              placeholder="Food rating"
              className="w-full rounded-md text-black bg-zinc-100 px-4 py-3 outline-none placeholder:text-black"
            />

            <input
              value={form.imageUrl}
              onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
              placeholder="Food image (link)"
              className="w-full rounded-md text-black bg-zinc-100 px-4 py-3 outline-none placeholder:text-black"
            />

            <input
              value={form.restaurant}
              onChange={(e) => setForm((f) => ({ ...f, restaurant: e.target.value }))}
              placeholder="Restaurant name"
              className="w-full rounded-md text-black bg-zinc-100 px-4 py-3 outline-none placeholder:text-black"
            />

            <input
              value={form.restaurantLogo}
              onChange={(e) => setForm((f) => ({ ...f, restaurantLogo: e.target.value }))}
              placeholder="Restaurant logo (link)"
              className="w-full rounded-md text-black bg-zinc-100 px-4 py-3 outline-none placeholder:text-black"
            />

            <Dropdown<MealStatus>
              options={[
                { label: "open", value: "Open" },
                { label: "close", value: "Closed" },
              ]}
              value={form.status}
              placeholder="Restaurant status (open/close)"
              onChange={(v) => setForm((f) => ({ ...f, status: v }))}
            />

            <div className="mt-4 grid grid-cols-2 gap-3">
              <FoodButton
                text={mode === "add" ? "Add" : "Save"}
                type="submit"
                styles="rounded-md text-center"
              />
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-foodSecondary px-5 py-3 font-semibold text-zinc-800 hover:bg-zinc-50"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6 space-y-6">
            <p className="text-center text-zinc-700">Are you sure you want to delete this meal? Actions cannot be reversed</p>
            <div className="grid grid-cols-2 gap-3">
              <FoodButton text="Yes" styles="rounded-md" onClick={onConfirmDelete} />
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-zinc-300 px-5 py-3 font-semibold text-zinc-800 hover:bg-zinc-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="pb-4" />
      </div>
    </div>
  );
}
