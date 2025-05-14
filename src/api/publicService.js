import api from "./api";
const BASE_URL = "/public";
export const getCourses = async () => {
  const response = await api.get(`${BASE_URL}/courses`);
  return response.data;
};

export const getCourseById = async (id) => {
  const response = await api.get(`${BASE_URL}/courses/${id}`);
  return response.data;
};

export const getSchools = async () => {
  const response = await api.get(`${BASE_URL}/schools`);
  return response.data;
};
