import React from 'react'
import RegisterForm from '@/components/forms/RegisterForm'
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Register | TheDot.',
}
const Register = () => {
  return (
    <RegisterForm />
  )
}

export default Register
