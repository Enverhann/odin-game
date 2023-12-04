import React, { useState, useEffect } from 'react';
import Card from './Card';
import Scoreboard from './Scoreboard';

const App = () => {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [cards, setCards] = useState([]);

  const handleCardClick = (card) => {
    console.log('Card clicked:', card);

    if (clickedCards.includes(card.id)) {
      setScore(0);
      setClickedCards([]);
    } else {
      setScore((prevScore) => prevScore + 1);
      setBestScore((prevBestScore) => Math.max(prevBestScore, score + 1));
      setClickedCards([...clickedCards, card.id]);
    }

    shuffleCards();
  };

  const shuffleCards = () => {
    setCards((prevCards) => {
      const shuffledCards = [...prevCards];
      shuffledCards.sort(() => Math.random() - 0.5);
      return shuffledCards;
    });
  };

  useEffect(() => {
    const initialCards = [
      { id: 1, name: 'Card 1', image: 'url_to_image_1' },
      { id: 2, name: 'Card 2', image: 'url_to_image_2' },
    ];

    setCards(initialCards);
    shuffleCards();
  }, []);

  return (
    <div>
      <Scoreboard score={score} bestScore={bestScore} />
      <div className="card-container">
        {/* Pass the score and bestScore as props to the Scoreboard component */}
        <Card onClick={handleCardClick} />
      </div>
    </div>
  );
};

export default App;
