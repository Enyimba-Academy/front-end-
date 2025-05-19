import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/api/authService";
import useAuthStore from "@/store/authStore";

export function useAuth() {
  const queryClient = useQueryClient();
  const { setToken, clearAuth } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      const { token } = data.data;
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

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      const { token } = data.data;
      setToken(token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const requestPasswordResetMutation = useMutation({
    mutationFn: authService.requestPasswordReset,
  });

  const resetPasswordMutation = useMutation({
    mutationFn: authService.resetPassword,
  });

  return {
    user,
    isLoadingUser,
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
    requestPasswordReset: requestPasswordResetMutation.mutate,
    isRequestingPasswordReset: requestPasswordResetMutation.isPending,
    requestPasswordResetError: requestPasswordResetMutation.error,
    resetPassword: resetPasswordMutation.mutate,
    isResettingPassword: resetPasswordMutation.isPending,
    resetPasswordError: resetPasswordMutation.error,
  };
}
