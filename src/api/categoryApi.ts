import type { category } from '@/types/category';
import { axiosApi } from '@/api/axiosInstans';

export const fetchCategories = async (): Promise<category[]> => {
  const { data } = await axiosApi.get<category[]>(`/categories`);
  return data;
};
