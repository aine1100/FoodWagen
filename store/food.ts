"use client";

import { create } from "zustand";
import { apiCreateFood, apiDeleteFood, apiListFoods, apiUpdateFood, APIFood } from "@/lib/api";

export type FoodItem = APIFood;

type State = {
  items: FoodItem[];
  loading: boolean;
  error: string | null;
  query: string;
  _searchTimer?: number | null;
};

type Actions = {
  setQuery: (q: string) => void;
  fetch: (q?: string) => Promise<void>;
  add: (data: APIFood) => Promise<APIFood>;
  update: (id: string, data: APIFood) => Promise<APIFood>;
  remove: (id: string) => Promise<void>;
  search: (q: string) => void;
};

export const useFoodStore = create<State & Actions>((set, get) => ({
  items: [],
  loading: false,
  error: null,
  query: "",
  _searchTimer: null,

  setQuery: (q) => set({ query: q }),

  fetch: async (q) => {
    const query = q ?? get().query;
    set({ loading: true, error: null });
    try {
      const raw = await apiListFoods(undefined);
      // Deduplicate by normalized title + restaurant name
      const pickScore = (it: any) => {
        let s = 0;
        if (it.food_name) s += 3; else if (it.name) s += 1;
        if (it.food_image || it.image || it.avatar || it.imageUrl) s += 2;
        if (it.restaurant_name || it.restaurant?.name) s += 2;
        if (it.restaurant_logo || it.restaurant?.logo) s += 1;
        if (it.food_rating || it.rating) s += 1;
        return s;
      };
      const norm = (v?: string) => (v || "").toString().trim().toLowerCase();
      const map = new Map<string, any>();
      for (const it of raw) {
        const title = (it as any).food_name || (it as any).name || "";
        const rest = (it as any).restaurant_name || (it as any).restaurant?.name || "";
        const key = `${norm(title)}|${norm(rest)}`;
        const cur = map.get(key);
        if (!cur) map.set(key, it);
        else if (pickScore(it) > pickScore(cur)) map.set(key, it);
      }
      const items = Array.from(map.values());
      set({ items });
    } catch (e: any) {
      set({ error: e?.message || "Failed to load foods" });
    } finally {
      set({ loading: false });
    }
  },

  search: (q: string) => {
    const timer = get()._searchTimer;
    if (timer) {
      // @ts-ignore
      clearTimeout(timer);
    }
    set({ query: q });
    // @ts-ignore
    const newTimer = setTimeout(() => {
      get().fetch(q);
      set({ _searchTimer: null });
    }, 400);
    // @ts-ignore
    set({ _searchTimer: newTimer });
  },

  add: async (data) => {
    set({ loading: true, error: null });
    try {
      const created = await apiCreateFood(data);
      set({ items: [created, ...get().items] });
      return created;
    } catch (e: any) {
      set({ error: e?.message || "Failed to add food" });
      throw e;
    } finally {
      set({ loading: false });
    }
  },

  update: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const updated = await apiUpdateFood(id, data);
      set({ items: get().items.map((it) => (it.id === id ? updated : it)) });
      return updated;
    } catch (e: any) {
      set({ error: e?.message || "Failed to update food" });
      throw e;
    } finally {
      set({ loading: false });
    }
  },

  remove: async (id) => {
    set({ loading: true, error: null });
    try {
      await apiDeleteFood(id);
      set({ items: get().items.filter((it) => it.id !== id) });
    } catch (e: any) {
      set({ error: e?.message || "Failed to delete food" });
      throw e;
    } finally {
      set({ loading: false });
    }
  },
}));
