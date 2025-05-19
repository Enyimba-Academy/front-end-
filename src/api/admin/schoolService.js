import api from "../api";
import { ADMIN_BASE_URL } from "./student";

export const schoolService = {
  addSchool: async (school) => {
    const response = await api.post(`${ADMIN_BASE_URL}/schools`, school);
    return response.data;
  },
  getSchool: async () => {
    const response = await api.get(`${ADMIN_BASE_URL}/schools`);
    return response.data.data;
  },
  getSchoolById: async (id) => {
    const response = await api.get(`${ADMIN_BASE_URL}/schools/${id}`);
    return response.data;
  },
};
