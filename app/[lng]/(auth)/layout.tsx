import Ferma from "@/assets/images/ferma.jpg";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from 'next/navigation';
import React from "react";

const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    redirect("/en");
  }

  return (
    <div className="flex">
      <div className="p-10 w-1/2 h-[100vh]">
        <Image
          src={Ferma}
          alt="Auth Image"
          className="w-full h-full object-cover rounded-3xl"
        />
      </div>
      <div className="w-1/2 flex justify-center items-center">{children}</div>
    </div>
  );
};

export default layout;
