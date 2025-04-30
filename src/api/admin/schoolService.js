import api from "../api";
import { ADMIN_BASE_URL } from "./student";

export const schoolService = {
  addSchool: async (school) => {
    const response = await api.post(`${ADMIN_BASE_URL}/schools`, school);
    return response.data;
  },
};
