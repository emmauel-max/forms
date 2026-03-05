
interface Props {
  value?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

export default function DateQuestion({ value = '', onChange, readOnly }: Props) {
  return (
    <input
      type="date"
      value={value}
      onChange={e => onChange?.(e.target.value)}
      readOnly={readOnly}
      className="mt-2 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-violet-600"
    />
  );
}
