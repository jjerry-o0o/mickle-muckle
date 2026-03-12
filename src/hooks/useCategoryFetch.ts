import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@/api/categoryApi';

export const useCategoryFetch = {
  useCategories: () =>
    useQuery({
      queryKey: ['category'],
      queryFn: () => fetchCategories(),
      staleTime: 1000 * 60 * 5, // 5분 동안은 재요청 방지
    }),
};
