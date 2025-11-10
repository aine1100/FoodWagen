"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export type Option<T extends string = string> = { label: string; value: T };

type Props<T extends string = string> = {
  options: Option<T>[];
  value?: T | "";
  placeholder?: string;
  onChange?: (value: T) => void;
  className?: string;
};

export default function Dropdown<T extends string = string>({
  options,
  value = "",
  placeholder = "Select",
  onChange,
  className,
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!open) return;
      const t = e.target as Node;
      if (btnRef.current?.contains(t)) return;
      if (menuRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const current = options.find((o) => o.value === value);

  return (
    <div className={`relative ${className ?? ""}`}>
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="w-full rounded-md bg-zinc-100 px-4 py-3 text-left text-black hover:bg-zinc-200/60 focus:outline-none inline-flex items-center justify-between"
      >
        <span className={current ? "" : "text-black"}>{current ? current.label : placeholder}</span>
        <ChevronDown size={16} className="text-black" />
      </button>
      {open && (
        <div
          ref={menuRef}
          role="listbox"
          className="absolute z-20 mt-2 w-full rounded-md border border-zinc-100 bg-white shadow-lg"
        >
          {options.map((o) => (
            <button
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              onClick={() => {
                setOpen(false);
                onChange?.(o.value);
              }}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-zinc-50 ${
                o.value === value ? "text-foodPrimary" : "text-zinc-800"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
