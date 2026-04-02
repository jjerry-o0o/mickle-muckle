import type { CreateLedgerEntryDraft, EntryType, LedgerEntryDetail } from '@/types/ledger';
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
import type { Category } from '@/types/category';
import type { PaymentMethod } from '@/types/paymentMethod';

const LEDGER_FIELDS = {
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

interface LedgerEntryFormProps {
  ledger: CreateLedgerEntryDraft;
  onChange: (field: keyof LedgerEntryDetail, newValue: string | number) => void;
  categories: Category[];
  paymentMethods: PaymentMethod[];
}

const LedgerEntryForm = ({ ledger, onChange, categories, paymentMethods }: LedgerEntryFormProps) => {
  const parseAmountInput = (value: string) => Number(value.replace(/\D/g, '').replace(/^0+/, ''));

  return (
    <div className="space-y-3 pb-4 border-b">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-3 shadow">
        <div className="grid grid-cols-[20%_25%_1fr_25%] gap-3 ">
          <ToggleGroup
            type="single"
            variant="outline"
            className="w-full"
            value={ledger.entryType}
            onValueChange={value => value && onChange(LEDGER_FIELDS.entryType, value)}
          >
            {ENTRY_TYPE_OPTIONS.map(option => (
              <ToggleGroupItem
                key={option.value}
                value={option.value}
                className={clsx(
                  'transition-none',
                  option.value === 'I' && 'data-[state=on]:bg-[var(--income)] data-[state=on]:text-white flex-1',
                  option.value === 'E' && 'data-[state=on]:bg-[var(--expense)] data-[state=on]:text-white flex-1',
                )}
              >
                {option.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>

          <Input
            type="date"
            value={ledger.entryDate}
            className="w-full"
            onChange={e => onChange(LEDGER_FIELDS.entryDate, e.target.value)}
          />

          <Input
            type="text"
            inputMode="numeric"
            value={ledger.amount.toLocaleString()}
            className="text-end w-full"
            onChange={e => onChange(LEDGER_FIELDS.amount, parseAmountInput(e.target.value))}
          />

          <Select value={ledger.paymentId?.toString()} onValueChange={value => onChange('paymentId', Number(value))}>
            <SelectTrigger className="w-full min-w-0 overflow-hidden">
              <SelectValue placeholder="결제방법" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>결제방법</SelectLabel>
                {paymentMethods.map(payment => (
                  <SelectItem key={payment.id} value={String(payment.id)} className="truncate">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: payment.color }} />
                    <span className="block w-full overflow-hidden text-ellipsis whitespace-nowrap">{payment.name}</span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-[1fr_25%] gap-3">
          <Input
            type="text"
            value={ledger.title}
            placeholder="수입/지출 항목"
            className="w-full"
            onChange={e => onChange(LEDGER_FIELDS.title, e.target.value)}
          />

          <Select value={ledger.categoryId?.toString()} onValueChange={value => onChange('categoryId', Number(value))}>
            <SelectTrigger className="w-full min-w-0 overflow-hidden">
              <SelectValue placeholder="카테고리" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>카테고리</SelectLabel>
                {categories.map(category => (
                  <SelectItem key={category.id} value={String(category.id)} className="truncate">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} />
                    <span className="block w-full overflow-hidden text-ellipsis whitespace-nowrap">
                      {category.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Input
          type="text"
          value={ledger.memo ?? ''}
          placeholder="메모"
          onChange={e => onChange(LEDGER_FIELDS.memo, e.target.value)}
        />
      </div>
    </div>
  );
};

export default LedgerEntryForm;
