import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import styles from './Game.css'

//memory game grid of cards.  Card is shown or hidden based on whether card has been clicked, which changes the classname
function Cards(props){
	return (
			<div>
			   <ul className={styles['grid-container']}>
			   {props.list.map((card, index)=><li key={index} className={props.cardsToMatch.indexOf(index)!=-1 || props.cardsMatched.indexOf(index)!=-1 ? styles['grid-item-show'] : styles['grid-item-hide']} onClick={()=> props.onRevealCard(card, index)}><span className={props.cardsToMatch.indexOf(index)!=-1 || props.cardsMatched.indexOf(index)!=-1 ? styles['show-card'] : styles['hide-card']}>{card}</span></li>)}
			   </ul>
		   </div>
	)
}

//welcome message to start new game
function Welcome(props){
     return(
	     <div className={styles['welcome']}>
			<h1 className={styles['header']}>Welcome to the Match Game</h1>
			<div className={styles['placeholder']}>Choose your level</div>
			<ul>
				<li><a href="#" id="easy" onClick={()=>props.onChooseLevel("easy")} >Easy</a></li>
				<li><a href="#" id="hard" onClick={()=>props.onChooseLevel("hard")}>Difficult</a></li>
			</ul>
	     </div>
     )
}  

//get game data from API endpoint, and return array of cards matching the level selected
function getGameData(gameLevel) {
	let level;
	if(typeof gameLevel==undefined) level="easy";
	else level=gameLevel;
    const encodedURI = encodeURI('https://danielledc.github.io/match-game-app/numbers.json')
    return fetch(encodedURI)
		   .then(response => {
				if(response.status === 200){
					return Promise.resolve(response.json());
				}
			    else{
					return Promise.reject(new Error("error"));
			    }
			})
          .then(data => {
			    for (var x in data.levels){
					if(data.levels[x].difficulty==level) return Promise.resolve(data.levels[x].cards.sort((a, b)=>  0.5 - Math.random()));
			    }
				
			})
          .catch((error) => {
            console.warn(error);
            return null;
    });
}

//Game component 
class Game extends Component {
	constructor(props){
				super(props);
				this.state={
					cards:[
						
					],
					count:0,
					gameStarted:false,
					cardsToMatch:[],
					cardsMatched:[]
				}
				this.getGame=this.getGame.bind(this);
				this.handleRevealCard=this.handleRevealCard.bind(this);
				this.handleMatch=this.handleMatch.bind(this);
	}
	//when two cards have been clicked call this.handleMatch to determine if match
	componentDidUpdate(){
		   if(this.state.count==2){
					setTimeout(this.handleMatch,700);
			}
	
	}
	//determine if both cards match. Reset count to 0, and, if cards match, add cards to this.state.cardsMatched.
	handleMatch(){
		   
		    let card1=this.state.cardsToMatch[0];
			let card2=this.state.cardsToMatch[1];
				
			if(this.state.cards[this.state.cardsToMatch[0]]===this.state.cards[this.state.cardsToMatch[1]]){
				this.setState((currentState)=>{
							return{
							count:0,
							cardsToMatch:[],
							cardsMatched:currentState.cardsMatched.concat(card1, card2)
							}
						})
			}
			else {
				this.setState((currentState)=>{
							return{
							count:0,
							cardsToMatch: []
							
							}
						})
			}
	}
	//when card clicked,  make sure it hasn't already been clicked or matched, then add to this.cardsToMatch and increment count
	handleRevealCard(card, index){
	        this.setState((currentState)=>{
				if(this.state.cardsToMatch[0]!=index&&this.state.cardsMatched.indexOf(card)==-1)
					return{
						count:currentState.count+1,
						gameStarted:true,
				    	cardsToMatch: currentState.cardsToMatch.concat(index)
					
					}
				})
	}
	//when all cards have been matched reset state, in order to prompt to play again
	playAgain(){
		this.setState((currentState)=>{
			return{
						cards:[],
						gameStarted:false,
						cardsToMatch: [],
						cardsMatched:[]
					}
				 }	)
				
	}
	//get the game data and set this.state.cards to data		
	getGame(level){
		let gameLevel=level;
		getGameData(gameLevel)
			.then((cards)=>{
					this.setState({
						cards
					})
				})
	}
	
	//change UI based on state
	render() {
		const cardsDiv=<div><Cards list={this.state.cards} cardsToMatch={this.state.cardsToMatch} cardsMatched={this.state.cardsMatched} onRevealCard={this.handleRevealCard} /></div>
			
		if(this.state.cards.length>0){
			if(this.state.gameStarted==true){
					if(this.state.cardsMatched.length==this.state.cards.length){
							return (<div className={styles['pre-game']}><a href="#" onClick={()=>{this.playAgain()}}>Play Again!</a> {cardsDiv}
							</div> )
					
					}
					else return (<div>
								{cardsDiv}
							</div>
					)
			}
			else{
				 return(<div className={styles['pre-game']}>Click any card to start game!{cardsDiv}</div> )
			}
		}
        else return (
			<Welcome  onChooseLevel={this.getGame} />
        )
      }
  }
   
export default Game
