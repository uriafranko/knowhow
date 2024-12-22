import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const AuthPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24">
        <div className="max-w-md mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Welcome Back</h1>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: "#000000",
                      brandAccent: "#666666",
                    },
                  },
                },
              }}
              providers={[]}
            />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AuthPage;