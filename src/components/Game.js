import React, { Component } from "react";

import { Welcome } from "./Welcome";
import { Cards } from "./Cards";

import "./styles/Game.css";

//Game component
export class Game extends Component {
  state = {
    cards: [],
    count: 0,
    gameStarted: false,
    cardsToMatch: [],
    cardsMatched: []
  };
  
  //get game data from API endpoint, and return array of cards matching the level selected
  getGameData = (gameLevel) => {
  let level;
  const encodedURI = encodeURI("https://danielledc.github.io/match-game-app/numbers.json");

  if (typeof gameLevel === undefined) level = "easy";
  else level = gameLevel;
  
  return fetch(encodedURI)
    .then(response => {
      if (response.status === 200) {
        return Promise.resolve(response.json());
      } else {
        return Promise.reject(new Error("error"));
      }
    })
    .then(data => {
      for (var x in data.levels) {
        if (data.levels[x].difficulty === level)
          return Promise.resolve(
            data.levels[x].cards.sort((a, b) => 0.5 - Math.random())
          );
      }
    })
    .catch(error => {
      console.warn(error);
      return null;
    });
  }  
  //when two cards have been clicked call this.handleMatch to determine if match
  componentDidUpdate = () => {
    if (this.state.count === 2) {
      setTimeout(this.handleMatch, 700);
    }
  }
  //determine if both cards match. Reset count to 0, and, if cards match, add cards to this.state.cardsMatched.
  handleMatch = () => {
    const { cardsToMatch, cards } = this.state;
    let card1 = cardsToMatch[0];
    let card2 = cardsToMatch[1];

    if (cards[cardsToMatch[0]] === cards[cardsToMatch[1]]) {
      this.setState(currentState => {
        return {
          count: 0,
          cardsToMatch: [],
          cardsMatched: currentState.cardsMatched.concat(card1, card2)
        };
      });
    } else {
      this.setState(currentState => {
        return {
          count: 0,
          cardsToMatch: []
        };
      });
    }
  }
  //when card clicked,  make sure it hasn't already been clicked or matched, then add to this.cardsToMatch and increment count
  handleRevealCard = (card, index) => {
    const { cardsToMatch, cardsMatched } = this.state;
    this.setState(currentState => {
      if (cardsToMatch[0] !== index && cardsMatched.indexOf(card) === -1)
        return {
          count: currentState.count + 1,
          gameStarted: true,
          cardsToMatch: currentState.cardsToMatch.concat(index)
        };
    });
  }
  //when all cards have been matched reset state, in order to prompt to play again
  playAgain = () => {
    this.setState(currentState => {
      return {
        cards: [],
        gameStarted: false,
        cardsToMatch: [],
        cardsMatched: []
      };
    });
  }
  //get the game data and set this.state.cards to data
  getGame = (level) => {
    this.getGameData(level).then(cards => {
      this.setState({
        cards
      });
    });
  }
 
  //change UI based on state
  render() {
    const { cards, cardsMatched, gameStarted, cardsToMatch } = this.state
    const gameStart = cards.length > 0;
    const gameOver = gameStart && (cardsMatched.length === cards.length);
    const newGame = gameStart && (gameStarted === false);

    return (
      <React.Fragment>
        { !gameStart && <Welcome chooseLevel={this.getGame}/> }
        { gameStart && 
          (<Cards
            list={cards}
            cardsToMatch={cardsToMatch}
            cardsMatched={cardsMatched}
            onRevealCard={this.handleRevealCard}
           />) }
        { newGame && <div className="pre-game">Click any card to start game!</div>}
        { gameOver && 
          (<div className="pre-game">
            <a href="#/" onClick={() => {this.playAgain();}}>Play Again!</a>
           </div>)}
      </React.Fragment>
    );
  } 
}