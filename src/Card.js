import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Card = ({ onClick }) => {
  console.log('Rendering Card component');
  const [pokemon, setPokemon] = useState([]);
  const [shuffledPokemon, setShuffledPokemon] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
        const pokemonList = response.data.results;

        const pokemonWithDetails = await Promise.all(
          pokemonList.map(async (poke) => {
            const details = await fetchPokemonDetails(poke.url);
            return {
              id: details.id,
              name: details.name,
              image: details.sprites.front_default,
            };
          })
        );

        setPokemon(pokemonWithDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Shuffle the cards whenever the pokemon state changes
    setShuffledPokemon([...pokemon].sort(() => Math.random() - 0.5));
  }, [pokemon]);

  const fetchPokemonDetails = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
    }
  };

  const handleCardClick = (clickedPokemon) => {
    onClick(clickedPokemon);
    setPokemon((prevPokemon) => [...prevPokemon].sort(() => Math.random() - 0.5));

  };

  const renderCards = () => {
    if (!shuffledPokemon || !shuffledPokemon.length) {
      return <p>Loading cards...</p>;
    }

    return (
      <div className="card-container">
        {shuffledPokemon.map((poke) => (
          <div key={poke.id} className="card" onClick={() => handleCardClick(poke)}>
            <img src={poke.image} alt={poke.name} />
            <p>{poke.name}</p>
          </div>
        ))}
      </div>
    );
  };

  return <div className="card-container">{renderCards()}</div>;
};

export default Card;
