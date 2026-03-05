import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import type { Form } from '../types/form';
import { getForms, deleteForm, createNewForm, saveForm } from '../utils/formUtils';
import { formatDate } from '../utils/formUtils';

export default function Home() {
  const [forms, setForms] = useState<Form[]>(getForms);
  const navigate = useNavigate();

  const handleCreate = () => {
    const newForm = createNewForm();
    saveForm(newForm);
    navigate(`/builder/${newForm.id}`);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Delete this form?')) {
      deleteForm(id);
      setForms(getForms());
    }
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">My Forms</h1>
        <p className="text-gray-500 text-sm">Create and manage your forms</p>
      </div>

      {forms.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-lg font-medium">No forms yet</p>
            <p className="text-sm mt-1">Create your first form to get started</p>
          </div>
          <button
            onClick={handleCreate}
            className="bg-violet-700 hover:bg-violet-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Create Form
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {forms.map(form => (
            <div
              key={form.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
              onClick={() => navigate(`/builder/${form.id}`)}
            >
              <div className="h-2 bg-violet-700" />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1 truncate">{form.title}</h3>
                <p className="text-xs text-gray-500 mb-3">{formatDate(form.updatedAt)}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-3 text-xs text-gray-500">
                    <span>{form.sections.reduce((acc, s) => acc + s.questions.length, 0)} questions</span>
                    <span>{form.sections.length} sections</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={e => { e.stopPropagation(); navigate(`/view/${form.id}`); }}
                      className="text-violet-600 hover:text-violet-800 text-xs font-medium transition-colors"
                    >
                      Preview
                    </button>
                    <button
                      onClick={e => { e.stopPropagation(); navigate(`/responses/${form.id}`); }}
                      className="text-gray-500 hover:text-gray-700 text-xs font-medium transition-colors"
                    >
                      Responses
                    </button>
                    <button
                      onClick={e => handleDelete(form.id, e)}
                      className="text-gray-400 hover:text-red-500 text-xs font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div
            className="bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-violet-400 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-center min-h-32"
            onClick={handleCreate}
          >
            <div className="text-center text-gray-400 hover:text-violet-600 transition-colors">
              <span className="text-3xl block mb-1">+</span>
              <span className="text-sm font-medium">New Form</span>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
