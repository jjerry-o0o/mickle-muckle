export interface SliceResponse<T> {
  content: T[];
  last: boolean;
  number: number;
}

// FullCalendar events 속성 타입
export interface MonthEvents {
  id: string;
  title: string;
  start: string;
  allDay: boolean;
  classNames: string;
  textColor: string;
  extendsProps: {
    amount: number;
  };
}
