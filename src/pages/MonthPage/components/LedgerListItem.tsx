import { clsx } from 'clsx';
import type { EntryType, LedgerEntryDetail } from '@/types/ledger';
import type { Category } from '@/types/category';
import type { PaymentMethod } from '@/types/paymentMethod';
import { formatToKoreanDate } from '@/utils/dateUtil';

interface LedgerListItemProps {
  key: number;
  entry: LedgerEntryDetail;
  category: Category | undefined;
  paymentType: PaymentMethod | undefined;
}

const LedgerListItem = ({ entry, category, paymentType }: LedgerListItemProps) => {
  const formattedDate = formatToKoreanDate(entry.entryDate);
  const amountTextStyle = (entryType: EntryType) =>
    entryType === 'E' ? 'text-[var(--expense)]' : 'text-[var(--income)]';
  const amountPrefix = (entryType: EntryType) => (entryType === 'E' ? '-' : '+');
  const amount = `${amountPrefix(entry.entryType)}${entry.amount.toLocaleString()}원`;

  return (
    <div className="rounded-2xl border border-slate-200 p-3 shadow">
      <div className="text-[16px]  flex items-center justify-between mb-2">
        <div className="flex gap-2 items-center">
          <p className="font-bold text-slate-900">{formattedDate}</p>
          <span style={{ boxShadow: `inset 0 -8px 0 0 ${category?.color || '#FEF08A'}` }} className="text-[14px]">
            {category?.name}
          </span>
        </div>

        <div className="flex gap-2 items-center">
          <span className="text-[14px]">{paymentType?.name}</span>
          <p className={clsx('font-bold', amountTextStyle(entry.entryType))}>{amount}</p>
        </div>
      </div>

      <div className="mb-2">
        <span className="text-[16px] font-bold text-slate-500">{entry.title}</span>
        <p className="text-[14px] text-slate-500">{entry.memo}</p>
      </div>
    </div>
  );
};

export default LedgerListItem;
