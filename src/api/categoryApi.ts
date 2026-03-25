import type { Category } from '@/types/category';
import { axiosApi } from '@/api/axiosInstans';

export const fetchCategories = async (): Promise<Category[]> => {
  const { data } = await axiosApi.get<Category[]>(`/categories`);
  return data;
};
