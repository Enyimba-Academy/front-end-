import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/api/authService";
import useAuthStore from "@/store/authStore";

export function useAuth() {
  const queryClient = useQueryClient();
  const { setToken, clearAuth } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      const { token } = data;
      setToken(token);

      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
    },
  });

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user"],
    queryFn: authService.getCurrentUser,
    enabled: useAuthStore.getState().isAuthenticated,
  });

  return {
    user,
    isLoadingUser,
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
}
