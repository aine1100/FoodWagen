import FoodButton from "@/components/utils/button";
import Image from "next/image";
import dishImage from "../../public/dish.png";
import { Motorbike, ShoppingBag } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-r from-foodSecondary to-foodPrimary">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        <div className="text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">Are you starving?</h1>
          <p className="mt-3 text-white/90">Within a few clicks, find meals that are accessible near you</p>

          <div className="mt-8 bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center gap-2">
              <button className="px-3 py-2 flex gap-2 rounded-sm bg-orange-100 text-foodPrimary font-medium"><Motorbike/> Delivery</button>
              <button className="px-3 py-2 flex gap-2 rounded-sm text-zinc-600 hover:bg-zinc-100"><ShoppingBag/>Pickup</button>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1 flex items-center gap-2 bg-zinc-100 rounded-full px-4 py-3 text-zinc-600">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <input
                  type="text"
                  placeholder="What do you like to eat today?"
                  className="flex-1 bg-transparent outline-none placeholder:text-zinc-400"
                />
              </div>
              <FoodButton text="Find Meal" styles="rounded-sm" />
            </div>
          </div>
        </div>

            <Image
              src={dishImage}
              alt="Dish"
              height={400}
              width={400}
              sizes="400px"
              className="object-cover"
              
            />
      </div>
    </section>
  );
}
