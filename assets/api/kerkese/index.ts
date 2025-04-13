import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  query,
  updateDoc,
  where,
  documentId,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { useState, useEffect } from "react";

export interface BuyerSellerInteraction {
  buyerId: string;
  sellerId: string;
  productIdRequested: string;
  status: "pending" | "accepted" | "rejected";
}

export const useGetRequestWithID = (id: string) => {
  const [requests, setRequests] = useState<
    (BuyerSellerInteraction & { id: string })[] | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [refetchToggle, setRefetchToggle] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const q = query(
          collection(db, "requests"),
          where("sellerId", "==", id)
        );
        const querySnapshot = await getDocs(q);

        const fetchedRequests: (BuyerSellerInteraction & { id: string })[] = [];
        querySnapshot.forEach((doc) => {
          fetchedRequests.push({
            ...(doc.data() as BuyerSellerInteraction),
            id: doc.id,
          });
        });

        setRequests(fetchedRequests);
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id, refetchToggle]);

  return {
    requests: requests,
    isLoading,
    refetch: () => setRefetchToggle((prev) => !prev),
  };
};

export const addRequest = async (request: BuyerSellerInteraction) => {
  return await addDoc(collection(db, "requests"), request);
};

export const editRequest = async (
  requestId: string,
  request: BuyerSellerInteraction
) => {
  console.log(requestId, request);
  const requestRef = doc(db, "requests", requestId);
  await updateDoc<BuyerSellerInteraction, BuyerSellerInteraction>(
    requestRef,
    request
  );
};

export const deleteRequest = async (requestId: string) => {
  await deleteDoc(doc(db, "requests", requestId));
};
