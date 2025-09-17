import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, verifyOtp, loginUser } from '../services/api';
import { saveTokenToDB } from '../services/db';

// A simple Google Icon component
const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path>
    <path fill="#1976D2" d="M43.611 20.083H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 35.244 44 30.028 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
  </svg>
);

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    otp: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setError('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await registerUser(formData.name, formData.email, formData.password);
      setShowOtp(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await verifyOtp(formData.email, formData.otp);
      const token = response.data.token;
      localStorage.setItem('authToken', token);
      await saveTokenToDB(token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await loginUser(formData.email, formData.password);
      const token = response.data.token;
      localStorage.setItem('authToken', token);
      await saveTokenToDB(token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials.');
    }
  };
  
  const handleGoogleLogin = () => {
    // This will redirect the user to the backend's Google OAuth2 endpoint
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  const renderRegisterForm = () => (
    <form onSubmit={showOtp ? handleVerifyOtp : handleRegister}>
      {!showOtp ? (
        <>
          <input name="name" type="text" placeholder="Full Name" onChange={handleChange} required className="w-full p-3 border rounded mb-4" />
          <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required className="w-full p-3 border rounded mb-4" />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="w-full p-3 border rounded mb-4" />
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700">
            Register
          </button>
        </>
      ) : (
        <>
          <p className="text-center mb-4">An OTP has been sent to {formData.email}.</p>
          <input name="otp" type="text" placeholder="Enter 6-digit OTP" onChange={handleChange} required className="w-full p-3 border rounded mb-4" />
          <button type="submit" className="w-full bg-green-600 text-white p-3 rounded font-bold hover:bg-green-700">
            Verify OTP
          </button>
        </>
      )}
    </form>
  );

  const renderLoginForm = () => (
    <form onSubmit={handleLogin}>
      <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required className="w-full p-3 border rounded mb-4" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="w-full p-3 border rounded mb-4" />
      <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700">
        Login
      </button>
    </form>
  );

  return (
    <div className="max-w-md mx-auto mt-8 p-8 border rounded-lg shadow-lg bg-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">{isLogin ? 'Welcome Back!' : 'Create an Account'}</h2>
      
      {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">{error}</p>}

      {isLogin ? renderLoginForm() : renderRegisterForm()}
      
      <div className="text-center mt-4">
        <button onClick={() => { setIsLogin(!isLogin); setShowOtp(false); setError(''); }} className="text-blue-600 hover:underline">
          {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
        </button>
      </div>

      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-400">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      
      <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center p-3 border rounded font-semibold hover:bg-gray-50">
        <GoogleIcon /> Continue with Google
      </button>
    </div>
  );
}