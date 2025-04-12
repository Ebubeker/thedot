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
import { addUser } from "@/assets/api/user";

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
    formState: { errors },
  } = useForm<RegisterState>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterState> = (data) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setIsLoading(false);
        addUser({
          email: data.email,
          type: data.accountType,
        })
          .then((value) => {
            const userId = value._key.path.segments[1];
            if (typeof window !== "undefined") {
              localStorage.setItem("userId", userId);
            }
            if (data.accountType === "farmer") {
              toast("Farmer account created", {
                type: "success",
              });
              router.push("/en/onboarding");
            } else {
              toast("Personal account created", {
                type: "success",
              });
              router.push("/en/");
            }
          })
          .catch((error) => {
            toast(`${error.message}`, {
              type: "error",
            });
            setIsLoading(false);
          });
      })
      .catch((error) => {
        toast(`${error.message}`, {
          type: "error",
        });
        setIsLoading(false);
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
        required
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select account type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="personal">Personal</SelectItem>
          <SelectItem value="farmer">Farmer</SelectItem>
        </SelectContent>
      </Select>
      <div>
        <Input
          placeholder="Email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email ? (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        ) : null}
      </div>
      <div>
        <Input
          type="password"
          placeholder="Password"
          {...register("password", {
            minLength: {
              value: 8,
              message: "Password should be between 8-20 characters",
            },
            maxLength: {
              value: 20,
              message: "Password should be between 8-20 characters",
            },
            required: {
              value: true,
              message: "Password is required",
            },
            pattern: {
              value: /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/,
              message: "Invalid password format",
            },
          })}
        />
        {errors.password ? (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        ) : null}
      </div>

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
