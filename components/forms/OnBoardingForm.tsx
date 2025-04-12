"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler } from "react-hook-form";
import { editUser } from "@/assets/api/user";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type OnboardingState = {
  companyName: string;
  companyDescription: string;
};

const OnboardingForm = () => {
  const [userId, setUserId] = useState<undefined | string>(undefined);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingState>();
  const router = useRouter();

  const onSubmit: SubmitHandler<OnboardingState> = (data) => {
    if (userId) {
      editUser(userId, data).then(() => {
        toast("Company information updated", {
          type: "success",
        });
        router.push("/en/login");
      });
    }
    if (typeof window !== "undefined") {
      localStorage.removeItem("userId");
    }
  };

  useEffect(() => {
    let value: string | null = null;

    if (typeof window !== "undefined") {
      value = localStorage.getItem("userId");
      setUserId(value ?? undefined);
    }
  }, []);

  return (
    <form
      className="flex flex-col gap-4 w-[500px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-center w-full font-bold text-3xl">Onboarding</h1>
      <p className="text-black/70">
        Tell us about your company to complete setup.
      </p>
      <Input
        type="text"
        placeholder="Company Name"
        {...register("companyName")}
      />
      <Textarea
        placeholder="Company Description"
        className="resize-none"
        {...register("companyDescription")}
      />
      <Button type="submit" className="cursor-pointer">
        Finish Setup
      </Button>
    </form>
  );
};

export default OnboardingForm;
