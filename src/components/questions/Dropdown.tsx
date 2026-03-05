
interface Props {
  options?: string[];
  value?: string;
  onChange?: (value: string) => void;
  onOptionsChange?: (options: string[]) => void;
  isBuilder?: boolean;
}

export default function Dropdown({ options = [], value, onChange, onOptionsChange, isBuilder }: Props) {
  if (isBuilder) {
    return (
      <div className="space-y-2 mt-2">
        {options.map((opt, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-gray-500 text-sm w-5 text-right">{i + 1}.</span>
            <input
              type="text"
              value={opt}
              onChange={e => {
                const newOpts = [...options];
                newOpts[i] = e.target.value;
                onOptionsChange?.(newOpts);
              }}
              className="flex-1 border-b border-gray-300 focus:border-violet-600 outline-none text-sm py-1"
              placeholder={`Option ${i + 1}`}
            />
            {options.length > 1 && (
              <button
                onClick={() => onOptionsChange?.(options.filter((_, idx) => idx !== i))}
                className="text-gray-400 hover:text-red-500 text-lg leading-none"
              >×</button>
            )}
          </div>
        ))}
        <button
          onClick={() => onOptionsChange?.([...options, `Option ${options.length + 1}`])}
          className="text-violet-600 hover:text-violet-800 text-sm font-medium mt-1"
        >
          + Add option
        </button>
      </div>
    );
  }

  return (
    <select
      value={value || ''}
      onChange={e => onChange?.(e.target.value)}
      className="mt-2 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-violet-600 min-w-48"
    >
      <option value="">Choose...</option>
      {options.map((opt, i) => (
        <option key={i} value={opt}>{opt}</option>
      ))}
    </select>
  );
}
