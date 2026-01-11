import { useState, useEffect, useContext } from 'react';
import { FaUser, FaEnvelope } from 'react-icons/fa';
import { AppContext } from '../../../../contexts/AppContext';

const ProfilePage = () => {
  const { token } = useContext(AppContext);
  const [user, setUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Replace with your actual token logic
        // const token = 'your-auth-token';
        const response = await fetch('/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();
        setUser({ name: data?.name || '', email: data?.email || '' });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">Your Profile</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            View your account information
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center">
                <FaUser className="text-gray-400 mr-3" />
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="mt-1 text-lg text-gray-900">{user.name || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-gray-400 mr-3" />
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-lg text-gray-900">{user.email || 'Not provided'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;