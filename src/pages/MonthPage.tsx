import { ResizableHandle, ResizablePanel, ResizablePanelGroup, ScrollArea } from '@/components/ui';
import { DayText, WeekBox } from '@/components/customUi';
const MonthPage = () => {
  return (
    <div className="flex w-full h-full">
      <ResizablePanelGroup orientation="horizontal" className="w-full h-full">
        <ResizablePanel minSize="40" className="h-full">
          <div className="flex flex-col border border-black w-full h-full">
            <h2 className="h-20">2026년 2월</h2>
            <div className="flex f-full">
              <DayText day="일"></DayText>
              <DayText day="월"></DayText>
              <DayText day="화"></DayText>
              <DayText day="수"></DayText>
              <DayText day="목"></DayText>
              <DayText day="금"></DayText>
              <DayText day="토"></DayText>
            </div>
            <ScrollArea className="flex flex-1 flex-col h-100">
              <WeekBox></WeekBox>
              <WeekBox></WeekBox>
              <WeekBox></WeekBox>
              <WeekBox></WeekBox>
            </ScrollArea>
          </div>
        </ResizablePanel>
        <ResizableHandle></ResizableHandle>
        <ResizablePanel>
          <div className="flex border border-black">
            <p>일별 지출 목록</p>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export { MonthPage };
