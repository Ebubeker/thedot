"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/assets/api/firebase";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { setCookie } from "nookies"; 

type LoginState = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginState>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginState> = (data) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast("Logged in", {
          type: "success",
        });

        user.getIdToken().then((value) =>{
          setCookie(null, "token", value, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          });
          router.push("/en/");
          setIsLoading(false);
        });

      })
      .catch(() => {
        toast("Email or password is wrong!", {
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
      <h1 className="text-center w-full font-bold text-3xl">Login</h1>
      <p className="text-black/70">Login into your account.</p>
      <div>
        <Input
          type="email"
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
              message: "Password is too short",
            },
            maxLength: {
              value: 20,
              message: "Password is too long",
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
        Do not have an account,{" "}
        <Link href={"/en/register"} className="text-black underline">
          Register
        </Link>
      </p>
      <Button className="cursor-pointer">
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" /> Please wait
          </>
        ) : (
          "Login"
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
