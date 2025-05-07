import api from "../api";
import { ADMIN_BASE_URL } from "./student";
export const getEnrollments = async () => {
  const response = await api.get(`${ADMIN_BASE_URL}/enrollment`);
  return response.data.data;
};

export const updateEnrollment = async (id, data) => {
  const response = await api.put(`${ADMIN_BASE_URL}/enrollment/${id}`, data);
  return response.data;
};
