import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import useAuthStore from "@/store/authStore";
import { useAuth } from "@/hooks/useAuth";

export default function RequireAuth({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();
  const { isLoadingUser } = useAuth();

  useEffect(() => {
    if (!isLoadingUser && !isAuthenticated) {
      // Redirect to login page but save the attempted URL
      // navigate("/login", { state: { from: location }, replace: true });
    }
  }, [isAuthenticated, isLoadingUser, navigate, location]);

  if (isLoadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return isAuthenticated ? children : null;
}
