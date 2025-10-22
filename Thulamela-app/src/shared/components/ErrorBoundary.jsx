import React from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import Icon from './Icon';

function ErrorFallback({ error }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
          <Icon name="ExclamationTriangle" className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="mb-4 text-2xl font-bold text-center text-gray-900">
          {error.status === 404 ? 'Page Not Found' : 'Something went wrong'}
        </h1>
        <p className="mb-4 text-center text-gray-600">
          {error.message || error.statusText || 'An unexpected error has occurred'}
        </p>
        <div className="text-center">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <ErrorFallback error={error} />;
  }

  return <ErrorFallback error={{ message: 'Something went wrong' }} />;
}

export default ErrorBoundary;