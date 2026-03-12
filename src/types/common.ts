export interface SliceResponse<T> {
  content: T[];
  last: boolean;
  number: number;
}
