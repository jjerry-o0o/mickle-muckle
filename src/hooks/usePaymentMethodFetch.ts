import { useQuery } from '@tanstack/react-query';
import { fetchPaymentMethod } from '@/api/paymentMethodApi';

export const usePaymentMethodFetch = {
  usePaymentMethods: () =>
    useQuery({
      queryKey: ['paymentMethod'],
      queryFn: () => fetchPaymentMethod(),
      staleTime: 1000 * 60 * 5,
    }),
};
