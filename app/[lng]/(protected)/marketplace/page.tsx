'use client'

import React, { useEffect, useState } from "react";
import { FilterData, Product } from "@/assets/api/product";
import ProductItem from "@/components/home/ProductItem";
import ProductFilters from "@/components/marketplace/ProductFilters";
import { useGetProducts } from "@/assets/api/product";
import { searchObjects } from "@/lib/utlis/helpers";

const Marketplace = () => {
  const [filters, setFilters] = useState<FilterData>({
    search: "",
    min: 0,
    max: 10000
  });
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { products } = useGetProducts();

  function filterApplyHandler () {
    setFilteredProducts(searchObjects(products, "name", filters.search, "price", filters.min, filters.max))
  }

  useEffect(() => {
    setFilteredProducts(searchObjects(products, "name", "", "price", filters.min, filters.max))
  }, [products])

  return (
    <div className="mt-[100px] max-sm:mx-6 sm:container mx-auto">
      <ProductFilters params={filters} setParams={setFilters} onApplyFilters={filterApplyHandler}/>
      <p className="mb-4 text-sm text-black/70">Results ({filteredProducts.length})</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.map((item, idx) => (
          <ProductItem item={item} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
