import React from "react";
import { useGetRequestWithID } from "@/assets/api/kerkese";
import RequestItem from "./RequestItem";

const Requests = ({id}: {id:string}) => {

  const {requests, refetch} = useGetRequestWithID(id)

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold my-6">Requests</h1>
      </div>
      <div className="mt-4">
        <div className="flex justify-between font-semibold mb-2">
          <p className="w-1/3 sm:w-1/4">Buyer</p>
          <p className="w-1/3 sm:w-1/4">Product</p>
          <p className="max-sm:hidden w-1/4">Status</p>
          <p className="w-1/3 sm:w-1/4 flex justify-end">Actions</p>
        </div>
        {requests
          ? requests.map((request) => (
              <RequestItem request={request} refetch={refetch}/>
            ))
          : "Loading Requests..."}
      </div>
    </div>
  );
};

export default Requests;
