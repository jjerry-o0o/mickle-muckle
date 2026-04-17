interface ListTitleProps {
  title: string;
}
const ListTitle = ({ title }: ListTitleProps) => {
  return <p className="text-[20px] font-semibold text-slate-900">{title}</p>;
};

export default ListTitle;
