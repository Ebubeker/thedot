import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/assets/api/firebase";
import { useGetUser } from "@/assets/api/user";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { userInfo, isLoading } = useGetUser(user?.email ? user.email : "");


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading, userInfo, userInfoIsLoading: isLoading };
}
