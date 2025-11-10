"use client";
import React, { useState } from "react";
import Image from "next/image";
import dishImage from "../../public/dish.png";
import companyImage from "../../public/company.png"
import { MoreVertical, Star, Tag } from "lucide-react";

type MealCardProps = {
    item?:any;
    title: string;
    price: string;
    status?: "Open" | "Open Now" | "Closed";
    rating?: number;
    onEdit?: () => void;
    onDelete?: () => void;
    imageUrl?: string;
    restaurantLogo?: string;
};

export default function MealCard({ title, price, status = "Open", rating = 4.5, onEdit, onDelete, imageUrl, restaurantLogo }: MealCardProps) {
    const [open, setOpen] = useState(false);
    const normStatus = /open/i.test(status || "") ? "Open Now" : "Closed";
    return (
        <article className="food-hover food-slide-up h-full flex flex-col rounded-md bg-white shadow-sm ring-1 ring-zinc-100" data-test-id="food-card">
            <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-t-md">
                {imageUrl ? (
                  <Image src={imageUrl} alt={title} fill className="object-cover" sizes="(min-width: 1024px) 25vw, 50vw" unoptimized />
                ) : (
                  <Image src={dishImage} alt={title} fill className="object-cover" sizes="(min-width: 1024px) 25vw, 50vw" />
                )}
                <div className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full bg-foodPrimary text-white px-2.5 py-1 text-xs font-semibold shadow-[0_6px_14px_rgba(241,114,40,0.35)] food-price">
                    <Tag size={14} className="text-white" />
                    <span>${price}</span>
                </div>
            </div>
            <div className="p-4 flex flex-col gap-3 grow">
                <div className="flex items-start gap-2 w-full">
                    {restaurantLogo ? (
                      <Image src={restaurantLogo} alt="company" height={50} width={50} className="rounded-md restaurant-logo" unoptimized />
                    ) : (
                      <Image src={companyImage} alt="company" height={50} width={50} className="rounded-md restaurant-logo" />
                    )}
                    <div className="flex flex-col gap-2 flex-1 min-h-[56px]">
                        <div className="relative flex items-start justify-between gap-2">
                            <h3 className="food-name text-sm font-semibold text-zinc-800 truncate" title={title}>{title}</h3>
                            <div className="relative z-20">
                                <button
                                  type="button"
                                  aria-haspopup="menu"
                                  aria-expanded={open}
                                  onClick={() => setOpen((v) => !v)}
                                  className="p-1 rounded-full hover:bg-zinc-100"
                                  data-test-id="food-menu-btn"
                                >
                                  <MoreVertical size={18} className="text-zinc-500" />
                                </button>
                                {open && (
                                  <div className="absolute right-0 mt-2 w-32 rounded-md border border-zinc-100 bg-white shadow-lg z-30">
                                    <button data-test-id="food-edit-btn" onClick={() => { setOpen(false); onEdit?.(); }} className="w-full text-left px-3 py-2 text-sm text-zinc-800 hover:bg-zinc-50">Edit</button>
                                    <button data-test-id="food-delete-btn" onClick={() => { setOpen(false); onDelete?.(); }} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50">Delete</button>
                                  </div>
                                )}
                            </div>
                        </div>
                        <div className="mt-auto flex items-center gap-3 text-sm">
                            <div className="food-rating flex items-center gap-1 text-amber-500">
                                <Star size={16} fill="currentColor" className="text-amber-500" />
                                <span className="text-zinc-700">{rating}</span>
                            </div>
                            <div className={`restaurant-status px-2 py-0.5 text-center rounded-full ${normStatus === "Open Now" ? "bg-green-100 text-green-700" : "bg-orange-100 text-foodPrimary"}`}>{normStatus}</div>
                        </div>

                    </div>

                </div>

            </div>

        </article>
    );
}
