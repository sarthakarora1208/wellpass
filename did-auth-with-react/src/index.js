import React from 'react';
import ReactDOM from 'react-dom';
import { DidSessionProvider } from '@arcblock/did-connect/lib';

import './index.css';
import App from './App';

// Please change these to your own application settings
const appDid = 'zNKg4nge6pRXsx5o7T4MYB9JgvXos3xdiCUD';
const serviceHost = 'http://192.168.1.6:8090/';

// Required: Wrap the application with DidSessionProvider
const WrappedApp = () => (
  <DidSessionProvider appDid={appDid} serviceHost={serviceHost} authAPIPrefix="/api/login/agent">
    <App />
  </DidSessionProvider>
);

ReactDOM.render(<WrappedApp />, document.getElementById('root'));
