'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import FarmProd from "@/assets/images/prod.jpg"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useGetProductById } from '@/assets/api/product'
import { useParams } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useGetUserWithID } from '@/assets/api/user'
import { addRequest } from '@/assets/api/kerkese'

const Product = () => {

  const { id: slug_id } = useParams<{
    id: string;
  }>();

  const {product} = useGetProductById(slug_id)

  const isAvailable = product ? product.available : false;

  const { userInfo: userInfoAuth } = useAuth();
  // const { userInfo } = useGetUserWithID(product ? product.businessId : '');

  const userRequest = () => {
    if(userInfoAuth?.id && product){
      addRequest({
        buyerId: userInfoAuth.id,
        sellerId: product.businessId,
        productIdRequested: product.id,
        status: 'pending'
      })
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl mt-[100px]">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        <div className="w-full md:w-1/2">
          <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center overflow-hidden">
            <Image 
              src={FarmProd} 
              alt={product ? product.name : ""}
              className="object-cover w-full h-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18dceb3c4e7%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18dceb3c4e7%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.9140625%22%20y%3D%22218.1%22%3EOrganic%20Tomatoes%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
              }}
            />
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <div className="flex justify-between items-start mb-2">
            <Badge variant={isAvailable ? "default" : "destructive"} className="mb-3">
              {isAvailable ? "In Stock" : "Out of Stock"}
            </Badge>
            <Badge variant="secondary">
              SKU: {product ? product.id : '--'}
            </Badge>
          </div>

          <h1 className="text-3xl font-bold tracking-tight mb-4">{product ? product.name : "--"}</h1>
          
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <span>{isAvailable ? 'Available for delivery' : 'Currently unavailable'}</span>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Price:</span>
              <span className="text-2xl font-bold text-primary">
                ALL {product ? product.price : "--"}
              </span>
            </div>
          </div>

          <div className="mb-6 space-y-3">
            {product?.information.pesticide ? (
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
                  <path d="M8.5 8.5v.01"></path>
                  <path d="M16 15.5v.01"></path>
                  <path d="M12 12v.01"></path>
                  <path d="M11 17v.01"></path>
                  <path d="M7 14v.01"></path>
                </svg>
                <span>Pesticide: {parseFloat(product?.information.pesticide) == 0 ? 'None (100% organic)' : 'Contains pesticides'}</span>
              </div>
            ) : null}
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>Growth duration: {product ? product.information['kohzgjatja e prodhimit'] : "--"}</span>
            </div>
            <div className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Farm location: {product ? product.addressa : '--'}</span>
            </div>
          </div>

          <Button className='cursor-pointer mb-6' onClick={userRequest}>Kërkesë për të blerë</Button>

          <div className="border-t pt-4 text-sm text-muted-foreground">
            <p>Harvested within the last 48 hours. Delivered fresh to your door.</p>
          </div>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-4">Product Details</h2>
        <div className="prose max-w-none">
          <p>{product ? product.description : '--'}</p>
          
        </div>
      </section>
    </div>
  )
}

export default Product