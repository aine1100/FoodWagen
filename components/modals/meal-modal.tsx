"use client";

import React, { useEffect, useMemo, useState } from "react";
import FoodButton from "@/components/utils/button";
import Dropdown, { Option } from "@/components/utils/dropdown";

export type MealStatus = "Open Now" | "Closed";
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
  loading?: boolean;
};

const emptyForm: MealForm = {
  name: "",
  rating: "",
  imageUrl: "",
  restaurant: "",
  restaurantLogo: "",
  status: "",
};

export default function MealModal({ open, mode, initial, onClose, onSubmit, onConfirmDelete, loading }: Props) {
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

  const isValidUrl = (v: string) => {
    try { new URL(v); return true; } catch { return false; }
  };

  const errs = {
    name: touched && !form.name ? "Food Name is required" : "",
    rating:
      touched && (!!form.rating && (isNaN(Number(form.rating)) || Number(form.rating) < 1 || Number(form.rating) > 5))
        ? "Food Rating must be a number"
        : "",
    imageUrl: touched && !form.imageUrl ? "Food Image URL is required" : "",
    restaurant: touched && !form.restaurant ? "Restaurant Name is required" : "",
    restaurantLogo: touched && !form.restaurantLogo ? "Restaurant Logo URL is required" : "",
    status:
      touched && !!form.status && form.status !== "Open Now" && form.status !== "Closed"
        ? "Food Status must be ‘Open Now’ or ‘Closed’"
        : "",
  } as const;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (mode === "delete") return;
    // basic required fields
    if (!form.name || !form.rating || !form.imageUrl || !form.restaurant || !form.restaurantLogo || !form.status) return;
    if (errs.rating || (form.imageUrl && !isValidUrl(form.imageUrl)) || (form.restaurantLogo && !isValidUrl(form.restaurantLogo))) return;
    onSubmit?.({ ...form } as MealForm);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div
        role="dialog"
        aria-modal
        className={`relative w-full sm:w-[92vw] max-w-xl rounded-2xl bg-white shadow-2xl`}
      >
        <div className="px-6 pt-6">
          <h3 className="text-center text-2xl font-extrabold text-foodSecondary">{title}</h3>
        </div>

        {mode !== "delete" ? (
          <form onSubmit={submit} className="p-6 space-y-4">
            <div>
              <label htmlFor="food_name" className="sr-only">Food name</label>
              <input
                id="food_name"
                name="food_name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Enter food name"
                aria-describedby="food-name-error"
                className="w-full rounded-md bg-zinc-100 text-black px-4 py-3 outline-none placeholder:text-black food-input"
              />
              {errs.name && (
                <p id="food-name-error" className="mt-1 text-sm text-red-500">{errs.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="food_rating" className="sr-only">Food rating</label>
              <input
                id="food_rating"
                name="food_rating"
                type="number"
                min={1}
                max={5}
                value={form.rating}
                onChange={(e) => setForm((f) => ({ ...f, rating: e.target.value }))}
                placeholder="Food rating (1-5)"
                aria-describedby="food-rating-error"
                className="w-full rounded-md text-black bg-zinc-100 px-4 py-3 outline-none placeholder:text-black food-input"
              />
              {errs.rating && (
                <p id="food-rating-error" className="mt-1 text-sm text-red-500">{errs.rating}</p>
              )}
            </div>

            <div>
              <label htmlFor="food_image" className="sr-only">Food image</label>
              <input
                id="food_image"
                name="food_image"
                value={form.imageUrl}
                onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
                placeholder="Food image URL"
                aria-describedby="food-image-error"
                className="w-full rounded-md text-black bg-zinc-100 px-4 py-3 outline-none placeholder:text-black food-input"
              />
              {errs.imageUrl && (
                <p id="food-image-error" className="mt-1 text-sm text-red-500">{errs.imageUrl}</p>
              )}
            </div>

            <div>
              <label htmlFor="restaurant_name" className="sr-only">Restaurant name</label>
              <input
                id="restaurant_name"
                name="restaurant_name"
                value={form.restaurant}
                onChange={(e) => setForm((f) => ({ ...f, restaurant: e.target.value }))}
                placeholder="Restaurant name"
                aria-describedby="restaurant-name-error"
                className="w-full rounded-md text-black bg-zinc-100 px-4 py-3 outline-none placeholder:text-black food-input"
              />
              {errs.restaurant && (
                <p id="restaurant-name-error" className="mt-1 text-sm text-red-500">{errs.restaurant}</p>
              )}
            </div>

            <div>
              <label htmlFor="restaurant_logo" className="sr-only">Restaurant logo</label>
              <input
                id="restaurant_logo"
                name="restaurant_logo"
                value={form.restaurantLogo}
                onChange={(e) => setForm((f) => ({ ...f, restaurantLogo: e.target.value }))}
                placeholder="Restaurant logo URL"
                aria-describedby="restaurant-logo-error"
                className="w-full rounded-md text-black bg-zinc-100 px-4 py-3 outline-none placeholder:text-black food-input"
              />
              {errs.restaurantLogo && (
                <p id="restaurant-logo-error" className="mt-1 text-sm text-red-500">{errs.restaurantLogo}</p>
              )}
            </div>

            <div>
              <label htmlFor="restaurant_status" className="sr-only">Restaurant status</label>
              <Dropdown<MealStatus>
                options={[
                  { label: "Open Now", value: "Open Now" },
                  { label: "Closed", value: "Closed" },
                ]}
                value={form.status}
                placeholder="Restaurant status (Open Now/Closed)"
                onChange={(v) => setForm((f) => ({ ...f, status: v }))}
              />
              {errs.status && (
                <p id="restaurant-status-error" className="mt-1 text-sm text-red-500">{errs.status}</p>
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <FoodButton
                text={loading ? (mode === "add" ? "Adding Food..." : "Updating Food...") : mode === "add" ? "Add Food" : "Save"}
                type="submit"
                styles="rounded-md text-center"
                disabled={!!loading}
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
              <FoodButton text={loading ? "Deleting..." : "Yes"} styles="rounded-md" onClick={onConfirmDelete} disabled={!!loading} />
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
