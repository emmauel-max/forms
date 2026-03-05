import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { getForm, createNewForm, saveForm } from '../utils/formUtils';
import type { Form } from '../types/form';
import SectionCard from '../components/SectionCard';
import Header from '../components/Header';

export default function FormBuilder() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialForm] = useState<Form | null>(() => {
    if (!id || id === 'new') return null;
    return getForm(id);
  });

  useEffect(() => {
    if (id === 'new') {
      const f = createNewForm();
      saveForm(f);
      navigate(`/builder/${f.id}`, { replace: true });
    } else if (id && !initialForm) {
      navigate('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!initialForm) return <div className="min-h-screen bg-gray-100 flex items-center justify-center text-gray-500">Loading...</div>;

  return <FormBuilderInner initialForm={initialForm} />;
}

function FormBuilderInner({ initialForm }: { initialForm: Form }) {
  const navigate = useNavigate();
  const {
    form,
    updateForm,
    addSection,
    updateSection,
    deleteSection,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    changeQuestionType,
  } = useForm(initialForm);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Form Header Card */}
        <div className="bg-white rounded-lg border-t-4 border-t-violet-700 border border-gray-200 shadow-sm p-6 mb-6">
          <input
            type="text"
            value={form.title}
            onChange={e => updateForm({ title: e.target.value })}
            placeholder="Form title"
            className="w-full text-2xl font-bold border-b border-gray-300 focus:border-violet-600 outline-none py-1 mb-3"
          />
          <input
            type="text"
            value={form.description || ''}
            onChange={e => updateForm({ description: e.target.value })}
            placeholder="Form description (optional)"
            className="w-full text-sm text-gray-600 border-b border-gray-200 focus:border-violet-600 outline-none py-1"
          />
        </div>

        {/* Sections */}
        {form.sections.map(section => (
          <SectionCard
            key={section.id}
            section={section}
            onUpdate={updates => updateSection(section.id, updates)}
            onDelete={() => deleteSection(section.id)}
            onAddQuestion={() => addQuestion(section.id)}
            onUpdateQuestion={(qId, updates) => updateQuestion(section.id, qId, updates)}
            onDeleteQuestion={qId => deleteQuestion(section.id, qId)}
            onChangeQuestionType={(qId, type) => changeQuestionType(section.id, qId, type)}
            canDelete={form.sections.length > 1}
          />
        ))}

        {/* Actions */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={addSection}
            className="border border-violet-600 text-violet-600 hover:bg-violet-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            + Add Section
          </button>
          <button
            onClick={() => navigate(`/view/${form.id}`)}
            className="border border-gray-300 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Preview Form
          </button>
          <button
            onClick={() => navigate(`/responses/${form.id}`)}
            className="border border-gray-300 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            View Responses
          </button>
          <button
            onClick={() => navigate('/')}
            className="ml-auto bg-violet-700 hover:bg-violet-800 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
