import React from 'react';

export const NotFound = () => {
  return (
    <div className='container mx-auto px-4'>
      <div className='flex justify-center'>
        <div className='md:w-1/2'>
          <div className='text-center mt-5 border border-gray-200 rounded-lg shadow-lg'>
            <div className='text-lg font-semibold p-5 border-b border-gray-200'>
              Page Not Found
            </div>
            <div className='p-5'>
              <p className='text-base'>
                Error 404: The page you are looking for does not exist.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
