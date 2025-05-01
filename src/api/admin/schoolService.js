import api from "../api";
import { ADMIN_BASE_URL } from "./student";

export const schoolService = {
  addSchool: async (school) => {
    const response = await api.post(`${ADMIN_BASE_URL}/schools`, school);
    return response.data;
  },
  getSchool: async () => {
    const response = await api.get(`${ADMIN_BASE_URL}/schools`).then((res) => {
      return res.data;
    });
    console.log(response);
    return response;
  },
};
