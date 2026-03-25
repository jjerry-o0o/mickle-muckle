import type {
  CreateLedgerEntry,
  LedgerEntryAmountSum,
  LedgerEntryDetail,
  LedgerEntrySummary,
  LedgerMonthData,
} from '@/types/ledger';
import { axiosApi } from '@/api/axiosInstans';
import type { MonthEvents, SliceResponse } from '@/types/common';

export const fetchLedgerEntry = async (id: number): Promise<LedgerEntryDetail> => {
  const { data } = await axiosApi.get<LedgerEntryDetail>(`/ledger/${id}`);
  return data;
};

export const fetchLedgerEntriesByMonth = async (targetYm: string): Promise<MonthEvents[]> => {
  const { data } = await axiosApi.get<LedgerEntrySummary[]>(`/ledger/month/${targetYm}`);
  let result: MonthEvents[] = [];
  data.forEach(item => {
    result.push({
      id: item.entryId + '',
      title: item.title,
      start: item.entryDate,
      allDay: true,
      classNames: item.entryType === 'E' ? 'event-expense-border-l' : 'event-income-border-l',
      textColor: item.entryType === 'E' ? '#f18a3d' : '#58bf96',
      extendsProps: {
        amount: item.amount,
      },
    });
  });
  return result;
};

export const fetchLedgerEntriesByPagination = async (pageNum: number): Promise<SliceResponse<LedgerEntryDetail>> => {
  const { data } = await axiosApi.get<SliceResponse<LedgerEntryDetail>>(`/ledger/List/${pageNum}`);
  return data;
};

export const fetchLedgerEntriesDailySum = async (targetYm: string): Promise<LedgerMonthData> => {
  const { data } = await axiosApi.get<LedgerEntryAmountSum[]>(`/ledger/month/sum/${targetYm}`);
  let incomeAmount = 0;
  let expenseAmount = 0;
  data.forEach(item => {
    incomeAmount += item.entryType === 'I' ? item.amount : 0;
    expenseAmount += item.entryType === 'E' ? item.amount : 0;
  });
  return {
    totalAmount: { income: incomeAmount, expense: expenseAmount },
    events: data.map(item => ({
      id: item.entryDate,
      title: (item.entryType === 'E' ? '-' : '+') + item.amount.toLocaleString(),
      start: item.entryDate,
      allDay: true,
      classNames: item.entryType === 'E' ? 'event-expense-border-l' : 'event-income-border-l',
      textColor: item.entryType === 'E' ? '#f18a3d' : '#58bf96',
      extendsProps: {
        amount: item.amount,
      },
    })),
  };
};

export const createLedgerEntry = async (addLedger: CreateLedgerEntry): Promise<number> => {
  const { data } = await axiosApi.post<number>(`/ledger`, addLedger);
  return data;
};
