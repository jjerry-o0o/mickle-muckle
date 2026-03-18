// 'E' (expense) / 'I' (income)
import type { MonthEvents } from '@/types/common';

export type EntryType = 'E' | 'I';

export interface LedgerEntry {
  entryId: number;
  entryDate: string;
  entryType: EntryType;
  amount: number;
  title: string;
  memo?: string;
  categoryId: number;
  paymentId: number;
}

export type LedgerEntryDetail = LedgerEntry;

export type LedgerEntrySummary = Pick<LedgerEntry, 'entryId' | 'entryDate' | 'entryType' | 'amount' | 'title'>;

export type LedgerEntryAmountSum = Pick<LedgerEntry, 'entryDate' | 'entryType' | 'amount'>;

export interface TotalAmount {
  income: number;
  expense: number;
}

export interface LedgerMonthData {
  totalAmount: TotalAmount;
  events: MonthEvents[];
}
