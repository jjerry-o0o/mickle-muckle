import { ScrollArea } from '@/components/ui';
import type { CreateLedgerEntry, CreateLedgerEntryDraft, EntryType, LedgerEntryDetail } from '@/types/ledger';
import { useLedgerFetch } from '@/hooks/useLedgerFetch';
import { useCategoryFetch } from '@/hooks/useCategoryFetch';
import { usePaymentMethodFetch } from '@/hooks/usePaymentMethodFetch';
import type { Category } from '@/types/category';
import type { PaymentMethod } from '@/types/paymentMethod';
import { useEffect, useRef, useState } from 'react';
import { MdAdd, MdCheck, MdClear, MdEditNote, MdArrowBack } from 'react-icons/md';
import dayjs from 'dayjs';
import LedgerEntryForm from '@/pages/MonthPage/components/LedgerEntryForm';
import LedgerListItem from '@/pages/MonthPage/components/LedgerListItem';

const LedgerList = () => {
  const [addLedger, setAddLedger] = useState<CreateLedgerEntryDraft | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const scrollWrapRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const {
    data: pagingEntries,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useLedgerFetch.useLedgerEntriesByPagination();
  const { data: categories = [] } = useCategoryFetch.useCategories();
  const { data: paymentMethods = [] } = usePaymentMethodFetch.usePaymentMethods();
  const { mutateAsync } = useLedgerFetch.useLedgerEntrySave();
  const findCategory = (categoryId: number) => categories.find((item: Category) => item.id === categoryId);
  const findPaymentMethod = (paymentMethodId: number) =>
    paymentMethods.find((item: PaymentMethod) => item.id === paymentMethodId);
  const entries = pagingEntries?.pages.flatMap(page => page.content) ?? [];

  const addItem = () => {
    setAddLedger({
      entryDate: dayjs().format('YYYY-MM-DD'),
      entryType: 'E',
      amount: 0,
      title: '',
      memo: undefined,
      categoryId: undefined,
      paymentId: undefined,
    });
  };

  const handleAddDataChange = (field: keyof LedgerEntryDetail, newValue: string | number) => {
    setAddLedger(prev => (prev ? { ...prev, [field]: newValue } : prev));
  };

  const saveItem = async () => {
    if (!addLedger || addLedger.categoryId == null || addLedger.paymentId == null) return;

    const payload: CreateLedgerEntry = {
      ...addLedger,
      categoryId: addLedger.categoryId,
      paymentId: addLedger.paymentId,
    };
    const ledgerId = await mutateAsync(payload);
    if (ledgerId) {
      setAddLedger(null);
    }
  };

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
    <div className="h-dvh flex flex-col space-y-3 overflow-hidden">
      <div className="flex flex-col">
        <div className="flex  items-end justify-between mb-4 mx-2">
          <p className="text-[20px] font-semibold text-slate-900">일별 지출 목록</p>
          {isEditMode ? (
            <button
              type="button"
              className="flex font-bold text-[var(--income)] text-start"
              onClick={() => setIsEditMode(false)}
            >
              <span className="inline-flex items-center ">
                <MdArrowBack size="28" color="var(--income)" className="mr-2" /> Back
              </span>
            </button>
          ) : addLedger ? (
            <div className="flex gap-2.5">
              <button type="button" className="flex font-bold text-[var(--income)] text-start" onClick={saveItem}>
                <span className="inline-flex items-center ">
                  <MdCheck size="26" color="var(--income)" className="mr-2" /> Save
                </span>
              </button>
              <button
                type="button"
                className="flex font-bold text-[var(--expense)] text-start"
                onClick={() => setAddLedger(null)}
              >
                <span className="inline-flex items-center ">
                  <MdClear size="26" color="var(--expense)" className="mr-2" /> Cancel
                </span>
              </button>
            </div>
          ) : (
            <div className="flex gap-2.5">
              <button type="button" className="flex font-bold text-[var(--income)] text-start" onClick={addItem}>
                <span className="inline-flex items-center ">
                  <MdAdd size="28" color="var(--income)" className="mr-2" /> Add
                </span>
              </button>
              <button
                type="button"
                className="flex font-bold text-[var(--expense)] text-start"
                onClick={() => setIsEditMode(true)}
              >
                <span className="inline-flex items-center ">
                  <MdEditNote size="28" color="var(--expense)" className="mr-2" /> Edit
                </span>
              </button>
            </div>
          )}
        </div>
        {addLedger && (
          <LedgerEntryForm
            ledger={addLedger}
            onChange={handleAddDataChange}
            categories={categories}
            paymentMethods={paymentMethods}
          />
        )}
      </div>

      <ScrollArea ref={scrollWrapRef} className="h-full pr-2">
        <div className="h-full space-y-4 p-2">
          {entries?.map((entry: LedgerEntryDetail) => (
            <LedgerListItem
              key={entry.entryId}
              entry={entry}
              category={findCategory(entry.categoryId)}
              paymentType={findPaymentMethod(entry.paymentId)}
              categories={categories}
              paymentMethods={paymentMethods}
              isEditMode={isEditMode}
            />
          ))}
          <div ref={loadMoreRef} className="h-10" />
        </div>
      </ScrollArea>
    </div>
  );
};

export default LedgerList;
