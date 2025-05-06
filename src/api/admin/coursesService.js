import api from "../api";
import { ADMIN_BASE_URL } from "./student";

export const coursesService = {
  createCourse: async (course) => {
    const response = await api.post(`${ADMIN_BASE_URL}/courses`, course);
    return response.data;
  },
};
