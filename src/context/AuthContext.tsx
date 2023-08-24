import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import firebase_app from "@/firebase/config";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";

const auth = getAuth(firebase_app);
export type AuthContext = User;
export const AuthContext: any = createContext({});

export const useAuthContext = (): any => useContext(AuthContext as any);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
