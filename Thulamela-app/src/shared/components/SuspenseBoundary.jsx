import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

export function SuspenseBoundary({ children }) {
  return (
    <React.Suspense fallback={<LoadingSpinner />}>
      {children}
    </React.Suspense>
  );
}

export default SuspenseBoundary;