import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
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

  useLedgerEntriesByPagination: () =>
    useInfiniteQuery({
      queryKey: ['/ledger/month'],
      queryFn: ({ pageParam = 0 }) => fetchLedgerEntriesByPagination(pageParam),
      initialPageParam: 0,
      getNextPageParam: lastPage => {
        return lastPage.last ? undefined : lastPage.number + 1;
      },
    }),

  useLedgerEntriesDailySum: (targetYm: string) =>
    useQuery({
      queryKey: ['/ledger/month/sum', targetYm],
      queryFn: () => fetchLedgerEntriesDailySum(targetYm),
    }),
};
