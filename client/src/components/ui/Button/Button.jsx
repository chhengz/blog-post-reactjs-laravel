import React from 'react';
import { Link } from 'react-router';

export const Button = ({ children, path}) => {
  return (
    <div>
      <Link
        to={path}
        className="
          px-5 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300
          rounded-full hover:bg-gray-100 hover:border-gray-400
          transition-colors duration-150 ease-in-out
          focus:outline-none focus:ring-2 focus:text-gray-900 focus:border-gray-900 focus:ring-opacity-50
        "
      >
        {children}
      </Link>
    </div>
  );
};

// focus:ring-green-500