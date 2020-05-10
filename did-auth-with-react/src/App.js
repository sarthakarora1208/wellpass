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
        <div class="navbar-fixed">
            <nav class="none">
                <div class="container">

                    <div class="nav-wrapper">

                        <a href="#" class="brand-logo">
                            Well<span style="color: #8EE4AF">Pass</span></a>
                        <a href="#" class="sidenav-trigger" data-target="mobile-nav">
                            <i class="material-icons">menu</i>
                        </a>

                        <ul class="right hide-on-med-and-down ">
                            <li><a href="#">Logged in as {session.user.name}
                                </a></li>
                            <li><a href="/auth/logout">Logout</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>

        <ul class="sidenav" id="mobile-nav">
            <li>
                <a style="color:white;" href="#">
                    Logged in as {session.user.name}
                </a>
            </li>
            <li><a style="color:white;" href="/auth/logout">Logout</a></li>
        </ul>
        {sessionMarkup}
      </header>
    </div>
  );
}

export default App;
