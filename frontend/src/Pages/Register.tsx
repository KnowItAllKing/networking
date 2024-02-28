import React, { useState, useContext } from 'react';
import { AppContext } from '../Contexts/AppContext';
import { API_URL } from '..';

export const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const context = useContext(AppContext);
  const usernameRegex = /^[A-Za-z\d]{1,12}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,25}$/;

  const validateInput = () => {
    if (!usernameRegex.test(username)) {
      setErrorMessage(
        'Invalid username. Should be alphanumeric and 1-12 characters long.'
      );
      return false;
    }
    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid email format.');
      return false;
    }
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        'Invalid password. Should be 8-25 characters long with at least one letter and one number.'
      );
      return false;
    }
    return true;
  };

  const handleRegister = async (e: any) => {
    // e.preventDefault();
    // if (!validateInput()) return;
    // try {
    //   const response = await fetch(`${API_URL}/user/register`, {
    //     method: 'POST',
    //     body: JSON.stringify({ username, email, password }),
    //     headers: { 'Content-Type': 'application/json' }
    //   });
    //   const data = await response.json();
    //   if (data.error) {
    //     setErrorMessage(data.error);
    //     setSuccessMessage('');
    //   } else {
    //     setSuccessMessage('Successfully registered. You can now login.');
    //     setErrorMessage('');
    //     setUsername('');
    //     setEmail('');
    //     setPassword('');
    //   }
    // } catch (error) {
    //   setErrorMessage('Registration failed. Please try again.');
    //   setSuccessMessage('');
    // }
  };

  return (
    <form
      className='max-w-md mx-auto mt-12 p-6 border border-gray-300 rounded-lg shadow-md'
      onSubmit={handleRegister}>
      <div className='mb-4'>
        <label
          htmlFor='formUsername'
          className='block text-sm font-medium text-gray-700'>
          Username
        </label>
        <input
          type='text'
          id='formUsername'
          className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
          placeholder='Enter username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='formEmail'
          className='block text-sm font-medium text-gray-700'>
          Email
        </label>
        <input
          type='email'
          id='formEmail'
          className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
          placeholder='Enter email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {errorMessage && (
        <div className='text-red-500 text-sm'>{errorMessage}</div>
      )}
      {successMessage && (
        <div className='text-green-500 text-sm'>{successMessage}</div>
      )}

      <button
        type='submit'
        className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
        Register
      </button>
    </form>
  );
};
