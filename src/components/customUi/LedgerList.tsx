import { ScrollArea } from '@/components/ui';
import { formatToKoreanDate } from '@/utils/dateUtil';
import type { EntryType, LedgerEntryDetail } from '@/types/ledger';
import { useLedgerFetch } from '@/hooks/useLedgerFetch';
import { useCategoryFetch } from '@/hooks/useCategoryFetch';
import { usePaymentMethodFetch } from '@/hooks/usePaymentMethodFetch';
import { clsx } from 'clsx';
import type { category } from '@/types/category';
import type { paymentMethod } from '@/types/paymentMethod';

const amountPrefix = (entryType: EntryType) => (entryType === 'E' ? '-' : '+');
const amountTextStyle = (entryType: EntryType) => (entryType === 'E' ? 'text-orange-500' : 'text-blue-600');

const LedgerList = () => {
  const { data: entries = [] } = useLedgerFetch.useLedgerEntriesByPagination(0);
  const { data: categories = [] } = useCategoryFetch.useCategories();
  const { data: paymentMethods = [] } = usePaymentMethodFetch.usePaymentMethods();
  const findCategory = (categoryId: number) => categories.find((item: category) => item.id === categoryId);
  const findPaymentMethod = (paymentMethodId: number) =>
    paymentMethods.find((item: paymentMethod) => item.id === paymentMethodId);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[20px] font-semibold text-slate-900">일별 지출 목록</p>
        <button
          type="button"
          className="flex justify-center items-center text-2xl px-2 rounded-lg border bg-emerald-50 text-emerald-700 border-emerald-400"
        >
          +
        </button>
      </div>

      <ScrollArea className="h-full">
        <div className="h-full space-y-3">
          {entries?.map((entry: LedgerEntryDetail) => {
            const formattedDate = formatToKoreanDate(entry.entryDate);
            const amount = `${amountPrefix(entry.entryType)}${entry.amount.toLocaleString()}원`;
            const category = findCategory(entry.categoryId);
            const paymentType = findPaymentMethod(entry.paymentId);
            const methodType = paymentType?.methodType;

            return (
              <div key={entry.id} className="rounded-2xl border border-slate-200 p-3 shadow">
                <div className="text-[16px]  flex items-center justify-between mb-2">
                  <div className="flex gap-2 items-center">
                    <p className="font-bold text-slate-900">{formattedDate}</p>
                    <span
                      style={{ boxShadow: `inset 0 -8px 0 0 ${category?.color || '#FEF08A'}` }}
                      className="text-[14px]"
                    >
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
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default LedgerList;
