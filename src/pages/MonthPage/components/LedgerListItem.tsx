import { clsx } from 'clsx';
import type { CreateLedgerEntryDraft, EntryType, LedgerEntryDetail } from '@/types/ledger';
import type { Category } from '@/types/category';
import type { PaymentMethod } from '@/types/paymentMethod';
import { formatToKoreanDate } from '@/utils/dateUtil';
import { ButtonGroup, ButtonGroupSeparator } from '@/components/ui/button-group';
import { Button } from '@/components/ui';
import { useState } from 'react';
import { useLedgerFetch } from '@/hooks/useLedgerFetch';

interface LedgerListItemProps {
  key: number;
  entry: LedgerEntryDetail;
  category: Category | undefined;
  paymentType: PaymentMethod | undefined;
  isSelecting: boolean;
  startEdit: (entry: LedgerEntryDetail) => void;
  editingEntryId: number | null;
}

const LedgerListItem = ({
  entry,
  category,
  paymentType,
  isSelecting,
  startEdit,
  editingEntryId,
}: LedgerListItemProps) => {
  const [isDeleteConfirming, setIsDeleteConfirming] = useState<boolean>(false);
  const { mutateAsync: deleteLedgerEntry, isPending } = useLedgerFetch.useLedgerEntryDelete();

  const formattedDate = formatToKoreanDate(entry.entryDate);
  const amountTextStyle = (entryType: EntryType) =>
    entryType === 'E' ? 'text-[var(--expense)]' : 'text-[var(--income)]';
  const amountPrefix = (entryType: EntryType) => (entryType === 'E' ? '-' : '+');
  const amount = `${amountPrefix(entry.entryType)}${entry.amount.toLocaleString()}원`;

  const handleDeleteButtonAction = async () => {
    if (!isDeleteConfirming) {
      setIsDeleteConfirming(true);
      return;
    }

    await deleteLedgerEntry(entry.entryId);
    setIsDeleteConfirming(false);
  };

  return (
    <div
      className={`rounded-2xl border border-slate-200 p-3 shadow ${isSelecting && 'hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_10px_10px_rgba(15,23,42,0.14)] hover:ring-1 hover:ring-slate-300'} ${editingEntryId === entry.entryId && 'bg-[var(--background2)]'}`}
    >
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

      {isSelecting && !editingEntryId && (
        <div className="">
          <ButtonGroup className="flex w-full">
            <Button
              variant="outline"
              size="sm"
              className={`font-bold hover:text-white ${isDeleteConfirming ? 'w-[30%] border-[var(--income-deep)] text-[var(--income-deep)] hover:bg-[var(--income-deep)]' : 'w-[50%] border-[var(--income)] text-[var(--income)] hover:bg-[var(--income)]'}`}
              onClick={() => {
                if (isDeleteConfirming) {
                  setIsDeleteConfirming(false);
                  return;
                }
                startEdit(entry);
              }}
            >
              {isDeleteConfirming ? 'Cancel Delete' : 'Edit'}
            </Button>
            <ButtonGroupSeparator />
            <Button
              variant="outline"
              size="sm"
              disabled={isPending}
              className={`flex-1 font-bold hover:text-white ${isDeleteConfirming ? 'w-[70%] border-[var(--expense-deep)] text-[var(--expense-deep)]  hover:bg-[var(--expense-deep)]' : 'w-[50%] border-[var(--expense)] text-[var(--expense)] hover:bg-[var(--expense)]'}`}
              onClick={handleDeleteButtonAction}
            >
              {isDeleteConfirming ? 'Confirm Delete' : 'Delete'}
            </Button>
          </ButtonGroup>
        </div>
      )}
    </div>
  );
};

export default LedgerListItem;
