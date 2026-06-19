import { clsx } from 'clsx';
import type { EntryType, LedgerEntryDetail } from '@/types/ledger';
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
  const amountColor = (entryType: EntryType) =>
    entryType === 'E' ? 'text-[#f97316]' : 'text-[#10b981]';
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
      className={clsx(
        'bg-white border border-[rgba(229,231,235,0.9)] rounded-[16px] shadow-[0px_10px_16px_0px_rgba(17,24,39,0.06)] p-[13px] flex flex-col gap-[7px]',
        isSelecting && 'hover:-translate-y-0.5 hover:shadow-[0px_14px_20px_0px_rgba(17,24,39,0.09)] transition-all cursor-pointer',
        editingEntryId === entry.entryId && 'ring-1 ring-[rgba(16,185,129,0.35)]',
      )}
    >
      <div className="flex items-baseline justify-between">
        <span className="text-[12px] font-bold">{formattedDate}</span>
        <div className="flex items-baseline gap-2 whitespace-nowrap">
          <span className="text-[11.5px] text-[#6b7280] font-medium">{paymentType?.name}</span>
          <span className={clsx('font-["Inter"] font-bold text-[13px]', amountColor(entry.entryType))}>
            {amount}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-[7px]">
        <span className="text-[13.5px] font-bold text-[#111827]">{entry.title}</span>
        {category && (
          <span
            className="font-bold text-[11px] px-[9px] py-[3px] rounded-full border shrink-0"
            style={{
              backgroundColor: `${category.color}1A`,
              color: category.color,
              borderColor: `${category.color}33`,
            }}
          >
            {category.name}
          </span>
        )}
      </div>
      {entry.memo && (
        <div className="text-[12px] text-[#6b7280] -mt-[3px]">{entry.memo}</div>
      )}

      {isSelecting && !editingEntryId && (
        <ButtonGroup className="flex w-full mt-1">
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
            className={`flex-1 font-bold hover:text-white ${isDeleteConfirming ? 'w-[70%] border-[var(--expense-deep)] text-[var(--expense-deep)] hover:bg-[var(--expense-deep)]' : 'w-[50%] border-[var(--expense)] text-[var(--expense)] hover:bg-[var(--expense)]'}`}
            onClick={handleDeleteButtonAction}
          >
            {isDeleteConfirming ? 'Confirm Delete' : 'Delete'}
          </Button>
        </ButtonGroup>
      )}
    </div>
  );
};

export default LedgerListItem;
