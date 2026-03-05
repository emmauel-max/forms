# Forms

A Google Forms-like form generator built with React, TypeScript, and Tailwind CSS.

## Features

- **Form Builder** — Create and edit forms with 8 question types:
  - Short answer, Paragraph, Multiple choice, Checkboxes, Dropdown, Date, Time, Linear scale
- **Sections** — Organize questions into labeled sections; respondents navigate one section at a time
- **Progress indicator** — Shows section progress while filling out multi-section forms
- **Form Viewer** — Clean respondent-facing view with required field validation
- **Responses View** — Browse all collected responses per form
- **localStorage persistence** — All data stored locally; no backend required

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for bundling
- [Tailwind CSS v3](https://tailwindcss.com/) (violet/purple palette)
- [React Router v7](https://reactrouter.com/)
- [Firebase](https://firebase.google.com/) placeholder (ready for integration)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

```bash
npm run build
```

## Firebase Setup

Edit `src/firebase.ts` and replace the placeholder values with your Firebase project configuration to enable cloud persistence.

## Routes

| Path | Description |
|------|-------------|
| `/` | Home — list of all forms |
| `/builder/:id` | Form builder (use `/builder/new` to create) |
| `/view/:id` | Fill out a form |
| `/responses/:id` | View collected responses |
| `/response/:id` | Submission confirmation |


Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
