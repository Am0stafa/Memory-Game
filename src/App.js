import { useEffect, useState } from 'react';
import './App.css'
import Card from './components/Card';

const arrayOfCards = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
]



function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const suffleCard = () =>{
    //! it will duplicate the cards
    //! randomize the order using sort
    //! apply random id to each card
    
    const shuffled = [...arrayOfCards,...arrayOfCards]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
    
    setCards(shuffled)
    setTurns(0)
    setChoiceOne(null)
    setChoiceTwo(null)
  }
  
  const handelChoice = (card) =>{ 
    //! if it has a value we have it
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  
  //! compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true) //! at this point after we have selected two cards disable any choice until we evaluate
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }

    }
  }, [choiceOne, choiceTwo])

  //! reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)

  }

  useEffect(() => {
    suffleCard()
  }, [])
  
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={suffleCard}>New Game</button>
        <div className="card-grid">
        {cards.map(card => (
          <Card key={card.id} card={card} handelChoice={handelChoice} flipped={card === choiceOne || card === choiceTwo || card.matched} disable={disabled}/>
        ))}
      </div>
      
      <p>Turns: {turns}</p>
      
    </div>
  );
}

export default App