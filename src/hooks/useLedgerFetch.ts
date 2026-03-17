import { useQuery } from '@tanstack/react-query';
import {
  fetchLedgerEntriesByMonth,
  fetchLedgerEntriesByPagination,
  fetchLedgerEntriesDailySum,
  fetchLedgerEntry,
} from '@/api/ledgerApi';

export const useLedgerFetch = {
  useLedgerEntry: (id: number) =>
    useQuery({
      queryKey: ['/ledger', id],
      queryFn: () => fetchLedgerEntry(id),
    }),

  useLedgerEntriesByMonth: (targetYm: string) =>
    useQuery({
      queryKey: ['/ledger/month', targetYm],
      queryFn: () => fetchLedgerEntriesByMonth(targetYm),
    }),

  useLedgerEntriesByPagination: (pageNum: number) =>
    useQuery({
      queryKey: ['/ledger/month', pageNum],
      queryFn: () => fetchLedgerEntriesByPagination(pageNum),
    }),

  useLedgerEntriesDailySum: (targetYm: string) =>
    useQuery({
      queryKey: ['/ledger/month/sum', targetYm],
      queryFn: () => fetchLedgerEntriesDailySum(targetYm),
    }),
};
