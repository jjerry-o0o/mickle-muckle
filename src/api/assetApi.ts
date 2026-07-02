import type { AssetList } from '@/types/asset'
import { axiosApi } from '@/api/axiosInstans'

export const fetchAssets = async (): Promise<AssetList[]> => {
  const { data } = await axiosApi.get<AssetList[]>('/assets')
  return data
}
