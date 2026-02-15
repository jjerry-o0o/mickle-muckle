const payments = [
  {
    id: 1,
    date: '20260201',
    amount: 1200,
    title: '청계마트 딸기우유',
    category: '간식',
    payType: '케이뱅크체크카드',
  },
  {
    id: 2,
    date: '20260203',
    amount: 2900,
    title: '카페인24 - 아메리카노',
    category: '카페',
    payType: '케이뱅크체크카드',
  },
  {
    id: 3,
    date: '20260207',
    amount: 31700,
    title: '지그재그 - 니트',
    category: '옷',
    payType: '신한더모아신용카드',
  },
  {
    id: 4,
    date: '20260214',
    amount: 1700,
    title: 'GS25 - 삼각김밥',
    category: '간식',
    payType: '케이뱅크체크카드',
  },
  {
    id: 5,
    date: '20260214',
    amount: 19800,
    title: '올리브영',
    category: '화장품',
    payType: '신한더모아신용카드',
  },
];

const weekText = [
  { id: 0, text: 'Sun' },
  { id: 1, text: 'Mon' },
  { id: 2, text: 'Tue' },
  { id: 3, text: 'Wed' },
  { id: 4, text: 'Thu' },
  { id: 5, text: 'Fri' },
  { id: 6, text: 'Sat' },
];

const payType = [
  { id: 1, name: '케이뱅크체크카드', type: 'check' },
  { id: 2, name: '신한더모아신용카드', type: 'credit' },
];
export { payments, weekText, payType };
