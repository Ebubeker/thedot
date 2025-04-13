"use client";

import { useState } from "react";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Search, RefreshCw } from "lucide-react";

import { FilterData } from "@/assets/api/product";
import React from "react";

const ProductFilters = ({
  params,
  setParams,
  onApplyFilters,
}: {
  params: FilterData;
  setParams: (value: FilterData) => void;
  onApplyFilters: () => void;
}) => {
  return (
    <Card className="mb-5">
      <CardContent className="space-x-4 space-y-6">
        <h1 className="text-xl font-bold">Filters</h1>
        <div className="flex gap-4">
          <Input type="text" placeholder="Search term..." onChange={(e)=>setParams({...params, search: e.target.value})}/>
          <Button onClick={()=>onApplyFilters()}>Search</Button>
        </div>
        <div className="flex gap-4">
          <Input type="number" className="w-[100px]" value={params.min} onChange={(e)=>setParams({...params, min: e.target.valueAsNumber ? e.target.valueAsNumber : 0})}/>
          <Input type="number" className="w-[100px]" value={params.max} onChange={(e)=>setParams({...params, max: e.target.valueAsNumber ? e.target.valueAsNumber : 0})}/>
        </div>
        <Button onClick={()=>onApplyFilters()} className="w-full">Filter</Button>
      </CardContent>
    </Card>
  );
};

export default ProductFilters;
