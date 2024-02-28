import React, { useContext, useEffect } from 'react';

import { AppContext } from '../Contexts/AppContext';

const Home = () => {
  const context = useContext(AppContext);

  useEffect(() => {
    if (context) {
      document.title = 'Home | Networking';
    }
  }, [context]);

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
