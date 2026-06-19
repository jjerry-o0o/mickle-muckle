export interface AssetItem {
  assetId: number;
  name: string;
  currentValue: number;
}

export interface AssetList {
  categoryId: number;
  categoryName: string;
  items: AssetItem[];
}
