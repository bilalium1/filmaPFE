import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { EnvelopeIcon, LockClosedIcon, UserIcon, ArrowPathIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { AuthContext } from '../context/AuthContext.jsx'
import axios from 'axios'
import MoroccanCityDropdown from '../components/CityDrop.jsx';
import GenderToggle from '../components/SexeSwitch.jsx';

export default function Auth() {

  const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    location: '',
    sexe: true
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!isLogin && !formData.username) newErrors.username = 'Username is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    if (!validate()) return;
    setIsLoading(true);
    
    try {
      const endpoint = isLogin ? 'api/auth/login' : 'api/auth/register';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;

      console.log(formData);

      const response = await axios.post(endpoint, payload);
      
      // Store the token using AuthContext's login function
      login(response.data.token);
      
      // Redirect to home page after successful auth
      navigate('/');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Authentication failed';
      setAuthError(errorMessage);
      console.error('Auth error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // ... rest of your component remains the same ...
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setAuthError('');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-stone-100">
          {isLogin ? 'Sign in to your account' : 'Create a new account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-rose-950/50 py-8 px-4 shadow-xl shadow-stone-950/50 sm:rounded-lg sm:px-10 border border-stone-700">
          {authError && (
            <div className="mb-4 bg-stone-900 border-l-4 border-rose-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <XCircleIcon className="h-5 w-5 text-rose-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-rose-100">{authError}</p>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-stone-300">
                  Username
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-stone-500" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 bg-stone-900 text-stone-100 ${errors.username ? 'border-rose-500' : 'border-stone-700'} rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 border`}
                  />
                </div>
                {errors.username && <p className="mt-2 text-sm text-rose-500">{errors.username}</p>}
                <MoroccanCityDropdown value={formData.location} onChange={(value) =>setFormData((prev) => ({ ...prev, location: value }))}/>
                <GenderToggle isMale={formData.sexe} setIsMale={(value) => setFormData((prev) => ({ ...prev, sexe: value }))} />
              </div>

            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-stone-300">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-stone-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 bg-stone-900 text-stone-100 ${errors.email ? 'border-rose-500' : 'border-stone-700'} rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 border`}
                />
              </div>
              {errors.email && <p className="mt-2 text-sm text-rose-500">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-stone-300">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-stone-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 bg-stone-900 text-stone-100 ${errors.password ? 'border-rose-500' : 'border-stone-700'} rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 border`}
                />
              </div>
              {errors.password && <p className="mt-2 text-sm text-rose-500">{errors.password}</p>}
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-stone-700 rounded bg-stone-900"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-stone-400">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-rose-500 hover:text-rose-400">
                    Forgot your password?
                  </a>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-stone-900 bg-rose-500 hover:bg-rose-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading ? (
                  <>
                    <ArrowPathIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-rose-500" />
                    Processing...
                  </>
                ) : isLogin ? 'Sign in' : 'Register'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={toggleAuthMode}
              className="font-medium text-rose-500 hover:text-rose-400 transition-colors duration-200"
            >
              {isLogin ? 'Need an account? Register' : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}