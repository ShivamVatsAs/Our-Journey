import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/authService';
import { motion } from 'framer-motion';
import { Heart, KeyRound } from 'lucide-react';

const LoginPage = () => {
  const { login } = useAuth();
  const [selectedUser, setSelectedUser] = useState('Shivam');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      setError('Please enter the password.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const credentials = { user: selectedUser, password };
      const data = await loginUser(credentials);
      login(data.user); // On success, update the auth context
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-rose-50 p-4">
      <motion.div
        className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-2xl shadow-rose-200"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="text-center">
          <h1 className="font-display text-5xl text-primary mb-2">Our Journey</h1>
          <p className="text-text-light">A special place for Shivam & Arya.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Selector */}
          <div>
            <label className="block text-sm font-medium text-text-main mb-2">Who are you?</label>
            <div className="flex items-center justify-center space-x-4">
              {['Shivam', 'Arya'].map((user) => (
                <button
                  key={user}
                  type="button"
                  onClick={() => setSelectedUser(user)}
                  className={`w-full py-3 px-4 rounded-lg text-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                    selectedUser === user
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-gray-100 text-text-main hover:bg-rose-100'
                  }`}
                >
                  {user}
                </button>
              ))}
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-main">
              Our Secret Password
            </label>
            <div className="mt-1 relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="********"
              />
            </div>
          </div>
          
          {/* Error Message */}
          {error && <p className="text-sm text-red-600 text-center animate-pulse">{error}</p>}

          {/* Login Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-red-300 disabled:cursor-not-allowed transition-colors duration-300"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <Heart className="h-5 w-5 text-red-300 group-hover:text-red-200" />
              </span>
              {isLoading ? 'Entering...' : 'Unlock Our World'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;