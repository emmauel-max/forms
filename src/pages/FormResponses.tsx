import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { getForm, getResponses } from '../utils/formUtils';
import type { Form, FormResponse } from '../types/form';

export default function FormResponses() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = useState<Form | null>(() => (id ? getForm(id) : null));
  const [responses] = useState<FormResponse[]>(() => (id ? getResponses(id) : []));

  useEffect(() => {
    if (!form) navigate('/');
  }, [form, navigate]);

  if (!form) return <Layout><div className="text-gray-500 text-center py-20">Loading...</div></Layout>;

  const allQuestions = form.sections.flatMap(s => s.questions);

  return (
    <Layout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">{form.title}</h1>
          <p className="text-gray-500 text-sm">{responses.length} response{responses.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/view/${form.id}`)}
            className="border border-violet-600 text-violet-600 hover:bg-violet-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Preview Form
          </button>
          <button
            onClick={() => navigate(`/builder/${form.id}`)}
            className="bg-violet-700 hover:bg-violet-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Edit Form
          </button>
        </div>
      </div>

      {responses.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center">
          <p className="text-gray-400 text-lg font-medium">No responses yet</p>
          <p className="text-gray-400 text-sm mt-1">Share the form link to start collecting responses</p>
          <button
            onClick={() => navigate(`/view/${form.id}`)}
            className="mt-4 bg-violet-700 hover:bg-violet-800 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Open Form
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {responses.map((response, idx) => (
            <div key={response.id} className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-gray-700">Response #{idx + 1}</span>
                <span className="text-xs text-gray-400">
                  {new Date(response.submittedAt).toLocaleString()}
                </span>
              </div>
              <div className="space-y-3">
                {allQuestions.map(q => {
                  const ans = response.answers[q.id];
                  if (!ans) return null;
                  return (
                    <div key={q.id} className="border-b border-gray-100 pb-3 last:border-0">
                      <p className="text-xs font-medium text-gray-500 mb-0.5">{q.title}</p>
                      <p className="text-sm text-gray-800">
                        {Array.isArray(ans) ? ans.join(', ') : ans}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
