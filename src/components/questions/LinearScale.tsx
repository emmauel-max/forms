
interface Props {
  scaleMin?: number;
  scaleMax?: number;
  scaleMinLabel?: string;
  scaleMaxLabel?: string;
  value?: string;
  onChange?: (value: string) => void;
  onScaleChange?: (min: number, max: number, minLabel: string, maxLabel: string) => void;
  isBuilder?: boolean;
}

export default function LinearScale({
  scaleMin = 1,
  scaleMax = 5,
  scaleMinLabel = '',
  scaleMaxLabel = '',
  value,
  onChange,
  onScaleChange,
  isBuilder,
}: Props) {
  const numbers = Array.from({ length: scaleMax - scaleMin + 1 }, (_, i) => scaleMin + i);

  if (isBuilder) {
    return (
      <div className="mt-2 space-y-3">
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600">Min:</label>
          <select
            value={scaleMin}
            onChange={e => onScaleChange?.(Number(e.target.value), scaleMax, scaleMinLabel, scaleMaxLabel)}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            {[0, 1].map(v => <option key={v} value={v}>{v}</option>)}
          </select>
          <input
            type="text"
            value={scaleMinLabel}
            onChange={e => onScaleChange?.(scaleMin, scaleMax, e.target.value, scaleMaxLabel)}
            placeholder="Label (optional)"
            className="border-b border-gray-300 focus:border-violet-600 outline-none text-sm py-1 flex-1"
          />
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600">Max:</label>
          <select
            value={scaleMax}
            onChange={e => onScaleChange?.(scaleMin, Number(e.target.value), scaleMinLabel, scaleMaxLabel)}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(v => <option key={v} value={v}>{v}</option>)}
          </select>
          <input
            type="text"
            value={scaleMaxLabel}
            onChange={e => onScaleChange?.(scaleMin, scaleMax, scaleMinLabel, e.target.value)}
            placeholder="Label (optional)"
            className="border-b border-gray-300 focus:border-violet-600 outline-none text-sm py-1 flex-1"
          />
        </div>
        <div className="flex gap-2 items-center flex-wrap mt-1">
          {numbers.map(n => (
            <div key={n} className="flex flex-col items-center">
              <span className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-sm text-gray-500">{n}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3">
      <div className="flex gap-3 items-end flex-wrap">
        {scaleMinLabel && <span className="text-xs text-gray-500 mb-1">{scaleMinLabel}</span>}
        {numbers.map(n => (
          <label key={n} className="flex flex-col items-center gap-1 cursor-pointer">
            <span className="text-xs text-gray-600">{n}</span>
            <input
              type="radio"
              name={`scale-${scaleMin}-${scaleMax}`}
              value={String(n)}
              checked={value === String(n)}
              onChange={() => onChange?.(String(n))}
              className="text-violet-600 focus:ring-violet-500"
            />
          </label>
        ))}
        {scaleMaxLabel && <span className="text-xs text-gray-500 mb-1">{scaleMaxLabel}</span>}
      </div>
    </div>
  );
}
