import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, redirect, useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { AppContext, defaultState } from '../../Contexts/AppContext';
import { API_URL } from '../..';

export const Main = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const { network, entry } = useParams();
  const [networkName, setNetworkName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [entryTitle, setEntryTitle] = useState('');
  const [entryBody, setEntryBody] = useState('');
  const [newEntry, setNewEntry] = useState('');

  const debounceUpdate = debounce(() => {
    fetch(`${API_URL}/network/${networkId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: networkName, company: companyName })
    });

    fetch(`${API_URL}/entries/${entry}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: entryTitle,
        body: entryBody,
        name: networkName
      })
    });
  }, 100);

  useEffect(() => {
    document.title = 'Home | Networking';
    if (context && network) {
      const { networks } = context.state;
      const networkId = parseInt(network);
      const networkContent = networks.find((n) => n.id === networkId);

      if (networkContent) {
        setNetworkName(networkContent.name);
        setCompanyName(networkContent.company);

        if (entry) {
          const entryId = parseInt(entry);
          const entryContent = networkContent.entries?.find(
            (e) => e.id === entryId
          );
          if (entryContent) {
            setEntryTitle(entryContent.title);
            setEntryBody(entryContent.body);
          }
        }
      }
    }
  }, [context, network, entry]);

  useEffect(() => {
    debounceUpdate();
  }, [networkName, companyName, entryTitle, entryBody]);

  if (!context) {
    return null;
  }

  const { state, setState } = context;

  if (!network) return null;

  const networkId = parseInt(network);
  const networkContent = state.networks.find((n) => n.id === networkId);

  if (!networkContent) return <div>Network not found</div>;

  const addEntry = async () => {
    const res = await fetch(`${API_URL}/entries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: networkName,
        title: newEntry,
        body: ''
      })
    }).then((x) => x.json());

    const networks = state.networks.map((n) => {
      if (n.id === networkId) {
        if (n.entries) {
          n.entries.push(res);
        } else {
          n.entries = [res];
        }
      }
      return n;
    });
    setState({ ...state, networks });
  };

  const deleteNetwork = async () => {
    const res = await fetch(`${API_URL}/network/${networkId}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      const networks = state.networks.filter((n) => n.id !== networkId);
      setState({ ...state, networks });
      navigate('/');
    }
  };

  if (entry) {
    const entryId = parseInt(entry);
    const entryContent = networkContent.entries?.find((e) => e.id === entryId);

    if (!entryContent) return <div>Entry not found</div>;

    const deleteEntry = async () => {
      const res = await fetch(`${API_URL}/entries/${entryId}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        const networks = state.networks.map((n) => {
          if (n.id === networkId) {
            if (n.entries) {
              n.entries = n.entries.filter((e) => e.id !== parseInt(entry));
            }
          }
          return n;
        });
        setState({ ...state, networks });
        navigate(`/${networkId}`);
      }
    };

    return (
      <div className='container mx-auto px-4'>
        <h1 className='text-2xl font-bold mb-4'>
          {networkContent.name} -{' '}
          {new Date(entryContent.updated_at).toLocaleDateString()}
        </h1>
        <h2 className='text-lg mb-4'>{networkContent.company}</h2>
        <input
          className='mt-4 p-2 border border-gray-300 rounded w-full'
          placeholder='Entry title'
          value={entryTitle}
          onChange={(e) => {
            setEntryTitle(e.target.value);
          }}
        />
        <textarea
          className='mt-4 p-2 border border-gray-300 rounded w-full h-64'
          placeholder='Entry body'
          value={entryBody}
          onChange={(e) => {
            setEntryBody(e.target.value);
          }}
        />
        <button
          className='mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
          onClick={() => deleteEntry()}>
          Delete Entry
        </button>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4'>
      <div className='flex gap-4 mb-4'>
        <input
          className='flex-1 p-2 border border-gray-300 rounded'
          placeholder='Network name'
          value={networkName}
          onChange={(e) => {
            setNetworkName(e.target.value);
          }}
        />
        <input
          className='flex-1 p-2 border border-gray-300 rounded'
          placeholder='Company name'
          value={companyName}
          onChange={(e) => {
            setCompanyName(e.target.value);
          }}
        />
      </div>
      {networkContent.entries?.map((entry) => (
        <div key={entry.id} className='mb-2'>
          <Link
            to={`/${network}/${entry.id}`}
            className='text-blue-500 hover:text-blue-700 text-lg'>
            {entry.title} - {new Date(entry.updated_at).toLocaleDateString()}
          </Link>
        </div>
      ))}
      <div className='mt-4 flex gap-4'>
        <input
          className='flex-grow p-2 border border-gray-300 rounded'
          placeholder='New entry title'
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
        />
        <button
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          onClick={() => addEntry()}>
          Add Entry
        </button>
      </div>
      <button
        className='mt-4 px-4 py-2 bg-red-500 border rounded hover:bg-red-700'
        onClick={deleteNetwork}>
        Delete Network
      </button>
    </div>
  );
};
