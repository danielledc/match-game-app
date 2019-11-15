import React from 'react';

//memory game grid of cards.  Card is shown or hidden based on whether card has been clicked, which changes the classname
export const Cards = (props) => (
  <div>
    <ul className="grid-container">
      {props.list.map((card, index) => (
        <li
          key={index}
          className={
              props.cardsToMatch.indexOf(index) !== -1 ||
              props.cardsMatched.indexOf(index) !== -1
                ? "grid-item-show"
                : "grid-item-hide"
            }
          onClick={() => props.onRevealCard(card, index)}
        >
          <span className={
            props.cardsToMatch.indexOf(index) !== -1 ||
            props.cardsMatched.indexOf(index) !== -1 ? "show-card" : "hide-card"
            }
          >
            {card}
          </span>
        </li>
      ))}
    </ul>
  </div>  
);