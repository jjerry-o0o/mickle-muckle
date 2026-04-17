import ListHeaderButton from '@/pages/MonthPage/components/ListHeaderButton';
import { MdEditNote } from 'react-icons/md';
import ListTitle from '@/components/customUi/ListTitle';
import { ScrollArea } from '@/components/ui';

// 이건 사용자가 커스텀 불가하게
const AssetCategory = [
  { id: 1, name: '현금' },
  { id: 2, name: '적금' },
  { id: 3, name: '주식' },
  { id: 4, name: '부동산' },
  { id: 5, name: '외화' },
  { id: 6, name: '기타' },
];

const AssetItems = [
  { id: 1, categoryId: 1, name: '기업은행', amount: 1000000 },
  { id: 2, categoryId: 1, name: '하나은행', amount: 1000000 },
  { id: 3, categoryId: 1, name: '신한은행', amount: 1000000 },
  { id: 4, categoryId: 1, name: '국민은행', amount: 1000000 },
  { id: 5, categoryId: 2, name: '신한도약계좌', amount: 1000000 },
  { id: 6, categoryId: 2, name: '국민스타30적금', amount: 1000000 },
  { id: 7, categoryId: 2, name: '하나주택청약', amount: 1000000 },
  { id: 8, categoryId: 3, name: 'S&P 500', amount: 1000000 },
  { id: 9, categoryId: 3, name: '삼성전자', amount: 1000000 },
  { id: 10, categoryId: 3, name: '메타', amount: 1000000 },
  { id: 11, categoryId: 3, name: 'ISA계좌 예수금', amount: 1000000 },
  { id: 12, categoryId: 3, name: '국내주식 예수금', amount: 1000000 },
  { id: 13, categoryId: 3, name: '해외주식 예수금', amount: 1000000 },
  { id: 14, categoryId: 4, name: '월세 보증금', amount: 1000000 },
  { id: 15, categoryId: 5, name: '엔화', amount: 1000000 },
  { id: 16, categoryId: 6, name: '돼지 저금통', amount: 1000000 },
];
const AssetList = () => {
  return (
    <div className=" border bg-background p-4 h-dvh flex flex-col space-y-3 overflow-hidden">
      <div className="flex  items-end justify-between mb-4 mx-2">
        <ListTitle title={'총 자산 현황'} />
        <ListHeaderButton
          buttons={[
            {
              label: 'Edit',
              onClick: () => {},
              icon: <MdEditNote size="28" />,
              color: '--asset-point',
            },
          ]}
        />
      </div>
      <ScrollArea>
        <div>
          {AssetItems.map(item => (
            <ListTitle key={item.id} title={item.name}></ListTitle>
          ))}
        </div>
      </ScrollArea>
      <div>
        <ListTitle title={'총 합계'} />
      </div>
    </div>
  );
};

export default AssetList;
