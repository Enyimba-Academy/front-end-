import api from "./api";
const baseUrl = "/enrollment";
export const createEnrollment = async (data) => {
  const response = await api.post(baseUrl, data);
  return response.data;
};

export const getEnrollment = async () => {
  const response = await api.get(baseUrl);
  return response.data;
};

export const getEnrollmentById = async (id) => {
  const response = await api.get(`${baseUrl}/${id}`);
  return response.data;
};

export const updateEnrollment = async (id, data) => {
  const response = await api.put(`${baseUrl}/${id}`, data);
  return response.data;
};
