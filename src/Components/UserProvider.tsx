import { supabase } from "@/supabase";
import ClockLoader from "react-spinners/ClockLoader";
import { ReactNode, createContext, useEffect, useState } from "react"; // Example for React
import { SignInFormComponent } from "./Login";
import { AuthSession } from "@supabase/supabase-js";

function UserProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });
  }, []);

  if (loading) return <ClockLoader />;
  if (!session) {
    return <SignInFormComponent />;
  }

  return <>{children}</>;
}
export default UserProvider;
