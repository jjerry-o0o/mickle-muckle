// 'E' (expense) / 'I' (income)
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
