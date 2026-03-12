import type { LedgerEntryDetail, LedgerEntrySummary } from '@/types/ledger';
import { axiosApi } from '@/api/axiosInstans';
import type { SliceResponse } from '@/types/common';

export const fetchLedgerEntry = async (id: number): Promise<LedgerEntryDetail> => {
  const { data } = await axiosApi.get<LedgerEntryDetail>(`/ledger/${id}`);
  return data;
};

export const fetchLedgerEntriesByMonth = async (targetYm: string): Promise<LedgerEntrySummary> => {
  const { data } = await axiosApi.get<LedgerEntrySummary>(`/ledger/${targetYm}`);
  return data;
};

export const fetchLedgerEntriesByPagination = async (pageNum: number): Promise<LedgerEntryDetail[]> => {
  const { data } = await axiosApi.get<SliceResponse<LedgerEntryDetail>>(`/ledger/List/${pageNum}`);
  return data.content ?? [];
};
