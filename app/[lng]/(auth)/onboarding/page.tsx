import React from 'react'
import OnboardingForm from '@/components/forms/OnBoardingForm'
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'OnBoarding | TheDot.',
}
const OnBoarding = () => {
  return (
    <OnboardingForm />
  )
}

export default OnBoarding
