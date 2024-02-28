import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../Contexts/AppContext';

import { API_URL } from '../..';

export const Sidebar = ({ width }: { width: string }) => {
  const context = useContext(AppContext);

  if (!context) {
    return null;
  }

  const { state, setState } = context;

  const logOut = async () => {
    // try {
    //   await fetch(`${API_URL}/user/logout`, {
    //     credentials: 'include'
    //   }).then((x) => x.json());
    //   setState({
    //     username: undefined,
    //     isLoggedIn: false
    //   });
    //   localStorage.setItem('state', JSON.stringify(state));
    // } catch (e) {
    //   console.error('Logout failed', e);
    // }
  };

  return (
    <div
      className='w-50 h-full shadow-md bg-white fixed'
      style={{ zIndex: 1, width }}>
      <div className='text-xl font-semibold p-4 flex items-center'>
        <img src={''} className='h-8 w-8 mr-2' />
        <br />
      </div>
      <div
        className='text-xl font-semibold p-4 flex items-center'
        style={{ fontSize: '18px' }}>
        <Link to='/'>Networking</Link>
      </div>

      <ul className='list-none'>
        <li className='p-4'>People</li>
        {state.networks &&
          state.networks.map((network) => (
            <li key={network.name} className='p-4'>
              <Link to={`/${network.id}/`}>{network.name}</Link>
            </li>
          ))}
      </ul>
      <div className='absolute bottom-0 w-full'>
        {state.isLoggedIn ? (
          <div className='flex flex-col items-center p-4'>
            <span>Welcome, {state.username}</span>
            <button
              className='py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700'
              onClick={logOut}>
              Logout
            </button>
          </div>
        ) : (
          <div className='flex flex-col items-center p-4'>
            <Link
              to='/login'
              className='py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mb-2'>
              Login
            </Link>
            <Link
              to='/register'
              className='py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700'>
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
