import HomeNav from "@/app/components/HomeNav"
import Image from "next/image";
import food1 from "@/FoodImages/pexels-ash-376464.jpg"
import food2 from "@/FoodImages/pexels-lisa-fotios-1279330.jpg"
import food3 from "@/FoodImages/pexels-malidate-van-769289.jpg"
import food4 from "@/FoodImages/pexels-burst-544961.jpg"
import food5 from "@/FoodImages/pexels-lina-kivaka-1459338.jpg"



export default function Home() {


  return (
    <div>
      <HomeNav/>
    <main>
      <div className="flex justify-center">
      <div className="grid md:grid-cols-2 my-10 mx-5 gap-5">
      <div className="grid gap-5">
      <Image className="rounded" src={food1} width={500} height={500} alt="food1"/>
      <Image className="rounded" src={food2} width={500} height={500} alt="food2"/>
      <Image className="rounded" src={food3} width={500} height={500} alt="food3"/>
      </div>
      <div className="grid gap-5">
      <Image className="rounded" src={food4} width={500} height={500} alt="food4"/>
      <Image className="rounded" src={food5} width={500} height={500} alt="food5"/>
      </div>
      </div>
      </div>
    </main>
    </div>
  );
}
