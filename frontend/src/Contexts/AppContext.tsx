import React, { createContext, useState, ReactNode } from 'react';

export const AppContext = createContext<AppContextType | null>(null);

export const defaultState: AppState = {
  networks: [
    {
      name: 'John Smith',
      id: 1,
      company: 'Company',
      created_at: Date.now(),
      updated_at: Date.now(),
      entries: [
        {
          id: 1,
          name: 'John Smith',
          title: 'First Meeting with John',
          body: 'Talked about x, y, and z. He seemed interested in a, b, and c. We agreed to meet again next week.',
          created_at: Date.now(),
          updated_at: Date.now()
        }
      ]
    }
  ]
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  // Define the default state

  const [state, setState] = useState<AppState>(() => {
    const storedState = localStorage.getItem('state');
    return storedState ? JSON.parse(storedState) : defaultState;
  });

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

export interface AppState {
  networks: Network[];
}

export interface Network {
  name: string;
  id: number;
  company: string;
  created_at: number;
  updated_at: number;
  entries?: Entry[];
}

export interface Entry {
  id: number;
  name: string;
  title: string;
  body: string;
  created_at: number;
  updated_at: number;
}

// Define the shape of your context
interface AppContextType {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}
