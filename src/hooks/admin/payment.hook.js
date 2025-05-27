import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPayments,
  getPayment,
  updatePayment,
  createRefund,
  getRefunds,
} from "@/api/admin/paymentService";

export const useGetPayments = (query) => {
  return useQuery({
    queryKey: ["payments", query],
    queryFn: () => getPayments(query),
  });
};

export const useGetPayment = (id) => {
  return useQuery({
    queryKey: ["payment", id],
    queryFn: () => getPayment(id),
    enabled: !!id,
  });
};

export const useUpdatePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updatePayment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });
};

export const useCreateRefund = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => createRefund(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments", "refunds"] });
    },
  });
};

export const useGetRefunds = (query) => {
  return useQuery({
    queryKey: ["refunds", query],
    queryFn: () => getRefunds(query),
  });
};
