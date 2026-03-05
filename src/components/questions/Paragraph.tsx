
interface Props {
  value?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

export default function Paragraph({ value = '', onChange, readOnly }: Props) {
  return (
    <textarea
      value={value}
      onChange={e => onChange?.(e.target.value)}
      readOnly={readOnly}
      placeholder="Long answer text"
      rows={3}
      className="w-full border-b border-gray-300 focus:border-violet-600 outline-none py-1 text-sm bg-transparent placeholder-gray-400 resize-none"
    />
  );
}
