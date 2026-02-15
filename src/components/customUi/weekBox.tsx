import { DayBox } from '@/components/customUi';
import {
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  FieldGroup,
  Field,
  FieldLabel,
  Input,
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxItem,
  ComboboxContent,
} from '@/components/ui';
import { payType, weekText } from '@/assets/mockData';

const WeekBox = () => {
  return (
    <div className="flex flex-1 h-full">
      <Dialog>
        {weekText.map(day => (
          <DialogTrigger key={day.id} className="flex flex-1">
            <DayBox dayNum={day.id}></DayBox>
          </DialogTrigger>
        ))}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>지출 항목 추가</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="date">date</FieldLabel>
              <Input id="date" type="date"></Input>
              <FieldLabel htmlFor="amount">amount</FieldLabel>
              <Input id="amount" type="number"></Input>
              <FieldLabel htmlFor="title">title</FieldLabel>
              <Input id="title" type="text"></Input>
              <FieldLabel htmlFor="category">category</FieldLabel>
              <Input id="category" type="text"></Input>
              <FieldLabel htmlFor="payType">payType</FieldLabel>
              <Combobox id="payType" items={payType}>
                <ComboboxInput placeholder="Select a payment type" />
                <ComboboxContent>
                  <ComboboxList>
                    {type => (
                      <ComboboxItem key={type.id} value={type.name}>
                        {type.name}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Field>
          </FieldGroup>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WeekBox;
