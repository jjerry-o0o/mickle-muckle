interface DayTextProps {
  day: string;
}
const DayText = ({ day }: DayTextProps) => {
  return <p className="flex flex-1 w-full h-10">{day}</p>;
};

export default DayText;
