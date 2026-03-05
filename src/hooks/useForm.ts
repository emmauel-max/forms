import { useState, useCallback } from 'react';
import type { Form, Section, Question, QuestionType } from '../types/form';
import { generateId, saveForm } from '../utils/formUtils';

export function useForm(initialForm: Form) {
  const [form, setForm] = useState<Form>(initialForm);

  const updateForm = useCallback((updates: Partial<Form>) => {
    setForm(prev => {
      const updated = { ...prev, ...updates, updatedAt: new Date().toISOString() };
      saveForm(updated);
      return updated;
    });
  }, []);

  const addSection = useCallback(() => {
    setForm(prev => {
      const newSection: Section = {
        id: generateId(),
        title: `Section ${prev.sections.length + 1}`,
        description: '',
        questions: [],
      };
      const updated = {
        ...prev,
        sections: [...prev.sections, newSection],
        updatedAt: new Date().toISOString(),
      };
      saveForm(updated);
      return updated;
    });
  }, []);

  const updateSection = useCallback((sectionId: string, updates: Partial<Section>) => {
    setForm(prev => {
      const updated = {
        ...prev,
        sections: prev.sections.map(s => s.id === sectionId ? { ...s, ...updates } : s),
        updatedAt: new Date().toISOString(),
      };
      saveForm(updated);
      return updated;
    });
  }, []);

  const deleteSection = useCallback((sectionId: string) => {
    setForm(prev => {
      const updated = {
        ...prev,
        sections: prev.sections.filter(s => s.id !== sectionId),
        updatedAt: new Date().toISOString(),
      };
      saveForm(updated);
      return updated;
    });
  }, []);

  const addQuestion = useCallback((sectionId: string) => {
    setForm(prev => {
      const newQuestion: Question = {
        id: generateId(),
        type: 'short_answer',
        title: 'Question',
        required: false,
        options: ['Option 1'],
      };
      const updated = {
        ...prev,
        sections: prev.sections.map(s =>
          s.id === sectionId
            ? { ...s, questions: [...s.questions, newQuestion] }
            : s
        ),
        updatedAt: new Date().toISOString(),
      };
      saveForm(updated);
      return updated;
    });
  }, []);

  const updateQuestion = useCallback((sectionId: string, questionId: string, updates: Partial<Question>) => {
    setForm(prev => {
      const updated = {
        ...prev,
        sections: prev.sections.map(s =>
          s.id === sectionId
            ? {
                ...s,
                questions: s.questions.map(q =>
                  q.id === questionId ? { ...q, ...updates } : q
                ),
              }
            : s
        ),
        updatedAt: new Date().toISOString(),
      };
      saveForm(updated);
      return updated;
    });
  }, []);

  const deleteQuestion = useCallback((sectionId: string, questionId: string) => {
    setForm(prev => {
      const updated = {
        ...prev,
        sections: prev.sections.map(s =>
          s.id === sectionId
            ? { ...s, questions: s.questions.filter(q => q.id !== questionId) }
            : s
        ),
        updatedAt: new Date().toISOString(),
      };
      saveForm(updated);
      return updated;
    });
  }, []);

  const changeQuestionType = useCallback((sectionId: string, questionId: string, type: QuestionType) => {
    setForm(prev => {
      const updated = {
        ...prev,
        sections: prev.sections.map(s =>
          s.id === sectionId
            ? {
                ...s,
                questions: s.questions.map(q =>
                  q.id === questionId
                    ? {
                        ...q,
                        type,
                        options: ['multiple_choice', 'checkboxes', 'dropdown'].includes(type)
                          ? (q.options && q.options.length > 0 ? q.options : ['Option 1'])
                          : q.options,
                        scaleMin: type === 'linear_scale' ? (q.scaleMin ?? 1) : q.scaleMin,
                        scaleMax: type === 'linear_scale' ? (q.scaleMax ?? 5) : q.scaleMax,
                      }
                    : q
                ),
              }
            : s
        ),
        updatedAt: new Date().toISOString(),
      };
      saveForm(updated);
      return updated;
    });
  }, []);

  return {
    form,
    updateForm,
    addSection,
    updateSection,
    deleteSection,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    changeQuestionType,
  };
}
