// 'E' (expense) / 'I' (income)
export type EntryType = 'E' | 'I';

// C.현금 / A.계좌이체 / D.체크카드 / R.신용카드 / E.기타>상품권,기프티콘 등
export type MethodType = 'C' | 'A' | 'D' | 'R' | 'E';

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
