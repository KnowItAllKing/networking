import React, { useContext, useEffect } from 'react';

import { AppContext, Entry, Network } from '../Contexts/AppContext';
import { API_URL } from '..';

const Home = () => {
  const context = useContext(AppContext);

  useEffect(() => {
    document.title = 'Home | Networking';
  }, [context]);

  useEffect(() => {
    const getData = async () => {
      try {
        const networks: Network[] = await fetch(`${API_URL}/network`).then(
          (x) => x.json()
        );
        const entries: Entry[] = await fetch(`${API_URL}/entries`).then((x) =>
          x.json()
        );
        for (const entry of entries) {
          const network = networks.find((n) => n.name === entry.name);
          if (network) {
            if (network.entries) {
              network.entries.push(entry);
            } else {
              network.entries = [entry];
            }
          }
        }
        context?.setState({ ...context.state, networks });
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, []);

  if (!context) {
    return null;
  }

  return (
    <div className='container mx-auto px-4'>
      <p>Home</p>
    </div>
  );
};

export { Home };
