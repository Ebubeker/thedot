"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useGetUser } from "@/assets/api/user";

const layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { userInfo } = useGetUser(user?.email ? user.email : "")


  if (!loading && userInfo?.type && userInfo.type !== "superadmin") {
    router.push("/en/");
  }

  if (!loading && userInfo?.type && userInfo.type === "superadmin") {
    return <div>{children}</div>;
  } else {
    return "";
  }
};

export default layout;
