import { ScrollArea } from '@/components/ui';
import { formatToKoreanDate } from '@/utils/dateUtil';
import type { EntryType, LedgerEntryDetail } from '@/types/ledger';
import { useLedgerFetch } from '@/hooks/useLedgerFetch';
import { useCategoryFetch } from '@/hooks/useCategoryFetch';
import { usePaymentMethodFetch } from '@/hooks/usePaymentMethodFetch';
import { clsx } from 'clsx';
import type { category } from '@/types/category';
import type { paymentMethod } from '@/types/paymentMethod';
import { useEffect, useRef } from 'react';

const amountPrefix = (entryType: EntryType) => (entryType === 'E' ? '-' : '+');
const amountTextStyle = (entryType: EntryType) => (entryType === 'E' ? 'text-orange-500' : 'text-blue-600');

const LedgerList = () => {
  const {
    data: pagingEntries,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useLedgerFetch.useLedgerEntriesByPagination();
  const { data: categories = [] } = useCategoryFetch.useCategories();
  const { data: paymentMethods = [] } = usePaymentMethodFetch.usePaymentMethods();
  const findCategory = (categoryId: number) => categories.find((item: category) => item.id === categoryId);
  const findPaymentMethod = (paymentMethodId: number) =>
    paymentMethods.find((item: paymentMethod) => item.id === paymentMethodId);
  const entries = pagingEntries?.pages.flatMap(page => page.content) ?? [];
  const scrollWrapRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = scrollWrapRef.current?.querySelector('[data-radix-scroll-area-viewport]') as HTMLDivElement | null;
    const target = loadMoreRef.current;
    if (!root || !target) return;

    const observer = new IntersectionObserver(
      item => {
        if (!item[0]?.isIntersecting) return;
        if (!hasNextPage) return;
        if (isFetchingNextPage) return;

        fetchNextPage();
      },
      { root, threshold: 0 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div ref={scrollWrapRef} className="h-dvh flex flex-col space-y-3 overflow-hidden">
      <div className="flex items-center justify-between">
        <p className="text-[20px] font-semibold text-slate-900">일별 지출 목록</p>
        <button
          type="button"
          className="flex justify-center items-center text-2xl px-2 rounded-lg border bg-emerald-50 text-emerald-700 border-emerald-400"
        >
          +
        </button>
      </div>

      <ScrollArea ref={scrollWrapRef} className="h-full">
        <div className="h-full space-y-3">
          {entries?.map((entry: LedgerEntryDetail) => {
            const formattedDate = formatToKoreanDate(entry.entryDate);
            const amount = `${amountPrefix(entry.entryType)}${entry.amount.toLocaleString()}원`;
            const category = findCategory(entry.categoryId);
            const paymentType = findPaymentMethod(entry.paymentId);
            const methodType = paymentType?.methodType;

            return (
              <div key={entry.entryId} className="rounded-2xl border border-slate-200 p-3 shadow">
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
          <div ref={loadMoreRef} className="h-10" />
        </div>
      </ScrollArea>
    </div>
  );
};

export default LedgerList;
