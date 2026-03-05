import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getForm, saveResponse } from '../utils/formUtils';
import { generateId } from '../utils/formUtils';
import type { Form, FormResponse } from '../types/form';
import QuestionCard from '../components/QuestionCard';

export default function FormViewer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = useState<Form | null>(() => (id ? getForm(id) : null));
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!form) navigate('/');
  }, [form, navigate]);

  if (!form) return <div className="min-h-screen bg-gray-100 flex items-center justify-center text-gray-500">Loading...</div>;

  const section = form.sections[currentSection];
  const isFirst = currentSection === 0;
  const isLast = currentSection === form.sections.length - 1;
  const progress = ((currentSection + 1) / form.sections.length) * 100;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    for (const q of section.questions) {
      if (q.required) {
        const ans = answers[q.id];
        if (!ans || (Array.isArray(ans) && ans.length === 0) || ans === '') {
          newErrors[q.id] = 'This question is required.';
        }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      setErrors({});
      setCurrentSection(s => s + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    setErrors({});
    setCurrentSection(s => s - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const response: FormResponse = {
      id: generateId(),
      formId: form.id,
      answers,
      submittedAt: new Date().toISOString(),
    };
    saveResponse(response);
    navigate(`/response/${form.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Form Header */}
      <div className="bg-violet-700 text-white py-8">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-2xl font-bold mb-1">{form.title}</h1>
          {form.description && <p className="text-violet-200 text-sm">{form.description}</p>}
        </div>
      </div>

      {/* Progress Bar */}
      {form.sections.length > 1 && (
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-2xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span className="font-medium">Section {currentSection + 1} of {form.sections.length}</span>
              <span className="text-violet-600 font-medium">{Math.round(progress)}% complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-violet-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Section Header */}
        <div className="bg-white rounded-lg border-t-4 border-t-violet-700 border border-gray-200 shadow-sm p-5 mb-5">
          <h2 className="text-lg font-semibold text-gray-800">{section.title}</h2>
          {section.description && <p className="text-sm text-gray-500 mt-1">{section.description}</p>}
        </div>

        {/* Questions */}
        {section.questions.map(q => (
          <div key={q.id}>
            <QuestionCard
              question={q}
              sectionId={section.id}
              value={answers[q.id]}
              onChange={val => setAnswers(prev => ({ ...prev, [q.id]: val }))}
            />
            {errors[q.id] && (
              <p className="text-red-500 text-xs -mt-3 mb-4 ml-1">{errors[q.id]}</p>
            )}
          </div>
        ))}

        {section.questions.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            <p>No questions in this section.</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          {!isFirst ? (
            <button
              onClick={handleBack}
              className="border border-gray-300 text-gray-600 hover:bg-gray-50 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              ← Back
            </button>
          ) : <div />}
          {isLast ? (
            <button
              onClick={handleSubmit}
              className="bg-violet-700 hover:bg-violet-800 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-violet-700 hover:bg-violet-800 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
