import React, { useContext } from 'react';

import { DidSessionContext } from '@arcblock/did-connect/lib';

import logo from './logo.svg';
import './App.css';

function App() {
  // Now we can consume the session info here
  const { session } = useContext(DidSessionContext);

  let sessionMarkup = null;
  if (session.loading) {
    sessionMarkup = <p>Initialize session...</p>;
  } else {
    if (session.user) {
      sessionMarkup = (
        <p>
          You are logged in as <strong>{session.user.name}</strong>, click{' '}
          <a onClick={() => session.logout()} href="javascript:void(0);" className="App-link">
            here
          </a>{' '}
          to logout
        </p>
      );
    } else {
      sessionMarkup = (
        <p>
          Welcome to wellpass click
          <a onClick={() => session.login()} href="javascript:void(0);" className="App-link">
            here
          </a>{' '}
          to login
        </p>
      );
    }
  }

  return (
    <div className="App">
      <header id="showcase">
        {sessionMarkup}
      </header>
    </div>
  );
}

export default App;
