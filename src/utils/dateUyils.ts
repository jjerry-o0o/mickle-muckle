import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export const formatToKoreanDate = (dateStr: string) => {
  if (!dateStr) return '';
  return dayjs(dateStr, 'YYYYMMDD').format('M월 D일');
};
