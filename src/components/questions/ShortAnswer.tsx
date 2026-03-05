
interface Props {
  value?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

export default function ShortAnswer({ value = '', onChange, readOnly }: Props) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange?.(e.target.value)}
      readOnly={readOnly}
      placeholder="Short answer text"
      className="w-full border-b border-gray-300 focus:border-violet-600 outline-none py-1 text-sm bg-transparent placeholder-gray-400"
    />
  );
}
