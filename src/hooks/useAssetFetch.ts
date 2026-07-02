import { useQuery } from '@tanstack/react-query'
import { fetchAssets } from '@/api/assetApi'

export const useAssetFetch = {
  useAssets: () =>
    useQuery({
      queryKey: ['assets'],
      queryFn: fetchAssets,
    }),
}
