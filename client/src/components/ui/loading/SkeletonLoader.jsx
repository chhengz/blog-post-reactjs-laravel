import React from "react";

// Generic skeleton box
export const SkeletonLoader = ({ className = "" }) => {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-xl ${className}`}>
      <div className="h-full w-full opacity-0">Loading...</div>
    </div>
  );
};

// Blog-style post card skeleton (Medium-like card placeholder)
export const PostCardSkeleton = () => {
  return (
    <div className="animate-pulse bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-5">
      {/* Title and date */}
      <div className="flex justify-between items-start">
        <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded-md w-20"></div>
      </div>

      {/* Author section */}
      <div className="flex items-center space-x-3">
        <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
        <div className="h-4 bg-gray-200 rounded-md w-24"></div>
      </div>

      {/* Content lines */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded-md w-full"></div>
        <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
      </div>

      {/* Footer buttons (comments, read more) */}
      <div className="flex justify-between items-center pt-3">
        <div className="h-3 bg-gray-200 rounded-md w-20"></div>
        <div className="h-3 bg-gray-200 rounded-md w-20"></div>
      </div>
    </div>
  );
};
