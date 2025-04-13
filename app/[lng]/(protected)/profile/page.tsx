"use client";

import MarketIcon from "@/assets/icons/market-stall-svgrepo-com.svg";
import FermaProfile from "@/assets/images/ferma-profile.jpg";
import ManageProducts from "@/components/profile/business/ManageProducts";
import Requests from "@/components/profile/business/Requests";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const page = () => {
  const { user, loading, userInfo, userInfoIsLoading } = useAuth();

  const router = useRouter();

  const handleLogout = () => {
    try {
      // Remove the token cookie directly
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Show success message
      toast.success("Logged out successfully");

      // Redirect to login page
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  return (
    <div className="mt-[100px] max-sm:mx-6 sm:container mx-auto">
      <div className="relative">
        <Image
          src={FermaProfile}
          alt="User info"
          className="w-full h-[300px] object-cover"
        />
        <div className="absolute left-[50%] -translate-x-[50%] -bottom-[100px] w-[200px] h-[200px] rounded-full bg-[#aeaeae] flex justify-center items-center">
          <p className="font-bold text-black/40 text-[100px]">
            {!loading && userInfo?.email
              ? userInfo.email.slice(0, 2).toUpperCase()
              : "?"}
          </p>
          {!userInfoIsLoading && userInfo?.type === "farmer" ? (
            <Image
              src={MarketIcon}
              alt="Market Icon"
              className="absolute bottom-[5px] right-[5px] w-[50px]"
            />
          ) : null}
          <p className="absolute text-center -bottom-[40px] left-[50%] -translate-x-[50%] font-semibold text-2xl w-[400px]">
            {userInfo?.email ? userInfo.email : false}{" "}
            <span className="text-black/60 !text-base">
              {!userInfoIsLoading && userInfo?.type === "farmer"
                ? `- ${userInfo.companyName}`
                : null}
            </span>
          </p>
        </div>
      </div>
      <p className="mt-[160px] text-black/70">
        {userInfo?.companyDescription ? userInfo.companyDescription : ""}
      </p>
      {!userInfoIsLoading && userInfo?.type === "farmer" ? (
        <>
          <ManageProducts />
          <Requests id={userInfo.id}/>
        </>
      ) : null}
      <p className="mt-[200px] text-xl font-semibold mb-4">Danger Zone</p>
      <button
        onClick={handleLogout}
        className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition-colors w-full cursor-pointer mb-[50px]"
      >
        Logout
      </button>
    </div>
  );
};

export default page;
