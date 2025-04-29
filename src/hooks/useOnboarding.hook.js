import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import onboardingService from "@/api/onboarding";

export function useOnboarding() {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["onboarding"],
    queryFn: () => onboardingService.getOnboarding(),
  });

  const { mutate: createOnboarding, isPending: isCreatingOnboarding } =
    useMutation({
      mutationFn: (data) => onboardingService.createOnboarding(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["onboarding"] });
      },
    });

  const { mutate: updateOnboarding, isPending: isUpdatingOnboarding } =
    useMutation({
      mutationFn: (data) => onboardingService.updateOnboarding(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["onboarding"] });
      },
    });

  return {
    data,
    isLoading,
    error,
    createOnboarding,
    isCreatingOnboarding,
    updateOnboarding,
    isUpdatingOnboarding,
  };
}
