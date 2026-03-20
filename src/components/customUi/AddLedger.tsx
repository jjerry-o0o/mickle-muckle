import type { EntryType, LedgerEntryDetail } from '@/types/ledger';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { clsx } from 'clsx';
import { Input } from '@/components/ui';
import type { category } from '@/types/category';
import type { paymentMethod } from '@/types/paymentMethod';

const LEDGER_FIELDS = {
  entryId: 'entryId',
  entryDate: 'entryDate',
  entryType: 'entryType',
  amount: 'amount',
  title: 'title',
  memo: 'memo',
  categoryId: 'categoryId',
  paymentId: 'paymentId',
} satisfies Record<string, keyof LedgerEntryDetail>;

const ENTRY_TYPE_OPTIONS: { label: string; value: EntryType }[] = [
  { label: '지출', value: 'E' },
  { label: '수입', value: 'I' },
];

interface AddLedgerProps {
  addItems: LedgerEntryDetail[];
  handleAddDataChange: (id: number, field: string, newValue: string | number) => void;
  categories: category[];
  paymentMethods: paymentMethod[];
}

const AddLedger = ({ addItems, handleAddDataChange, categories, paymentMethods }: AddLedgerProps) => {
  const parseAmountInput = (value: string) => Number(value.replace(/\D/g, '').replace(/^0+/, ''));

  return (
    <div className="space-y-3">
      {addItems.map(item => (
        <div key={item.entryId} className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-3 shadow">
          {/* 첫번째 줄 */}
          <div className="grid grid-cols-[20%_25%_1fr_25%] gap-3">
            <ToggleGroup
              type="single"
              variant="outline"
              className="w-full"
              defaultValue={item.entryType}
              onValueChange={value => handleAddDataChange(item.entryId, LEDGER_FIELDS.entryType, value)}
            >
              {ENTRY_TYPE_OPTIONS.map(option => {
                return (
                  <ToggleGroupItem
                    key={option.value}
                    value={option.value}
                    className={clsx(
                      option.value === 'I' && 'data-[state=on]:bg-[var(--cal-mint)] data-[state=on]:text-white flex-1',
                      option.value === 'E' &&
                        'data-[state=on]:bg-[var(--cal-chip-dot)] data-[state=on]:text-white flex-1',
                    )}
                  >
                    {option.label}
                  </ToggleGroupItem>
                );
              })}
            </ToggleGroup>
            <Input
              type="date"
              value={item.entryDate}
              className="w-full"
              onChange={e => handleAddDataChange(item.entryId, LEDGER_FIELDS.entryDate, e.target.value)}
            />
            <Input
              type="text"
              inputMode="numeric"
              value={item.amount.toLocaleString()}
              className="text-end w-full"
              onChange={e => handleAddDataChange(item.entryId, LEDGER_FIELDS.amount, parseAmountInput(e.target.value))}
            />
            <Select>
              <SelectTrigger className="w-full min-w-0 overflow-hidden">
                <SelectValue placeholder="결제방법" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>결제방법</SelectLabel>
                  {paymentMethods.map(payment => (
                    <SelectItem key={payment.id} value={String(payment.id)} className="truncate">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: payment.color }}></div>
                      <span className="block w-full overflow-hidden text-ellipsis whitespace-nowrap">
                        {payment.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-[1fr_25%] gap-3">
            <Input
              type="text"
              value={item.title}
              placeholder="수입/지출 항목"
              className="w-full"
              onChange={e => handleAddDataChange(item.entryId, LEDGER_FIELDS.title, e.target.value)}
            />
            <Select>
              <SelectTrigger className="w-full min-w-0 overflow-hidden">
                <SelectValue placeholder="카테고리" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>카테고리</SelectLabel>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={String(category.id)} className="truncate">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                      <span className="block w-full overflow-hidden text-ellipsis whitespace-nowrap">
                        {category.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex">
            <Input
              type="text"
              value={item.memo}
              placeholder="메모"
              onChange={e => handleAddDataChange(item.entryId, LEDGER_FIELDS.memo, e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddLedger;
