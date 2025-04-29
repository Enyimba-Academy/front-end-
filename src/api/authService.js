import api from "./api";

export const authService = {
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/auth/logout");
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get("/auth/me").then((res) => {
      return res.data.data;
    });
    return response;
  },
  register: async (credentials) => {
    const response = await api.post("/auth/register", credentials);
    return response.data;
  },
};
