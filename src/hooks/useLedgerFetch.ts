import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createLedgerEntry,
  deleteLedgerEntry,
  fetchLedgerEntriesByMonth,
  fetchLedgerEntriesByPagination,
  fetchLedgerEntriesDailySum,
  fetchLedgerEntry,
} from '@/api/ledgerApi';
import type { CreateLedgerEntry } from '@/types/ledger';

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

  useLedgerEntrySave: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (addLedger: CreateLedgerEntry) => createLedgerEntry(addLedger),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/ledger/month'] });
        queryClient.invalidateQueries({ queryKey: ['/ledger/month/sum'] });
      },
    });
  },

  useLedgerEntryDelete: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: number) => deleteLedgerEntry(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/ledger/month'] });
        queryClient.invalidateQueries({ queryKey: ['/ledger/month/sum'] });
      },
    });
  },
};
