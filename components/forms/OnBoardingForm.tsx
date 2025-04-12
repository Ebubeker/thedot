'use client';

import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useForm, SubmitHandler } from "react-hook-form"

type OnboardingState = {
  companyLogo: FileList
  companyName: string
  companyDescription: string
}

const OnboardingForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingState>()

  const onSubmit: SubmitHandler<OnboardingState> = (data) => {
    console.log({
      companyName: data.companyName,
      companyDescription: data.companyDescription,
      companyLogo: data.companyLogo[0],
    })
  }

  return (
    <form className='flex flex-col gap-4 w-[500px]' onSubmit={handleSubmit(onSubmit)}>
      <h1 className='text-center w-full font-bold text-3xl'>Onboarding</h1>
      <p className='text-black/70'>Tell us about your company to complete setup.</p>

      <div>
        <label className='text-sm font-medium'>Company Logo</label>
        <Input type="file" accept="image/*" {...register("companyLogo")} />
      </div>

      <Input
        type="text"
        placeholder="Company Name"
        {...register("companyName")}
      />

      <Textarea
        placeholder="Company Description"
        className='resize-none'
        {...register("companyDescription")}
      />

      <Button type="submit" className='cursor-pointer'>Finish Setup</Button>
    </form>
  )
}

export default OnboardingForm