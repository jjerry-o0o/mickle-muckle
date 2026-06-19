import ListHeaderButton from '@/pages/MonthPage/components/ListHeaderButton';
import { MdEditNote } from 'react-icons/md';
import { ScrollArea } from '@/components/ui';
import { useAssetFetch } from '@/hooks/useAssetFetch';

const AssetList = () => {
  const { data: assetGroups = [], isLoading } = useAssetFetch.useAssets();

  const totalAmount = assetGroups
    .flatMap(g => g.items)
    .reduce((sum, item) => sum + item.currentValue, 0);

  return (
    <div className="bg-white border border-[rgba(229,231,235,0.9)] rounded-[20px] shadow-[0px_10px_24px_0px_rgba(17,24,39,0.06)] p-5 flex flex-col gap-5 h-dvh overflow-hidden">
      <div className="flex items-center justify-between">
        <span className="text-[15px] font-bold text-[#111827]">총 자산 현황</span>
        <ListHeaderButton
          buttons={[
            {
              label: 'Edit',
              onClick: () => {},
              icon: <MdEditNote size="22" />,
              color: '--asset-point',
            },
          ]}
        />
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center text-[13px] text-[#9ca3af]">불러오는 중...</div>
      ) : (
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-5 px-2">
            {assetGroups.map(group => (
              <div key={group.categoryId} className="flex flex-col gap-2">
                <h3 className="text-[14px] font-bold text-[#111827]">{group.categoryName}</h3>
                {group.items.map(item => (
                  <div key={item.assetId} className="flex justify-between text-[12.5px]">
                    <span className="text-[#6b7280]">{item.name}</span>
                    <span className="font-['Inter'] font-semibold text-[#111827]">
                      {item.currentValue.toLocaleString('ko-KR')}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </ScrollArea>
      )}

      <div className="bg-[#d1fae5] rounded-[14px] px-4 py-3 flex items-center justify-between">
        <span className="text-[13px] font-bold text-[#065f46]">전재산 합계</span>
        <span className="font-['Inter'] font-bold text-[15px] text-[#065f46]">
          {totalAmount.toLocaleString('ko-KR')}
        </span>
      </div>
    </div>
  );
};

export default AssetList;
