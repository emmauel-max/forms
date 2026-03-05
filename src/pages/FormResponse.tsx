import { useParams, useNavigate } from 'react-router-dom';

export default function FormResponse() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg border-t-4 border-t-violet-700 border border-gray-200 shadow-sm p-10 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-violet-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Response Submitted!</h2>
        <p className="text-gray-500 text-sm mb-6">Thank you for completing the form. Your response has been recorded.</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate('/')}
            className="bg-violet-700 hover:bg-violet-800 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Go Home
          </button>
          {id && (
            <button
              onClick={() => navigate(`/view/${id}`)}
              className="border border-gray-300 text-gray-600 hover:bg-gray-50 px-5 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Fill Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
