import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { db } from "../firebase";

export interface User {
  email?: string;
  type?: "personal" | "farmer" | "superadmin";
  companyName?: string;
  companyDescription?: string;
}

export const useGetAllUsers = (type?: 'personal' | 'farmer') => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = useCallback(() => {
    setIsLoading(true);
    
    const usersRef = collection(db, "users");
    
    const usersQuery = type 
      ? query(usersRef, where("type", "==", type))
      : usersRef;
    
    return getDocs(usersQuery)
      .then((snapshot) => {
        const usersList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as User[];
        
        setUsers(usersList);
        setIsLoading(false);
        return usersList;
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setIsLoading(false);
        throw error;
      });
  }, [type]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    isLoading,
    refetch: fetchUsers
  };
};



export const useGetUser = (email: string) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = () => {
      const q = query(collection(db, "users"), where("email", "==", email));
      
      getDocs(q)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setUser(doc.data() as User);
          });
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
          setIsLoading(false);
        });
    };

    fetchUser();
  }, [email]);

  return {
    userInfo: user,
    isLoading
  };
};

export const addUser = async (user: User) => {
  return await addDoc(collection(db, "users"), user);
};

export const editUser = async (userId: string, user: User) => {
  const userRef = doc(db, "users", userId);
  await updateDoc<User, User>(userRef, user);
};

export const deleteUser = async (userId: string) => {
  await deleteDoc(doc(db, "users", userId));
};
