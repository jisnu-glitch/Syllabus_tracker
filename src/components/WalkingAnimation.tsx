import React from 'react';

interface WalkingAnimationProps {
  type: 'student' | 'faculty';
}

const WalkingAnimation: React.FC<WalkingAnimationProps> = ({ type }) => {
  return (
    <div className="relative w-full h-64 overflow-hidden">
      <div className="absolute bottom-16 w-full h-2 bg-gray-300"></div>
      <div className={`walking-animation ${type}`}>
        <div className="character">
          {type === 'student' ? (
            <svg viewBox="0 0 100 120" className="w-16 h-20">
              {/* Student with backpack */}
              <circle cx="50" cy="20" r="12" fill="#fbbf24" />
              <rect x="42" y="32" width="16" height="24" fill="#3b82f6" rx="3" />
              <rect x="36" y="28" width="28" height="8" fill="#ef4444" rx="4" />
              <rect x="45" y="56" width="4" height="20" fill="#1f2937" />
              <rect x="51" y="56" width="4" height="20" fill="#1f2937" />
              <rect x="42" y="74" width="8" height="4" fill="#000" />
              <rect x="50" y="74" width="8" height="4" fill="#000" />
              <rect x="35" y="30" width="8" height="20" fill="#8b5cf6" />
            </svg>
          ) : (
            <svg viewBox="0 0 100 120" className="w-16 h-20">
              {/* Faculty figure */}
              <circle cx="50" cy="20" r="12" fill="#fbbf24" />
              <rect x="42" y="32" width="16" height="24" fill="#374151" rx="3" />
              <rect x="45" y="56" width="4" height="20" fill="#1f2937" />
              <rect x="51" y="56" width="4" height="20" fill="#1f2937" />
              <rect x="42" y="74" width="8" height="4" fill="#000" />
              <rect x="50" y="74" width="8" height="4" fill="#000" />
              <rect x="30" y="35" width="12" height="3" fill="#8b5cf6" />
            </svg>
          )}
        </div>
      </div>
      <div className="text-center mt-8">
        <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-lg">
          <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          <span className="text-lg font-semibold text-gray-700">Logging in...</span>
        </div>
      </div>
    </div>
  );
};

export default WalkingAnimation;