import React from 'react';
import { ToastContainerProps } from '../types';

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemoveToast }) => {
  const getToastStyles = (type: 'info' | 'success' | 'error') => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-3 rounded-lg shadow-lg transition-all duration-300 max-w-sm ${getToastStyles(toast.type)}`}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm">{toast.message}</p>
            <button
              onClick={() => onRemoveToast(toast.id)}
              className="ml-3 text-white hover:text-gray-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;