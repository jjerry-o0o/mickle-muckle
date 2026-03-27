import { clsx } from 'clsx';
import type { CreateLedgerEntryDraft, EntryType, LedgerEntryDetail } from '@/types/ledger';
import type { Category } from '@/types/category';
import type { PaymentMethod } from '@/types/paymentMethod';
import { formatToKoreanDate } from '@/utils/dateUtil';
import { ButtonGroup, ButtonGroupSeparator } from '@/components/ui/button-group';
import { Button } from '@/components/ui';
import { useState } from 'react';
import { useLedgerFetch } from '@/hooks/useLedgerFetch';
import LedgerEntryForm from '@/pages/MonthPage/components/LedgerEntryForm';

interface LedgerListItemProps {
  key: number;
  entry: LedgerEntryDetail;
  category: Category | undefined;
  paymentType: PaymentMethod | undefined;
  categories?: Category[];
  paymentMethods?: PaymentMethod[];
  isEditMode: boolean;
}

const LedgerListItem = ({
  entry,
  category,
  paymentType,
  categories = [],
  paymentMethods = [],
  isEditMode,
}: LedgerListItemProps) => {
  const [isDeleteConfirming, setIsDeleteConfirming] = useState<boolean>(false);
  const [editLedger, setEditLedger] = useState<CreateLedgerEntryDraft | null>(null);
  const { mutateAsync: updateLedgerEntry, isPending: isUpdatePending } = useLedgerFetch.useLedgerEntryUpdate();
  const { mutateAsync: deleteLedgerEntry, isPending } = useLedgerFetch.useLedgerEntryDelete();
  const formattedDate = formatToKoreanDate(entry.entryDate);
  const amountTextStyle = (entryType: EntryType) =>
    entryType === 'E' ? 'text-[var(--expense)]' : 'text-[var(--income)]';
  const amountPrefix = (entryType: EntryType) => (entryType === 'E' ? '-' : '+');
  const amount = `${amountPrefix(entry.entryType)}${entry.amount.toLocaleString()}원`;

  const startEdit = () => {
    setEditLedger({
      entryDate: entry.entryDate,
      entryType: entry.entryType,
      amount: entry.amount,
      title: entry.title,
      memo: entry.memo,
      categoryId: entry.categoryId,
      paymentId: entry.paymentId,
    });
  };

  const handleEditDataChange = (field: keyof LedgerEntryDetail, newValue: string | number) => {
    setEditLedger(prev => (prev ? { ...prev, [field]: newValue } : prev));
  };

  const handleCancelEdit = () => {
    setEditLedger(null);
  };

  const handleSaveEdit = async () => {
    if (!editLedger || editLedger.categoryId == null || editLedger.paymentId == null) return;

    await updateLedgerEntry({
      id: entry.entryId,
      ledger: {
        entryDate: editLedger.entryDate,
        entryType: editLedger.entryType,
        amount: editLedger.amount,
        title: editLedger.title,
        memo: editLedger.memo,
        categoryId: editLedger.categoryId,
        paymentId: editLedger.paymentId,
      },
    });

    setEditLedger(null);
  };

  const handleDeleteButtonAction = async () => {
    if (!isDeleteConfirming) {
      setIsDeleteConfirming(true);
      return;
    }

    await deleteLedgerEntry(entry.entryId);
    setIsDeleteConfirming(false);
  };

  if (editLedger) {
    return (
      <div className="space-y-3">
        <LedgerEntryForm
          ledger={editLedger}
          onChange={handleEditDataChange}
          categories={categories}
          paymentMethods={paymentMethods}
        />

        <ButtonGroup className="flex w-full">
          <Button
            variant="outline"
            size="sm"
            disabled={isUpdatePending}
            className="flex-1 border-[var(--income)] text-[var(--income)] font-bold hover:bg-[var(--income)] hover:text-white"
            onClick={handleSaveEdit}
          >
            {isUpdatePending ? 'Saving...' : 'Save'}
          </Button>
          <ButtonGroupSeparator />
          <Button
            variant="outline"
            size="sm"
            disabled={isUpdatePending}
            className="flex-1 border-[var(--expense)] text-[var(--expense)] font-bold hover:bg-[var(--expense)] hover:text-white"
            onClick={handleCancelEdit}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border border-slate-200 p-3 shadow ${isEditMode && 'hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_10px_10px_rgba(15,23,42,0.14)] hover:ring-1 hover:ring-slate-300'}`}
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

      {isEditMode && (
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

                startEdit();
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
