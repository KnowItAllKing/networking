import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Contexts/AppContext';
import { API_URL } from '..';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const context = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (context && context.state.isLoggedIn) {
      navigate('/');
    }
  }, [context?.state.isLoggedIn, navigate]);

  useEffect(() => {
    if (context && context.state.isLoggedIn) {
      localStorage.setItem('state', JSON.stringify(context.state));
    }
  }, [context?.state.isLoggedIn]);

  if (!context) {
    return null;
  }

  const { state, setState } = context;

  const handleLogin = async (e: any) => {
    // e.preventDefault();
    // const res = await fetch(`${API_URL}/user/login`, {
    //   method: 'POST',
    //   body: JSON.stringify({ username, password }),
    //   headers: { 'Content-Type': 'application/json' },
    //   credentials: 'include'
    // }).then((x) => x.json());
    // if (res.error) {
    //   // display error somewhere
    // }
    // if (res.message === 'Successfully logged in') {
    //   setState({
    //     ...state,
    //     username: res.username,
    //     isLoggedIn: true
    //   });
    // }
  };

  return (
    <form
      className='max-w-md mx-auto mt-12 p-6 border border-gray-300 rounded-lg shadow-md'
      onSubmit={handleLogin}>
      <div className='mb-4'>
        <label
          htmlFor='formUsername'
          className='block text-sm font-medium text-gray-700'>
          Username
        </label>
        <input
          type='text'
          id='formUsername'
          className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          placeholder='Enter username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className='mb-6'>
        <label
          htmlFor='formPassword'
          className='block text-sm font-medium text-gray-700'>
          Password
        </label>
        <input
          type='password'
          id='formPassword'
          className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type='submit'
        className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
        Login
      </button>
    </form>
  );
};
