import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext, defaultState } from '../../Contexts/AppContext';

export const Main = () => {
  const context = useContext(AppContext);
  const { network, entry } = useParams();
  const [networkName, setNetworkName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [entryTitle, setEntryTitle] = useState('');
  const [entryBody, setEntryBody] = useState('');

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
          const entryContent = networkContent.entries.find(
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

  if (!context) {
    return null;
  }

  const { state, setState } = context;

  if (!network) return null;

  const networkId = parseInt(network);
  const networkContent = state.networks.find((n) => n.id === networkId);

  if (!networkContent) return <div>Network not found</div>;

  const handleEntryTitleChange = (e: any) => {
    setEntryTitle(e.target.value);
  };
  const handleEntryBodyChange = (e: any) => {
    setEntryBody(e.target.value);
  };

  const updateContextState = () => {};

  // useEffect(() => {
  //   updateContextState();
  // }, [entryTitle]);

  if (entry) {
    const entryId = parseInt(entry);
    const entryContent = networkContent.entries.find((e) => e.id === entryId);

    if (!entryContent) return <div>Entry not found</div>;

    return (
      <div className='container mx-auto px-4'>
        <h1 className='text-xl font-bold'>
          {networkContent.name} -{' '}
          {new Date(entryContent.updated_at).toLocaleDateString()}
        </h1>
        <h2 className='text-lg'>{networkContent.company}</h2>
        <input
          className='mt-2 p-2 border rounded'
          value={entryTitle}
          onChange={handleEntryTitleChange}
        />
        <textarea
          className='mt-2 p-2 border rounded w-full h-64'
          onChange={handleEntryBodyChange}
        />
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4'>
      <input
        className='text-xl font-bold p-2 border rounded'
        value={networkName}
        onChange={(e) => setNetworkName(e.target.value)}
      />
      <input
        className='text-lg p-2 border rounded'
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      {networkContent.entries.map((entry) => (
        <ul key={entry.id}>
          <Link
            to={`/${network}/${entry.id}`}
            className='text-blue-500 hover:text-blue-700'>
            {entry.title}
          </Link>
        </ul>
      ))}
    </div>
  );
};
