import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";

interface ProductInfo {
  pesticide: string;
  "perqinddja e perberjes"?: string;
  "kohzgjatja e prodhimit": string;
  type: string;
}

export interface Product {
  name: string;
  description: string;
  information: ProductInfo;
  addressa: string;
  available: boolean;
  price: number;
  businessId: string;
}

export interface FilterData {
  min: number;
  max: number;
  search: string;
}

export const useGetProductById = (productId?: string) => {
  const [product, setProduct] = useState<(Product & { id: string }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchProduct = async () => {
    if (!productId) {
      toast("Product ID is required", { type: "error" });
      setError("Product ID is required");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const productRef = doc(db, "products", productId);
      const productSnap = await getDoc(productRef);

      if (!productSnap.exists()) {
        toast("Product not found", { type: "error" });
        setError("Product not found");
        setProduct(null);
        return;
      }

      setProduct({
        id: productSnap.id,
        ...productSnap.data(),
      } as Product & { id: string });
    } catch (err) {
      console.error("Error fetching product by ID:", err);
      toast("Error fetching product", { type: "error" });
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  return { product, loading, error, refetch: fetchProduct };
};


export const addProduct = async (data: Product) => {
  try {
    const {
      name,
      description,
      information,
      addressa,
      available,
      price,
      businessId,
    } = data as Product;

    if (
      !name ||
      !description ||
      !information ||
      !addressa ||
      typeof available !== "boolean" ||
      typeof price !== "number" ||
      !businessId
    ) {
      toast("invalid-argument Missing fields", {
        type: "error",
      });
      return { success: false, error: "Missing fields" };
    }

    const productRef = await addDoc(collection(db, "products"), {
      name,
      description,
      information,
      addressa,
      available,
      price,
      businessId,
    });

    return { success: true, id: productRef.id };
  } catch (error) {
    console.error("Error adding product:", error);
    toast("Error adding product", {
      type: "error",
    });
    return { success: false, error };
  }
};

export const useGetProducts = (businessId?: string) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<(Product & { id: string })[]>([]);
  const [error, setError] = useState<any>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let q;
      if (businessId) {
        q = query(
          collection(db, "products"),
          where("businessId", "==", businessId)
        );
      } else {
        q = query(collection(db, "products"));
      }

      const querySnapshot = await getDocs(q);
      const productsData: (Product & { id: string })[] = [];

      querySnapshot.forEach((doc) => {
        productsData.push({
          id: doc.id,
          ...doc.data(),
        } as Product & { id: string });
      });

      setProducts(productsData);
      return { success: true, products: productsData };
    } catch (error) {
      console.error("Error getting products:", error);
      toast("Error getting products", { type: "error" });
      setError(error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [businessId]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
};

export const updateProduct = async (
  productId: string,
  data: Partial<Product>
) => {
  try {
    if (!productId) {
      toast("Product ID is required", { type: "error" });
      return { success: false, error: "Product ID is required" };
    }

    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, data);

    return { success: true };
  } catch (error) {
    console.error("Error updating product:", error);
    toast("Error updating product", { type: "error" });
    return { success: false, error };
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    if (!productId) {
      toast("Product ID is required", { type: "error" });
      return { success: false, error: "Product ID is required" };
    }

    const productRef = doc(db, "products", productId);
    await deleteDoc(productRef);

    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    toast("Error deleting product", { type: "error" });
    return { success: false, error };
  }
};
