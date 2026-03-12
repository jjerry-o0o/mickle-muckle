import { useQuery } from '@tanstack/react-query';
import { fetchLedgerEntriesByMonth, fetchLedgerEntriesByPagination, fetchLedgerEntry } from '@/api/ledgerApi';

export const useLedgerFetch = {
  useLedgerEntry: (id: number) =>
    useQuery({
      queryKey: ['ledger', id],
      queryFn: () => fetchLedgerEntry(id),
    }),

  useLedgerEntriesByMonth: (targetYm: string) =>
    useQuery({
      queryKey: ['ledger', targetYm],
      queryFn: () => fetchLedgerEntriesByMonth(targetYm),
    }),

  useLedgerEntriesByPagination: (pageNum: number) =>
    useQuery({
      queryKey: ['ledger', pageNum],
      queryFn: () => fetchLedgerEntriesByPagination(pageNum),
    }),
};
