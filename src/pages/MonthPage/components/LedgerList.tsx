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
import ListHeaderButton from '@/pages/MonthPage/components/ListHeaderButton';

type listModePhase = 'none' | 'select' | 'editing' | 'adding';

interface ListModeState {
  phase: listModePhase;
  editingEntryId: number | null;
  formLedger: CreateLedgerEntryDraft | null;
}

const LedgerList = () => {
  const [addLedger, setAddLedger] = useState<CreateLedgerEntryDraft | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingEntryId, setEditingEntryId] = useState<number | null>(null);

  const [listModeState, setListModeState] = useState<ListModeState>({
    phase: 'none',
    editingEntryId: null,
    formLedger: null,
  });

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
  const { mutateAsync: createLedgerEntry } = useLedgerFetch.useLedgerEntrySave();
  const { mutateAsync: updateLedgerEntry } = useLedgerFetch.useLedgerEntryUpdate();
  const findCategory = (categoryId: number) => categories.find((item: Category) => item.id === categoryId);
  const findPaymentMethod = (paymentMethodId: number) =>
    paymentMethods.find((item: PaymentMethod) => item.id === paymentMethodId);
  const entries = pagingEntries?.pages.flatMap(page => page.content) ?? [];

  const addItem = () => {
    setListModeState({
      phase: 'adding',
      editingEntryId: null,
      formLedger: {
        entryDate: dayjs().format('YYYY-MM-DD'),
        entryType: 'E',
        amount: 0,
        title: '',
        memo: undefined,
        categoryId: undefined,
        paymentId: undefined,
      },
    });
  };

  const startEdit = (entry: LedgerEntryDetail) => {
    setListModeState({
      phase: 'editing',
      editingEntryId: entry.entryId,
      formLedger: {
        entryDate: entry.entryDate,
        entryType: entry.entryType,
        amount: entry.amount,
        title: entry.title,
        memo: entry.memo,
        categoryId: entry.categoryId,
        paymentId: entry.paymentId,
      },
    });
  };

  const handleAddDataChange = (field: keyof LedgerEntryDetail, newValue: string | number) => {
    setListModeState(prev => {
      if (!prev.formLedger) return prev;

      return {
        ...prev,
        formLedger: {
          ...prev.formLedger,
          [field]: newValue,
        },
      };
    });
  };

  const saveItem = async () => {
    if (!addLedger || addLedger.categoryId == null || addLedger.paymentId == null) return;

    const payload: CreateLedgerEntry = {
      ...addLedger,
      categoryId: addLedger.categoryId,
      paymentId: addLedger.paymentId,
    };

    const ledgerId = editingEntryId
      ? await updateLedgerEntry({ id: editingEntryId, ledger: payload })
      : await createLedgerEntry(payload);

    if (ledgerId) {
      setListModeState(prev => ({
        phase: prev.phase === 'editing' ? 'select' : 'none',
        editingEntryId: null,
        formLedger: null,
      }));
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
          {listModeState.phase === 'select' && (
            <ListHeaderButton
              buttons={[
                {
                  label: 'Back',
                  onClick: () => setIsEditMode(false),
                  icon: <MdArrowBack size="28" />,
                  color: '--income',
                },
              ]}
            />
          )}
          {listModeState.phase === 'none' && (
            <ListHeaderButton
              buttons={[
                {
                  label: 'Add',
                  onClick: addItem,
                  icon: <MdAdd size="28" />,
                  color: '--income',
                },
                {
                  label: 'Edit',
                  onClick: () => setListModeState(prev => ({ ...prev, phase: 'select' })),
                  icon: <MdEditNote size="28" />,
                  color: '--expense',
                },
              ]}
            />
          )}
          {(listModeState.phase === 'editing' || listModeState.phase === 'adding') && (
            <ListHeaderButton
              buttons={[
                {
                  label: 'Save',
                  onClick: saveItem,
                  icon: <MdCheck size="26" />,
                  color: '--income',
                },
                {
                  label: 'Cancel',
                  onClick: () => {
                    setListModeState(prev => ({
                      phase: prev.phase === 'editing' ? 'select' : 'none',
                      editingEntryId: null,
                      formLedger: null,
                    }));
                  },
                  icon: <MdClear size="26" />,
                  color: '--expense',
                },
              ]}
            />
          )}
        </div>
        {listModeState.formLedger && (
          <LedgerEntryForm
            ledger={listModeState.formLedger}
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
              isEditMode={isEditMode}
              startEdit={startEdit}
              editingEntryId={editingEntryId}
            />
          ))}
          <div ref={loadMoreRef} className="h-10" />
        </div>
      </ScrollArea>
    </div>
  );
};

export default LedgerList;
