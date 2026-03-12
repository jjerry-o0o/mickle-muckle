import type { paymentMethod } from '@/types/paymentMethod';
import { axiosApi } from '@/api/axiosInstans';

export const fetchPaymentMethod = async (): Promise<paymentMethod[]> => {
  const { data } = await axiosApi.get<paymentMethod[]>(`/payment-method`);
  return data;
};
