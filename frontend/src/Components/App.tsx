import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router';
import styled from 'styled-components';

import { AppContext } from '../Contexts/AppContext';
import { Sidebar } from './Layout/Sidebar';

const sidebarWidth = '140px';

const StyledApp = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  background-color: #fbf9ef;
`;

const MainContent = styled.div`
  flex-grow: 1;
  padding: 20px;
  margin-left: ${sidebarWidth};
`;

const App = () => {
  const context = useContext(AppContext);

  if (!context) {
    return null;
  }

  const { state, setState } = context;

  return (
    <StyledApp>
      <Sidebar width={sidebarWidth} />
      <MainContent>
        <Outlet />
      </MainContent>
    </StyledApp>
  );
};

export { App };
