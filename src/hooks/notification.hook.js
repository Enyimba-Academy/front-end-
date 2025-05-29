import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getNotifications,
  markAllNotificationsAsRead,
  markAllNotificationsAsReadByRole,
  getNotificationsByRole,
} from "@/api/notificationService";

export const useNotification = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });
  return { data, isLoading, error };
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications", "notificationsByRole"],
      });
    },
  });
  return { mutate, isPending, error };
};

export const useMarkAllNotificationsAsReadByRole = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: markAllNotificationsAsReadByRole,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications", "notificationsByRole"],
      });
    },
  });
  return { mutate, isPending, error };
};

export const useGetNotificationsByRole = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["notificationsByRole"],
    queryFn: getNotificationsByRole,
  });
  return { data, isLoading, error };
};
