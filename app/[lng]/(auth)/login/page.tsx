import React from "react";
import LoginForm from "@/components/forms/Login";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Login | TheDot.',
}

const Login = () => {
  return <LoginForm />;
};

export default Login;
