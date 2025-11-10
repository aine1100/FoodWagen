import Image from "next/image"
import logoImage from "../../public/logo.png"
import FoodButton from "../utils/button"
export default function HeaderSection({ onAddMeal }: { onAddMeal?: () => void }){
    return(
        <section className="bg-white py-3 px-4 sm:px-6 md:px-10 lg:px-20 w-full">
            <div className="mx-auto max-w-6xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <Image src={logoImage} alt="logo image" width={30} height={30}/>
                    <p className="text-foodPrimary font-bold text-xl">Food<span className="text-foodSecondary">Wagen</span></p>
                </div>
                <FoodButton text="Add Food" styles="rounded-xl bg-foodSecondary px-4 py-2 text-sm md:text-base" onClick={onAddMeal} />
            </div>
        </section>
    )

}