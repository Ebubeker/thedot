import React from 'react'
import { verifyToken } from '@/lib/verifyToken';
import { parseCookies } from "nookies";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'
import Navbar from '@/components/general/Navbar';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home | TheDot.',
}
const layout = async ({children}: {children: React.ReactNode}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  let user = null;
  
  if (token) {
    try {
      const verifiedToken = await verifyToken(token);
      user = verifiedToken;
    } catch (error) {
      console.error("Token verification failed:", error);
    }
  }else {
    redirect("/en/login/");
  }

  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default layout
