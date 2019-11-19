import React from 'react';

//welcome message to start new game
export const Welcome = ({ chooseLevel }) => (
  <div className="welcome">
    <h1 className="header">Welcome to the Match Game</h1>
    <div className="placeholder">Choose your level</div>
    <ul>
      <li>
        <a href="#/" id="easy" onClick={() => chooseLevel("easy")}>
          Easy
        </a>
      </li>
      <li>
        <a href="#/" id="hard" onClick={() => chooseLevel("hard")}>
          Difficult
        </a>
      </li>
    </ul>
  </div>
);