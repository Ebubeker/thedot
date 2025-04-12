"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { auth } from "@/assets/api/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type RegisterState = {
  email: string;
  password: string;
  accountType: "personal" | "farmer";
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterState>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterState> = (data) => {
    setIsLoading(true)
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsLoading(false)
        if (data.accountType === "farmer") {
          toast("Farmer account created", {
            type: "success",
          });
          router.push("/en/onboarding/");
        } else {
          toast("Personal account created", {
            type: "success",
          });
          router.push("/en/");
        }
      })
      .catch((error) => {
        toast(`${error.message}`);
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // console.log(errorCode, errorMessage)
      });
  };

  return (
    <form
      className="flex flex-col gap-4 w-[400px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-center w-full font-bold text-3xl">Register</h1>
      <p className="text-black/70">Create a new account.</p>
      <Select
        onValueChange={(value) =>
          setValue("accountType", value as "personal" | "farmer")
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select account type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="personal">Personal</SelectItem>
          <SelectItem value="farmer">Farmer</SelectItem>
        </SelectContent>
      </Select>
      <Input type="email" placeholder="Email" {...register("email")} />
      <Input type="password" placeholder="Password" {...register("password")} />

      <p className="text-black/70">
        Already have an account?{" "}
        <Link href={"/en/login"} className="text-black underline">
          Login
        </Link>
      </p>
      <Button className="cursor-pointer" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" /> Please wait
          </>
        ) : (
          "Register"
        )}
      </Button>
    </form>
  );
};

export default RegisterForm;
