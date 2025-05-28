import api from "../api";
import { ADMIN_BASE_URL } from "./student";

export const schoolService = {
  addSchool: async (school) => {
    const response = await api.post(`${ADMIN_BASE_URL}/schools`, school);
    return response.data;
  },
  getSchool: async ({
    page = "1",
    limit = "10",
    search,
    sortBy = "updatedAt",
    sortOrder = "desc",
    status,
  } = {}) => {
    const response = await api.get(`${ADMIN_BASE_URL}/schools`, {
      params: {
        page,
        limit,
        search,
        sortBy,
        sortOrder,
        status,
      },
    });
    return response.data.data;
  },
  getSchoolById: async (id) => {
    const response = await api.get(`${ADMIN_BASE_URL}/schools/${id}`);
    return response.data;
  },
  updateSchool: async (id, school) => {
    const response = await api.put(`${ADMIN_BASE_URL}/schools/${id}`, school);
    return response.data;
  },
  deleteSchool: async (id) => {
    const response = await api.delete(`${ADMIN_BASE_URL}/schools/${id}`);
    return response.data;
  },
};
