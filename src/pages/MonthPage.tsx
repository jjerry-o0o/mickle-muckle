import {
  ScrollArea,
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui';
import { MonthlyCalendar } from '@/components/customUi';
import { payments } from '@/assets/mockData';

const MonthPage = () => {
  return (
    <div className="flex w-full h-full bg-[var(--background2)]">
      <div className="flex flex-col w-[60%] h-full">
        <MonthlyCalendar />
      </div>
      <div className="flex flex-col w-[40%] border border-black">
        <p>일별 지출 목록</p>
        <ScrollArea>
          <Table>
            <TableCaption>일별 지출 목록입니다.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>date</TableHead>
                <TableHead>amount</TableHead>
                <TableHead>title</TableHead>
                <TableHead>category</TableHead>
                <TableHead>payType</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map(payment => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.title}</TableCell>
                  <TableCell>{payment.category}</TableCell>
                  <TableCell>{payment.payType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
};

export { MonthPage };
