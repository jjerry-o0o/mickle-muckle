// C.현금 / A.계좌이체 / D.체크카드 / R.신용카드 / E.기타>상품권,기프티콘 등
export type MethodType = 'C' | 'A' | 'D' | 'R' | 'E';

export interface paymentMethod {
  id: number;
  name: string;
  color: string;
  methodType: MethodType;
}
