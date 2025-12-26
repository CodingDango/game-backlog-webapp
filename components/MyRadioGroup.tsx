import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Props {
  options: string[];
  onValueChange: (value: string) => void;
  value: string;
}

export function MyRadioGroup({ options, value, onValueChange }: Props) {
  return (
    <RadioGroup value={value} onValueChange={onValueChange} className="flex gap-4 flex-wrap">
      {options.map((option, idx) => (
        <Label
          key={`option-${idx}`}
          className="flex items-center gap-3 capitalize"
        >
          <RadioGroupItem value={option} id={`option-${idx}`} />
          {option}
        </Label>
      ))}
    </RadioGroup>
  );
}