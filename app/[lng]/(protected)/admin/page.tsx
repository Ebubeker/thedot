import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Users from "@/components/admin/Users";
import Businesses from "@/components/admin/Businesses";

const Admin = () => {
  return (
    <div className="mt-[100px] container mx-auto">
      <h1 className="text-3xl font-bold mb-10">Admin Panel</h1>
      <Tabs defaultValue="account" className="">
        <TabsList className="grid w-full grid-cols-2 bg-white border-b-[4px] dark:border-[#EAEAEA] rounded-0 w-[400px]">
          <TabsTrigger value="account" className="rounded-0 cursor-pointer">
            Users
          </TabsTrigger>
          <TabsTrigger value="password" className="rounded-0 cursor-pointer">
            Businesses
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Users />
        </TabsContent>
        <TabsContent value="password">
          <Businesses />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
