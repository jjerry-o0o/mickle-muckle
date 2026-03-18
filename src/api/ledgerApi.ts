import type { LedgerEntryAmountSum, LedgerEntryDetail, LedgerEntrySummary } from '@/types/ledger';
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

export const fetchLedgerEntriesDailySum = async (targetYm: string): Promise<MonthEvents[]> => {
  const { data } = await axiosApi.get<LedgerEntryAmountSum[]>(`/ledger/month/sum/${targetYm}`);
  let result: MonthEvents[] = [];
  data.forEach(item => {
    const sign: string = item.entryType === 'E' ? '-' : '+';
    result.push({
      id: item.entryDate,
      title: sign + item.amount,
      start: item.entryDate,
      allDay: true,
      classNames: item.entryType === 'E' ? 'event-expense-border-l' : 'event-income-border-l',
      textColor: item.entryType === 'E' ? '#f18a3d' : '#58bf96',
      extendsProps: {
        amount: item.amount,
      },
    });
  });
  console.log('result = ', result);
  return result;
};
