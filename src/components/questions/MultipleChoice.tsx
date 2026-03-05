
interface Props {
  options?: string[];
  value?: string;
  onChange?: (value: string) => void;
  onOptionsChange?: (options: string[]) => void;
  isBuilder?: boolean;
}

export default function MultipleChoice({ options = [], value, onChange, onOptionsChange, isBuilder }: Props) {
  if (isBuilder) {
    return (
      <div className="space-y-2 mt-2">
        {options.map((opt, i) => (
          <div key={i} className="flex items-center gap-2">
            <input type="radio" disabled className="text-violet-600" />
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
    <div className="space-y-2 mt-2">
      {options.map((opt, i) => (
        <label key={i} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={`mc-${i}`}
            value={opt}
            checked={value === opt}
            onChange={() => onChange?.(opt)}
            className="text-violet-600 focus:ring-violet-500"
          />
          <span className="text-sm">{opt}</span>
        </label>
      ))}
    </div>
  );
}
