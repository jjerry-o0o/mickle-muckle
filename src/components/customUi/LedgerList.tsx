import {
  ScrollArea,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { payments } from '@/assets/mockData';
import { formatToKoreanDate } from '@/utils/dateUtil';

const LedgerList = () => {
  return (
    <div>
      <p>일별 지출 목록</p>
      <ScrollArea>
        <Table>
          <TableCaption>일별 지출 목록입니다.</TableCaption>
          <TableBody>
            {payments.map(payment => {
              const formatDate = formatToKoreanDate(payment.date);
              return (
                <TableRow key={payment.id}>
                  <div className="border-2 rounded-xl">
                    <div className="flex justify-between">
                      <TableCell>{formatDate}</TableCell>
                      <TableCell>{payment.entryType === 'E' ? -payment.amount : payment.amount}</TableCell>
                    </div>
                    <TableCell>{payment.title}</TableCell>
                    <div className="flex">
                      <TableCell>{payment.category}</TableCell>
                      <TableCell>{payment.payType}</TableCell>
                    </div>
                  </div>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default LedgerList;
