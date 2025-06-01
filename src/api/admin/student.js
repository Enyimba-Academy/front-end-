import api from "../api";
export const ADMIN_BASE_URL = "admin";

export const getStudents = async ({
  page = 1,
  limit = 10,
  search,
  sortBy = "createdAt",
  sortOrder = "desc",
  status,
} = {}) => {
  const response = await api
    .get(`${ADMIN_BASE_URL}/students`, {
      params: {
        page,
        limit,
        search,
        sortBy,
        sortOrder,
        status,
      },
    })
    .then((res) => {
      return res.data;
    });
  return response;
};

export const getStudentById = async (id) => {
  const response = await api
    .get(`${ADMIN_BASE_URL}/students/${id}`)
    .then((res) => {
      return res.data;
    });
  return response;
};
