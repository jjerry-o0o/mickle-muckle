// 'E' (expense) / 'I' (income)
export type EntryType = 'E' | 'I';

export interface LedgerEntry {
  id: number;
  entryDate: string;
  entryType: EntryType;
  amount: number;
  title: string;
  memo?: string;
  categoryId: number;
  paymentId: number;
}

export type LedgerEntryDetail = LedgerEntry;

export type LedgerEntrySummary = Pick<LedgerEntry, 'id' | 'entryDate' | 'entryType' | 'amount' | 'title'>;
