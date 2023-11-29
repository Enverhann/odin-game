import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Card = ({ onClick }) => {
    console.log('Rendering Card component');
  const [pokemon, setPokemon] = useState([]);

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

  const fetchPokemonDetails = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
    }
  };

  const renderCards = () => {
    if (!pokemon || !pokemon.length) {
      return <p>Loading cards...</p>;
    }
  
    return (
      <div className="card-container">
        {pokemon.map((poke) => (
          <div key={poke.id} className="card" onClick={() => onClick(poke)}>
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
