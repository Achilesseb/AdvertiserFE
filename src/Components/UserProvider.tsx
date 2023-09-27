import { supabase } from "@/supabase";
import ClockLoader from "react-spinners/ClockLoader";
import { ReactNode, useEffect, useState } from "react"; // Example for React
import { SignInFormComponent } from "./Login";
import { AuthSession } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";

function UserProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);
  const path = usePathname();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user.user_metadata?.role === "admin") {
        setSession(session);
      }

      setLoading(false);
    });
  }, [path]);

  if (loading) return <ClockLoader />;

  if (path?.includes("forgotPassword")) return children;

  if (
    !session ||
    session?.user?.user_metadata?.role !== process.env.NEXT_PUBLIC_ALLOWED_ROLE
  ) {
    return <SignInFormComponent />;
  }

  return children;
}
export default UserProvider;
