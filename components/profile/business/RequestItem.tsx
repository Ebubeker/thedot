import { BuyerSellerInteraction } from "@/assets/api/kerkese";
import React from "react";
import { v4 } from "uuid";
import { useGetUserWithID } from "@/assets/api/user";
import { useGetProductById } from "@/assets/api/product";
import { Button } from "@/components/ui/button";
import { editRequest } from "@/assets/api/kerkese";
import { toast } from "react-toastify";

const RequestItem = ({ request, refetch }: { request: BuyerSellerInteraction & {id: string}, refetch: () => void }) => {
  const { userInfo } = useGetUserWithID(request.buyerId);
  const { product } = useGetProductById(request.productIdRequested);

  const accepRequest = () => {
    const newReq: BuyerSellerInteraction = {
      sellerId: request.sellerId,
      buyerId: request.buyerId,
      productIdRequested: request.productIdRequested,
      status: 'accepted'
    }
    editRequest(request.id, newReq).then(()=>{
      toast("Request accepted!!", {
        type: "success"
      })
      refetch()
    })
  }

  const rejectRequest = () => {
    const newReq: BuyerSellerInteraction = {
      sellerId: request.sellerId,
      buyerId: request.buyerId,
      productIdRequested: request.productIdRequested,
      status: 'rejected'
    }
    editRequest(request.id, newReq).then(()=>{
      toast("Request Rejected!!", {
        type: "error"
      })
      refetch()
    })
  }

  return (
    <div className="flex justify-between items-center mb-2" key={v4()}>
      <p className="w-1/3 sm:w-1/4 truncate">{userInfo?.email}</p>
      <p className="w-1/3 sm:w-1/4 truncate">{product?.name}</p>
      <p className="max-sm:hidden w-1/4">{request.status}</p>
      <div className="w-1/3 sm:w-1/4 truncate flex justify-end gap-1 sm:gap-4">
        <Button color="success" onClick={accepRequest} className="max-sm:px-2 max-sm:py-1">Accept</Button>
        <Button color="success" onClick={rejectRequest} className="max-sm:px-2 max-sm:py-1">Reject</Button>
      </div>
    </div>
  );
};

export default RequestItem;
