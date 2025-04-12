'use client';

import React from 'react'
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useForm, SubmitHandler } from "react-hook-form"

type LoginState = {
  email: string
  password: string
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginState>()

  const onSubmit: SubmitHandler<LoginState> = (data) => console.log(data)

  return (
    <form className='flex flex-col gap-4 w-[400px]' onSubmit={handleSubmit(onSubmit)}>
      <h1 className='text-center w-full font-bold text-3xl'>Login</h1>
      <p className='text-black/70'>Login into your account.</p>
      <Input type="email" placeholder="Email" {...register("email")} />
      <Input type="password" placeholder="Password" {...register("password")}/>
      <p className='text-black/70'>Do not have an account, <Link href={"/en/register"} className='text-black underline'>Register</Link></p>
      <Button className='cursor-pointer'>Login</Button>
    </form>
  )
}

export default LoginForm
