"use client";
import React, { useState } from "react";
import Image from "next/image";
import dishImage from "../../public/dish.png";
import { MoreVertical, Star, Tag } from "lucide-react";
import companyImage from "../../public/company.png"


type MealCardProps = {
    title: string;
    price: string;
    status?: "Open" | "Closed";
    rating?: number;
    onEdit?: () => void;
    onDelete?: () => void;
};

export default function MealCard({ title, price, status = "Open", rating = 4.5, onEdit, onDelete }: MealCardProps) {
    const [open, setOpen] = useState(false);
    return (
        <div className="rounded-md overflow-hidden bg-white shadow-sm ring-1 ring-zinc-100">
            <div className="relative h-44 w-full">
                <Image src={dishImage} alt={title} fill className="object-cover" sizes="(min-width: 1024px) 25vw, 50vw" />
                <div className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full bg-foodPrimary text-white px-2.5 py-1 text-xs font-semibold shadow-[0_6px_14px_rgba(241,114,40,0.35)]">
                    <Tag size={14} className="text-white" />
                    <span>{price}</span>
                </div>
            </div>
            <div className="p-4 space-y-2">
                <div className=" space-x-2 flex">
                    <Image src={companyImage} alt="company" height={50} width={50} className="rounded-md" />
                    <div className="flex flex-col space-y-2 flex-1">
                        <div className="relative flex items-start justify-between">
                            <h3 className="font-semibold text-md text-zinc-800">{title}</h3>
                            <div className="relative">
                                <button
                                  type="button"
                                  aria-haspopup="menu"
                                  aria-expanded={open}
                                  onClick={() => setOpen((v) => !v)}
                                  className="p-1 rounded-full hover:bg-zinc-100"
                                >
                                  <MoreVertical size={18} className="text-zinc-500" />
                                </button>
                                {open && (
                                  <div className="absolute right-0 mt-2 w-32 rounded-md border border-zinc-100 bg-white shadow-lg z-10">
                                    <button onClick={() => { setOpen(false); onEdit?.(); }} className="w-full text-left px-3 py-2 text-sm text-zinc-800 hover:bg-zinc-50">Edit</button>
                                    <button onClick={() => { setOpen(false); onDelete?.(); }} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50">Delete</button>
                                  </div>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <div className="flex items-center gap-1 text-amber-500">
                                <Star size={16} fill="currentColor" className="text-amber-500" />
                                <span className="text-zinc-700">{rating}</span>
                            </div>
                        </div>

                    </div>

                </div>

                <div className={`px-2 py-0.5 text-center w-[70px] rounded-full ${status === "Open" ? "bg-green-100 text-green-700" : "bg-orange-100 text-foodPrimary"}`}>{status}</div>


            </div>

        </div>
    );
}
