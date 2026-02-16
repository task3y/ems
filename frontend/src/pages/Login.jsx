import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../context/authContext'; 
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login', 
        { email, password });
        if (response.data.success) {
          login(response.data.user);
          localStorage.setItem('token', response.data.token);
          if (response.data.user.role === 'admin') {
            navigate('/admin-dashboard');
          } else {
              navigate('/employee-dashboard');
          }
          alert('Login successful!');
      }
    }
    catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError('Server error!! Please try again later.');
    }
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-300 to-white">

        <div className="w-full max-w-md px-5">
        <h2 className="text-4xl font-bold text-center text-black mb-10">Employee Management System</h2>

        <form onSubmit={handleSubmit}>
        <div className="w-[380px] backdrop-blur-xl bg-white/60 shadow-2xl rounded-3xl p-8 border border-white/40">
            <h2 className="text-2xl font-semibold text-center mb-2">Login</h2>

            {/* error display if login fails */}
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

              <div className="mb-6 relative">
                <label htmlFor="email" className='block text-gray-700 mb-2'>Email</label>
                    <div className="relative">
                       <input type="email" placeholder='Enter your email'
                        value={email} onChange={(e) => setEmail(e.target.value)} 
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-400" 
                       />
                       <span className="material-symbols-rounded absolute left-3 top-3.5 text-gray-400">mail</span>
                    </div>
              </div>
            <div className="mb-6 relative">
            <label htmlFor="password" className='block text-gray-700 mb-2'>Password</label>
                <div className="relative mb-6">
                  <input type="password" placeholder='Enter your password'
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                     <span className="material-symbols-rounded absolute left-3 top-3.5 text-gray-400">lock</span>
                     <span className="material-symbols-rounded absolute right-3 top-3.5 text-gray-400">visibility_off</span>
                  
                </div>
            </div>
            <button type='submit' className="w-full py-3 rounded-xl bg-gradient-to-r from-gray-800 to-black text-white font-medium shadow-lg hover:opacity-90 transition duration-200">Login</button>
        </div>
        </form>
        </div>
    </div>
  )
}

export default Login;