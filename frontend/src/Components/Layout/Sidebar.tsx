import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../Contexts/AppContext';

import { API_URL } from '../..';

export const Sidebar = ({ width }: { width: string }) => {
  const context = useContext(AppContext);
  const [networkName, setNetworkName] = useState('New Network');

  if (!context) {
    return null;
  }

  const { state, setState } = context;

  const addNetwork = async () => {
    try {
      const newNetwork = await fetch(`${API_URL}/network`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: networkName, company: '' })
      })
        .then((x) => x.json())
        .catch((e) => console.error(e));
      setState({ ...state, networks: [...state.networks, newNetwork] });
      setNetworkName('');
    } catch (e) {
      console.error(e);
    }
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
        {state.networks &&
          state.networks.map((network) => (
            <li key={network.id} className='p-4'>
              <Link to={`/${network.id}/`}>{network.name}</Link>
            </li>
          ))}
      </ul>
      <div className='absolute bottom-0 w-full p-4 space-y-2'>
        <input
          className='text-sm p-1 w-full border rounded'
          placeholder='Add new network'
          value={networkName}
          onChange={(e) => setNetworkName(e.target.value)}
        />
        <button
          className='w-full py-2 bg-red-500 rounded hover:bg-red-600'
          onClick={async () => {
            await addNetwork();
            setNetworkName('New Network');
          }}>
          +
        </button>
      </div>
    </div>
  );
};
