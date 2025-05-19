import api from "../api";
import { ADMIN_BASE_URL } from "./student";

export const getDashboardData = async () => {
  const response = await api.get(`${ADMIN_BASE_URL}/dashboard/stats`);
  return response.data;
};
