import React from 'react';
import logo from './logo.svg';
import './App.css';
import PlayerList from './components/PlayerList';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        FanDuel Sportsbook
      </header>
      <PlayerList> </PlayerList>
    </div>
  );
}

export default App;
