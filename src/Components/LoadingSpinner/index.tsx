import React from 'react';

const LoadingSpinner: React.FC = () => (
    <div
        className="fixed inset-0 z-50  bg-opacity-20 backdrop-blur-xs flex items-center justify-center"
        role="status"
    >
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
    </div>
);

export default LoadingSpinner;
