import React from 'react';

import { AppContext } from '../../Contexts/AppContext';

const Jumbotron = ({
  children,
  title
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className='p-5 mb-4 bg-gray-100 rounded-lg'>
      <h1 className='text-3xl font-semibold'>{title}</h1>
      <div className='mx-auto'>
        <div>{children}</div>
      </div>
    </div>
  );
};

export { Jumbotron };
