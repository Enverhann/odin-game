import React, { useState, useEffect } from 'react';
import Card from './Card';


const App = () => {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [cards, setCards] = useState([]);

  const handleCardClick = (card) => {
    if (clickedCards.includes(card.id)) {
      // Game over, reset score and clicked cards
      setScore(0);
      setClickedCards([]);
    } else {
      // Increment score and update best score
      setScore((prevScore) => prevScore + 1);
      setBestScore((prevBestScore) => Math.max(prevBestScore, score + 1));
      setClickedCards([...clickedCards, card.id]);
    }

    // Shuffle the cards for the next round
    shuffleCards();
  };

  const shuffleCards = () => {
    // Implement logic to shuffle the cards (modify as needed)
    // For simplicity, let's assume setCards is a function to update the cards state
    // You may need to implement your own shuffle logic based on your data structure
    setCards((prevCards) => prevCards.sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    // Invoke shuffleCards when the component mounts
    shuffleCards();
  }, []);

  return (
    <div>
      <Card onClick={handleCardClick} />
    </div>
  );
};

export default App;
