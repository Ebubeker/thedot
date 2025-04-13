'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const Product = () => {
  const [quantity, setQuantity] = React.useState(1)
  const [isAvailable, setIsAvailable] = React.useState(true)

  // Product data
  const product = {
    name: "Organic Heirloom Tomatoes",
    description: "Grown naturally without synthetic pesticides, these heirloom tomatoes are packed with flavor and nutrients. Perfect for salads, sauces, or fresh eating.",
    price: 4.99,
    pesticideFree: true,
    growthDuration: "70 days",
    farmLocation: "Sunny Valley Organic Farm, CA 90210",
    imageUrl: "/tomatoes.jpg" // Replace with your actual image path
  }

  const handleAddToCart = () => {
    if (isAvailable) {
      console.log(`Added ${quantity} ${product.name} to cart`)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Breadcrumbs */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 text-sm text-muted-foreground md:space-x-2">
          <li className="inline-flex items-center">
            <a href="#" className="inline-flex items-center hover:text-primary">Home</a>
          </li>
          <li>
            <div className="flex items-center">
              <span className="mx-1">/</span>
              <a href="#" className="hover:text-primary">Produce</a>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <span className="mx-1">/</span>
              <a href="#" className="hover:text-primary">Vegetables</a>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <span className="mx-1">/</span>
              <span className="text-foreground">Tomatoes</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Product Section */}
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center overflow-hidden">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="object-cover w-full h-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18dceb3c4e7%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18dceb3c4e7%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.9140625%22%20y%3D%22218.1%22%3EOrganic%20Tomatoes%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
              }}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2">
          <div className="flex justify-between items-start mb-2">
            <Badge variant={isAvailable ? "default" : "destructive"} className="mb-3">
              {isAvailable ? "In Stock" : "Out of Stock"}
            </Badge>
            <Badge variant="secondary">
              SKU: VEG-TOM-001
            </Badge>
          </div>

          <h1 className="text-3xl font-bold tracking-tight mb-4">{product.name}</h1>
          
          {/* Availability */}
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <span>{isAvailable ? 'Available for delivery' : 'Currently unavailable'}</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Price:</span>
              <span className="text-2xl font-bold text-primary">
                ${(product.price * quantity).toFixed(2)}
              </span>
              {quantity > 1 && (
                <span className="text-sm text-muted-foreground">
                  (${product.price.toFixed(2)} each)
                </span>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="mb-6 space-y-3">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
                <path d="M8.5 8.5v.01"></path>
                <path d="M16 15.5v.01"></path>
                <path d="M12 12v.01"></path>
                <path d="M11 17v.01"></path>
                <path d="M7 14v.01"></path>
              </svg>
              <span>Pesticide: {product.pesticideFree ? 'None (100% organic)' : 'Contains pesticides'}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>Growth duration: {product.growthDuration}</span>
            </div>
            <div className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Farm location: {product.farmLocation}</span>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Quantity (lbs):</h2>
            <div className="flex items-center border rounded-md w-fit">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-10 w-10"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={!isAvailable}
              >
                -
              </Button>
              <span className="w-10 text-center">{quantity}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-10 w-10"
                onClick={() => setQuantity(quantity + 1)}
                disabled={!isAvailable}
              >
                +
              </Button>
            </div>
          </div>

          {/* Add to Cart */}
          <Button 
            className="w-full mb-6 py-6 text-lg" 
            size="lg"
            onClick={handleAddToCart}
            disabled={!isAvailable}
          >
            {isAvailable ? 'Add to cart' : 'Notify when available'}
          </Button>

          {/* Delivery Info */}
          <div className="border-t pt-4 text-sm text-muted-foreground">
            <p>Harvested within the last 48 hours. Delivered fresh to your door.</p>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-4">Product Details</h2>
        <div className="prose max-w-none">
          <p>{product.description}</p>
          
          <h3 className="text-lg font-semibold mt-6">Growing Information:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Variety: Heirloom Brandywine</li>
            <li>Plant type: Indeterminate (vining)</li>
            <li>Days to maturity: {product.growthDuration}</li>
            <li>Fruit size: 8-12 oz</li>
            <li>Color: Deep pink with green shoulders</li>
          </ul>

          <h3 className="text-lg font-semibold mt-6">Nutritional Benefits:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>High in lycopene (antioxidant)</li>
            <li>Excellent source of vitamin C</li>
            <li>Good source of vitamin K and potassium</li>
            <li>Low calorie (about 22 calories per medium tomato)</li>
          </ul>

          <h3 className="text-lg font-semibold mt-6">Storage Tips:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Store at room temperature for best flavor</li>
            <li>Refrigerate only if overripe (cold diminishes flavor)</li>
            <li>Consume within 3-5 days for peak freshness</li>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default Product