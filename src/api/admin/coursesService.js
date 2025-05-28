import api from "../api";
import { ADMIN_BASE_URL } from "./student";

export const coursesService = {
  createCourse: async (course) => {
    const response = await api.post(`${ADMIN_BASE_URL}/courses`, course);
    return response.data;
  },
  getCourses: async ({ filters, page, search } = {}) => {
    const response = await api.get(`${ADMIN_BASE_URL}/courses`, {
      params: {
        filters,
        page,
        search,
      },
    });
    return response.data;
  },
  getCourseById: async (id) => {
    const response = await api.get(`${ADMIN_BASE_URL}/courses/${id}`);
    return response.data;
  },
  updateCourse: async (id, course) => {
    const response = await api.put(`${ADMIN_BASE_URL}/courses/${id}`, course);
    return response.data;
  },
  deleteCourse: async (id) => {
    const response = await api.delete(`${ADMIN_BASE_URL}/courses/${id}`);
    return response.data;
  },
};
