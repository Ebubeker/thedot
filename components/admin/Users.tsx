"use client";

import React from "react";
import { useGetAllUsers } from "@/assets/api/user";
import { User } from "@/assets/api/user";
import { deleteUser } from "@/assets/api/user";
import TrashIcon from "@/assets/icons/trash.svg"
import Image from "next/image";

interface UserWithID extends User {
  id?: string;
}

const Users = () => {
  const { users, isLoading, refetch } = useGetAllUsers("personal");

  const deleteUserHandler = (id: string) => {
    deleteUser(id)
    refetch()
  };

  return (
    <div className="mt-2">
      {isLoading
        ? "Loading the users..."
        : users.map((user: UserWithID) => (
            <div className="flex items-center justify-between w-full mb-4" key={user.id}>
              <div className="w-2/12 lg:w-1/5">
                <div className="!w-[40px] h-[40px] bg-gray-300 rounded-full flex justify-center items-center">
                  <p className="font-bold text-black/40">
                    {!isLoading && user.email
                      ? user.email.slice(0, 2).toUpperCase()
                      : "?"}
                  </p>
                </div>
              </div>
              <p className="max-md:hidden w-1/4 lg:w-1/5">{user.id}</p>
              <p className="w-full md:w-1/4 lg:w-1/5">{user.email}</p>
              <p className="max-lg:hidden w-1/5">{user.type}</p>
              <div className="min-w-[80px]">
                <button
                  onClick={() => deleteUserHandler(user.id)}
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer"
                >
                  <Image src={TrashIcon} alt="Trash" className="w-[20px] text-white"/>
                </button>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Users;
