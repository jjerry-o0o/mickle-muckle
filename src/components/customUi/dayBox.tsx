interface DayBoxProps {
  dayNum: number;
}
const DayBox = ({ dayNum }: DayBoxProps) => {
  return (
    <div className="border border-black flex flex-1 w-full h-30">
      <p>{dayNum}</p>
    </div>
  );
};

export default DayBox;
