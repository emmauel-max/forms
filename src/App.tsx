import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FormBuilder from './pages/FormBuilder';
import FormViewer from './pages/FormViewer';
import FormResponse from './pages/FormResponse';
import FormResponses from './pages/FormResponses';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder/:id" element={<FormBuilder />} />
        <Route path="/view/:id" element={<FormViewer />} />
        <Route path="/response/:id" element={<FormResponse />} />
        <Route path="/responses/:id" element={<FormResponses />} />
      </Routes>
    </BrowserRouter>
  );
}
