"use client";

import React from "react";
import { useGetAllUsers } from "@/assets/api/user";
import { User } from "@/assets/api/user";
import { deleteUser } from "@/assets/api/user";

interface UserWithID extends User {
  id?: string;
}

const Users = () => {
  const { users, isLoading, refetch } = useGetAllUsers("personal");

  console.log(isLoading ? "isLoading" : users);

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
              <div className="w-1/5">
                <div className="!w-[40px] h-[40px] bg-gray-300 rounded-full flex justify-center items-center">
                  <p className="font-bold text-black/40">
                    {!isLoading && user.email
                      ? user.email.slice(0, 2).toUpperCase()
                      : "?"}
                  </p>
                </div>
              </div>
              <p className="w-1/5">{user.id}</p>
              <p className="w-1/5">{user.email}</p>
              <p className="w-1/5">{user.type}</p>
              <div className="w-1/5">
                <button
                  onClick={() => deleteUserHandler(user.id)}
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Users;
