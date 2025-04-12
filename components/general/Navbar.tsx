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
import { useGetUser } from "@/assets/api/user";

const Navbar = () => {
  const {user} = useAuth();

  const {userInfo, isLoading} = useGetUser(user?.email ? user.email : '');

  return (
    <div className="fixed top-0 left-0 w-full bg-secondary py-3 shadow-md">
      <div className="container mx-auto items-center flex justify-between">
        <h1 className="font-bold text-2xl">TheDot.</h1>
        <div className="flex items-center gap-6">
          <Link href="/en/">Home</Link>
          <Link href="/en/marketplace">MarketPlace</Link>
          <Select
            onValueChange={(value) => console.log(value)}
            value="en-US"
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select account type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en-US">EN</SelectItem>
              <SelectItem value="shq">SHQ</SelectItem>
            </SelectContent>
          </Select>
          <Link href="/en/profile">
            <div className="!w-[40px] h-[40px] bg-gray-300 rounded-full flex justify-center items-center">
              <p className="font-bold text-black/40">{!isLoading && userInfo?.email ? userInfo.email.slice(0, 2).toUpperCase() : "?"}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
