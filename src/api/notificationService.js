import api from "./api";

export const getNotifications = async () => {
  const response = await api.get("/notification");
  return response.data;
};

export const markAllNotificationsAsRead = async () => {
  const response = await api.patch("/notification/mark-all-read");
  return response.data;
};

export const markAllNotificationsAsReadByRole = async () => {
  const response = await api.patch("/notification/mark-all-read-by-role");
  return response.data;
};

export const getNotificationsByRole = async () => {
  const response = await api.get("/notification/role");
  return response.data;
};
