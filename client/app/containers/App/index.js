/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import React, { useState } from 'react';
import { Switch } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyle from '../../global-styles';
import Routes from '../../routes';
import client from '../../apollo/client';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

function App() {
  const [rehydrated, setRehydrated] = useState(false);

  React.useEffect(() => {
    client.hydrate().then(() => setRehydrated(true));
  }, []);
  if (!rehydrated) {
    return <div>Not Hydrated</div>;
  }
  return (
    <AppWrapper>
      <Switch>
        <Routes />
      </Switch>
      <GlobalStyle />
    </AppWrapper>
  );
}

export default App;
