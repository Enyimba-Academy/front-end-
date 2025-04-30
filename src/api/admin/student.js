import api from "../api";
export const ADMIN_BASE_URL = "admin";
export const getStudents = async () => {
  const response = await api.get(`${ADMIN_BASE_URL}/students`).then((res) => {
    return res.data;
  });
  return response;
};
