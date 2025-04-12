import React from 'react'
import Image from 'next/image';
import Ferma from '@/assets/images/ferma.jpg'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='flex'>
      <div className='p-10 w-1/2 h-[100vh]'>
        <Image src={Ferma} alt='Auth Image' className='w-full h-full object-cover rounded-3xl'/>
      </div>
      <div className='w-1/2 flex justify-center items-center'>
        {children}
      </div>
    </div>
  )
}

export default layout
