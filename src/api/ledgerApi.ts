import type { LedgerEntryDetail, LedgerEntrySummary } from '@/types/ledger';
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
      classNames: item.entryType === 'E' ? 'event-border-left-expense' : 'event-border-left-income',
      extendsProps: {
        amount: item.amount,
      },
    });
  });
  return result;
};

export const fetchLedgerEntriesByPagination = async (pageNum: number): Promise<LedgerEntryDetail[]> => {
  const { data } = await axiosApi.get<SliceResponse<LedgerEntryDetail>>(`/ledger/List/${pageNum}`);
  return data.content ?? [];
};
