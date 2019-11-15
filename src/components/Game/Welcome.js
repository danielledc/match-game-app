import React from 'react';

//welcome message to start new game
export const Welcome = (props) => (
  <div className="welcome">
    <h1 className="header">Welcome to the Match Game</h1>
    <div className="placeholder">Choose your level</div>
    <ul>
      <li>
        <a href="#" id="easy" onClick={() => props.chooseLevel("easy")}>
          Easy
        </a>
      </li>
      <li>
        <a href="#" id="hard" onClick={() => props.chooseLevel("hard")}>
          Difficult
        </a>
      </li>
    </ul>
  </div>
);