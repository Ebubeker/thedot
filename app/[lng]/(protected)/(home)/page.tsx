"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ProductList from "@/components/home/ProductList";

export default function Home() {
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
    <div className="container mx-auto my-[100px]">
      <ProductList />
      <button
        onClick={handleLogout}
        className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition-colors"
      >
        Logout
      </button>
    </div>
  );
}
