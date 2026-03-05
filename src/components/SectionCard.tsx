import type { Section, Question, QuestionType } from '../types/form';
import QuestionCard from './QuestionCard';

interface Props {
  section: Section;
  onUpdate: (updates: Partial<Section>) => void;
  onDelete: () => void;
  onAddQuestion: () => void;
  onUpdateQuestion: (questionId: string, updates: Partial<Question>) => void;
  onDeleteQuestion: (questionId: string) => void;
  onChangeQuestionType: (questionId: string, type: QuestionType) => void;
  canDelete: boolean;
}

export default function SectionCard({
  section,
  onUpdate,
  onDelete,
  onAddQuestion,
  onUpdateQuestion,
  onDeleteQuestion,
  onChangeQuestionType,
  canDelete,
}: Props) {
  return (
    <div className="mb-8">
      <div className="bg-white rounded-lg border-t-4 border-t-violet-700 border border-gray-200 shadow-sm p-5 mb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 space-y-2">
            <input
              type="text"
              value={section.title}
              onChange={e => onUpdate({ title: e.target.value })}
              placeholder="Section title"
              className="w-full text-lg font-semibold border-b border-gray-300 focus:border-violet-600 outline-none py-1"
            />
            <input
              type="text"
              value={section.description || ''}
              onChange={e => onUpdate({ description: e.target.value })}
              placeholder="Section description (optional)"
              className="w-full text-sm text-gray-600 border-b border-gray-200 focus:border-violet-600 outline-none py-1"
            />
          </div>
          {canDelete && (
            <button
              onClick={onDelete}
              className="text-gray-400 hover:text-red-500 text-sm flex items-center gap-1 transition-colors mt-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete Section
            </button>
          )}
        </div>
      </div>

      {section.questions.map(q => (
        <QuestionCard
          key={q.id}
          question={q}
          sectionId={section.id}
          isBuilder
          onUpdate={updates => onUpdateQuestion(q.id, updates)}
          onDelete={() => onDeleteQuestion(q.id)}
          onTypeChange={type => onChangeQuestionType(q.id, type)}
        />
      ))}

      <button
        onClick={onAddQuestion}
        className="w-full border-2 border-dashed border-violet-300 hover:border-violet-500 text-violet-600 hover:text-violet-800 rounded-lg py-3 text-sm font-medium transition-colors"
      >
        + Add Question
      </button>
    </div>
  );
}
