import api from "../api";

export const getPayments = async (query) => {
  const response = await api.get("/admin/payments", { params: query });
  return response.data;
};

export const getPayment = async (id) => {
  const response = await api.get(`/admin/payments/${id}`);
  return response.data;
};

export const updatePayment = async (id, data) => {
  const response = await api.put(`/admin/payments/${id}`, data);
  return response.data;
};

export const createRefund = async (id, data) => {
  const response = await api.post(`/admin/payments/${id}/refund`, data);
  return response.data;
};

export const getRefunds = async (query) => {
  const response = await api.get("/admin/payments/refunds", { params: query });
  return response.data;
};
