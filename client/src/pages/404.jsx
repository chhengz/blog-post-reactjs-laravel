import { Link } from "react-router";

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center">
        {/* Gradient 404 Number */}
        <div className="text-9xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          404
        </div>
        
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Oops! Page Not Found
        </h1>
        
        {/* Description */}
        <p className="text-lg text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved. 
          <br />
          Don't worry, let's get you back on track.
        </p>
        
        {/* Illustration (using emoji as placeholder - replace with SVG if preferred) */}
        <div className="text-8xl mb-8" aria-hidden="true">
          🚧
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/home"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200"
          >
            Go to Homepage
          </Link>
          <Link
            to="/blog"
            className="px-6 py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-lg shadow-sm transition-colors duration-200"
          >
            Browse Blog Posts
          </Link>
        </div>
      </div>
      
      {/* Footer Note */}
      <p className="mt-8 text-sm text-gray-500">
        Still stuck? <Link to="/contact" className="text-indigo-600 hover:underline">Contact us</Link> for help.
      </p>
    </div>
  );
};