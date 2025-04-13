"use client";

import ProductList from "@/components/home/ProductList";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const {userInfo} = useAuth();

  return (
    <div className="max-sm:mx-6 sm:container mx-auto my-[100px]">
      <div className="bg-gray-200 p-10 rounded-2xl">
        <h1 className="font-bold text-xl">Welcome back {userInfo?.email}!</h1>
        <p className="text-black/70 mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore id, nemo non voluptatum nam enim aspernatur earum cumque expedita, cupiditate iste ex quisquam eum saepe, tenetur quidem veritatis explicabo a eos error iusto fugiat. Error facere alias atque nihil nisi. Consequatur, labore quod perspiciatis possimus fuga nisi amet repellat veritatis.</p>
      </div>
      <ProductList />
    </div>
  );
}
