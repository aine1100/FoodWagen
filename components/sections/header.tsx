import Image from "next/image"
import logoImage from "../../public/logo.png"
import FoodButton from "../utils/button"
export default function HeaderSection({ onAddMeal }: { onAddMeal?: () => void }){
    return(
        <section className="bg-white py-3 px-20 flex flex-1 w-full justify-between">
            <div className="flex items-center gap-3">
                <Image src={logoImage} alt="logo image" width={30} height={30}/>
                <p className="text-foodPrimary font-bold text-xl">Food<span className="text-foodSecondary">Wagen</span></p>
            </div>
                          <FoodButton text="Add Meal" styles="rounded-xl bg-foodSecondary" onClick={onAddMeal} />
            


        </section>
    )

}