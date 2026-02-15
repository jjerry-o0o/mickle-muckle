interface DayTextProps {
  day: string;
}
const DayText = ({ day }: DayTextProps) => {
  return <p className="flex flex-1 w-full h-10 items-center justify-center">{day}</p>;
};

export default DayText;
