import type { Question, QuestionType } from '../types/form';
import ShortAnswer from './questions/ShortAnswer';
import Paragraph from './questions/Paragraph';
import MultipleChoice from './questions/MultipleChoice';
import Checkboxes from './questions/Checkboxes';
import Dropdown from './questions/Dropdown';
import DateQuestion from './questions/DateQuestion';
import TimeQuestion from './questions/TimeQuestion';
import LinearScale from './questions/LinearScale';

interface Props {
  question: Question;
  sectionId: string;
  isBuilder?: boolean;
  onUpdate?: (updates: Partial<Question>) => void;
  onDelete?: () => void;
  onTypeChange?: (type: QuestionType) => void;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
}

const QUESTION_TYPES: { value: QuestionType; label: string }[] = [
  { value: 'short_answer', label: 'Short Answer' },
  { value: 'paragraph', label: 'Paragraph' },
  { value: 'multiple_choice', label: 'Multiple Choice' },
  { value: 'checkboxes', label: 'Checkboxes' },
  { value: 'dropdown', label: 'Dropdown' },
  { value: 'date', label: 'Date' },
  { value: 'time', label: 'Time' },
  { value: 'linear_scale', label: 'Linear Scale' },
];

export default function QuestionCard({ question, isBuilder, onUpdate, onDelete, onTypeChange, value, onChange }: Props) {
  const renderQuestion = () => {
    switch (question.type) {
      case 'short_answer':
        return <ShortAnswer value={isBuilder ? '' : (value as string || '')} onChange={v => onChange?.(v)} readOnly={isBuilder} />;
      case 'paragraph':
        return <Paragraph value={isBuilder ? '' : (value as string || '')} onChange={v => onChange?.(v)} readOnly={isBuilder} />;
      case 'multiple_choice':
        return (
          <MultipleChoice
            options={question.options}
            value={isBuilder ? undefined : (value as string)}
            onChange={v => onChange?.(v)}
            onOptionsChange={opts => onUpdate?.({ options: opts })}
            isBuilder={isBuilder}
          />
        );
      case 'checkboxes':
        return (
          <Checkboxes
            options={question.options}
            value={isBuilder ? [] : (value as string[] || [])}
            onChange={v => onChange?.(v)}
            onOptionsChange={opts => onUpdate?.({ options: opts })}
            isBuilder={isBuilder}
          />
        );
      case 'dropdown':
        return (
          <Dropdown
            options={question.options}
            value={isBuilder ? undefined : (value as string)}
            onChange={v => onChange?.(v)}
            onOptionsChange={opts => onUpdate?.({ options: opts })}
            isBuilder={isBuilder}
          />
        );
      case 'date':
        return <DateQuestion value={isBuilder ? undefined : (value as string)} onChange={v => onChange?.(v)} readOnly={isBuilder} />;
      case 'time':
        return <TimeQuestion value={isBuilder ? undefined : (value as string)} onChange={v => onChange?.(v)} readOnly={isBuilder} />;
      case 'linear_scale':
        return (
          <LinearScale
            scaleMin={question.scaleMin}
            scaleMax={question.scaleMax}
            scaleMinLabel={question.scaleMinLabel}
            scaleMaxLabel={question.scaleMaxLabel}
            value={isBuilder ? undefined : (value as string)}
            onChange={v => onChange?.(v)}
            onScaleChange={(min, max, minLabel, maxLabel) =>
              onUpdate?.({ scaleMin: min, scaleMax: max, scaleMinLabel: minLabel, scaleMaxLabel: maxLabel })
            }
            isBuilder={isBuilder}
          />
        );
      default:
        return null;
    }
  };

  if (isBuilder) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 mb-4">
        <div className="flex items-start gap-3 mb-3">
          <input
            type="text"
            value={question.title}
            onChange={e => onUpdate?.({ title: e.target.value })}
            placeholder="Question"
            className="flex-1 text-base font-medium border-b border-gray-300 focus:border-violet-600 outline-none py-1"
          />
          <select
            value={question.type}
            onChange={e => onTypeChange?.(e.target.value as QuestionType)}
            className="border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:border-violet-600 min-w-36"
          >
            {QUESTION_TYPES.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        {renderQuestion()}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={question.required}
              onChange={e => onUpdate?.({ required: e.target.checked })}
              className="text-violet-600"
            />
            Required
          </label>
          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-red-500 text-sm flex items-center gap-1 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 mb-4">
      <div className="mb-2">
        <span className="text-sm font-medium text-gray-800">
          {question.title}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </span>
      </div>
      {renderQuestion()}
    </div>
  );
}
