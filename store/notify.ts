"use client";

import { create } from "zustand";

export type NoticeType = "success" | "error" | "info";
export type Notice = { id: string; type: NoticeType; message: string };

type State = {
  notices: Notice[];
};

type Actions = {
  push: (type: NoticeType, message: string) => void;
  remove: (id: string) => void;
};

export const useNotify = create<State & Actions>((set, get) => ({
  notices: [],
  push: (type, message) => {
    const id = Math.random().toString(36).slice(2);
    set({ notices: [...get().notices, { id, type, message }] });
    // auto-remove after 3s
    setTimeout(() => {
      const cur = get().notices.filter((n) => n.id !== id);
      set({ notices: cur });
    }, 3000);
  },
  remove: (id) => set({ notices: get().notices.filter((n) => n.id !== id) }),
}));
