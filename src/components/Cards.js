import React from 'react';

//memory game grid of cards.  Card is shown or hidden based on whether card has been clicked, which changes the classname
export const Cards = ({ list, cardsToMatch, cardsMatched, onRevealCard }) => (
  <div>
    <ul className="grid-container">
      {list.map((card, index) => (
        <li
          key={index}
          className={
              cardsToMatch.indexOf(index) !== -1 ||
              cardsMatched.indexOf(index) !== -1
                ? "grid-item-show"
                : "grid-item-hide"
            }
          onClick={() => onRevealCard(card, index)}
        >
          <span className={
            cardsToMatch.indexOf(index) !== -1 ||
            cardsMatched.indexOf(index) !== -1 ? "show-card" : "hide-card"
            }
          >
            {card}
          </span>
        </li>
      ))}
    </ul>
  </div>  
);