// 'E' (expense) / 'I' (income)
import type { MonthEvents } from '@/types/common';

export type EntryType = 'E' | 'I';

type LedgerEntryBase = {
  entryDate: string;
  entryType: EntryType;
  amount: number;
  title: string;
};

export type LedgerEntryDetail = LedgerEntryBase & {
  entryId: number;
  categoryId: number;
  paymentId: number;
  memo?: string | null;
};

export type LedgerEntrySummary = LedgerEntryBase & {
  entryId: number;
};

export type LedgerEntryAmountSum = Pick<LedgerEntryBase, 'entryDate' | 'entryType' | 'amount'>;

export type CreateLedgerEntryDraft = LedgerEntryBase & {
  categoryId?: number;
  paymentId?: number;
  memo?: string | null;
};

export type CreateLedgerEntry = LedgerEntryBase & {
  categoryId: number;
  paymentId: number;
  memo?: string | null;
};

export type UpdateLedgerEntry = CreateLedgerEntry;

export interface TotalAmount {
  income: number;
  expense: number;
}

export interface LedgerMonthData {
  totalAmount: TotalAmount;
  events: MonthEvents[];
}
