import api from "../api";
import { ADMIN_BASE_URL } from "./student";

export const schoolService = {
  addSchool: async (school) => {
    const response = await api.post(`${ADMIN_BASE_URL}/schools`, school);
    return response.data;
  },
  getSchool: async ({ filters, page, search }) => {
    const response = await api
      .get(`${ADMIN_BASE_URL}/schools`, {
        params: {
          is_active: filters,
          page: page || 1,
          limit: 10,
          search: search || "",
        },
      })
      .then((res) => {
        return res.data;
      });
    console.log(response);
    return response;
  },
  getSchoolById: async (id) => {
    const response = await api.get(`${ADMIN_BASE_URL}/schools/${id}`);
    return response.data;
  },
};
