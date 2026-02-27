import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  ScrollArea,
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui';
import { DayText, WeekBox, MonthlyCalendar } from '@/components/customUi';
import { payments, weekText } from '@/assets/mockData';

const MonthPage = () => {
  const date = new Date();
  const day = date.getDay();
  const today = date.getDate();
  const startDay = 7 - ((today - (day + 1)) % 7);

  const getDayNums = () => {
    // 오늘 일자 기준으로 1일의 요일(0~6) 구하기
    const startDay = 7 - ((today - (day + 1)) % 7);
  };

  return (
    <div className="flex w-full h-full">
      {/*<ResizablePanelGroup orientation="horizontal" className="w-full h-full">*/}
      {/*  <ResizablePanel minSize="40" className="h-full">*/}
      <div className="flex flex-col w-[60%] h-full mt-8">
        <MonthlyCalendar />
        {/*<div className="flex f-full">*/}
        {/*  {weekText.map(day => (*/}
        {/*    <DayText key={day.id} day={day.text}></DayText>*/}
        {/*  ))}*/}
        {/*</div>*/}
        {/*<ScrollArea className="flex flex-1 flex-col h-100">*/}
        {/*<WeekBox></WeekBox>*/}
        {/*<WeekBox></WeekBox>*/}
        {/*<WeekBox></WeekBox>*/}
        {/*<WeekBox></WeekBox>*/}
        {/*<WeekBox></WeekBox>*/}
        {/*<WeekBox></WeekBox>*/}
        {/*<WeekBox></WeekBox>*/}
        {/*</ScrollArea>*/}
      </div>
      {/*</ResizablePanel>*/}
      {/*<ResizableHandle></ResizableHandle>*/}
      {/*<ResizablePanel>*/}
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
      {/*</ResizablePanel>*/}
      {/*</ResizablePanelGroup>*/}
    </div>
  );
};

export { MonthPage };
