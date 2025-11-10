"use client";

import { useNotify } from "@/store/notify";

export default function ToastContainer() {
  const { notices, remove } = useNotify();
  return (
    <div className="fixed top-4 right-4 z-[100] space-y-2">
      {notices.map((n) => (
        <div
          key={n.id}
          className={`rounded-md px-4 py-3 shadow text-white ${
            n.type === "success" ? "bg-green-600" : n.type === "error" ? "bg-red-600" : "bg-zinc-800"
          }`}
          role="status"
        >
          <div className="flex items-center gap-3">
            <span>{n.message}</span>
            <button className="ml-2 text-white/80 hover:text-white" onClick={() => remove(n.id)}>
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
