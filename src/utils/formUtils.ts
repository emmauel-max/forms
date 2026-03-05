import type { Form, FormResponse, Section, Question } from '../types/form';

const FORMS_KEY = 'forms_app_forms';
const RESPONSES_KEY = 'forms_app_responses';

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
}

export function getForms(): Form[] {
  try {
    const data = localStorage.getItem(FORMS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getForm(id: string): Form | null {
  const forms = getForms();
  return forms.find(f => f.id === id) || null;
}

export function saveForm(form: Form): void {
  const forms = getForms();
  const idx = forms.findIndex(f => f.id === form.id);
  if (idx >= 0) {
    forms[idx] = form;
  } else {
    forms.push(form);
  }
  localStorage.setItem(FORMS_KEY, JSON.stringify(forms));
}

export function deleteForm(id: string): void {
  const forms = getForms().filter(f => f.id !== id);
  localStorage.setItem(FORMS_KEY, JSON.stringify(forms));
}

export function getResponses(formId: string): FormResponse[] {
  try {
    const data = localStorage.getItem(RESPONSES_KEY);
    const all: FormResponse[] = data ? JSON.parse(data) : [];
    return all.filter(r => r.formId === formId);
  } catch {
    return [];
  }
}

export function saveResponse(response: FormResponse): void {
  try {
    const data = localStorage.getItem(RESPONSES_KEY);
    const all: FormResponse[] = data ? JSON.parse(data) : [];
    all.push(response);
    localStorage.setItem(RESPONSES_KEY, JSON.stringify(all));
  } catch (e) {
    console.error('Failed to save response', e);
  }
}

export function createNewForm(): Form {
  const now = new Date().toISOString();
  return {
    id: generateId(),
    title: 'Untitled Form',
    description: '',
    sections: [
      {
        id: generateId(),
        title: 'Section 1',
        description: '',
        questions: [],
      },
    ],
    createdAt: now,
    updatedAt: now,
    responseCount: 0,
  };
}

export function createNewSection(): Section {
  return {
    id: generateId(),
    title: 'New Section',
    description: '',
    questions: [],
  };
}

export function createNewQuestion(): Question {
  return {
    id: generateId(),
    type: 'short_answer',
    title: 'Question',
    required: false,
    options: ['Option 1'],
  };
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
