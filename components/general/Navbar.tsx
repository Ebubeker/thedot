"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const {userInfo, userInfoIsLoading} = useAuth();

  return (
    <div className="fixed top-0 left-0 w-full bg-secondary py-3 shadow-md z-40">
      <div className="max-sm:mx-10 sm:container mx-auto items-center flex justify-between">
        <Link href="/en/" className="font-bold text-lg sm:text-2xl">TheDot.</Link>
        <div className="flex items-center gap-2 sm:gap-6 text-sm">
          <Link href="/en/marketplace">MarketPlace</Link>
          <Select
            onValueChange={(value) => console.log(value)}
            value="en-US"
            required
          >
            <SelectTrigger className="w-[68px] sm:w-full">
              <SelectValue placeholder="Select account type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en-US">EN</SelectItem>
              <SelectItem value="shq">SHQ</SelectItem>
            </SelectContent>
          </Select>
          <Link href="/en/profile">
            <div className="w-[30px] sm:!w-[40px] h-[30px] sm:h-[40px] bg-gray-300 rounded-full flex justify-center items-center">
              <p className="font-bold text-black/40">{!userInfoIsLoading && userInfo?.email ? userInfo.email.slice(0, 2).toUpperCase() : "?"}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
