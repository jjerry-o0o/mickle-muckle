import type { PaymentMethod } from '@/types/paymentMethod';
import { axiosApi } from '@/api/axiosInstans';

export const fetchPaymentMethod = async (): Promise<PaymentMethod[]> => {
  const { data } = await axiosApi.get<PaymentMethod[]>(`/payment-method`);
  return data;
};
