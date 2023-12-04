import React from 'react';

const Scoreboard = ({ score, bestScore }) => {
    return (
      <div className="scoreboard">
        <div className="score">
          <span>Score: {score}</span>
        </div>
        <div className="best-score">
          <span>Best Score: {bestScore}</span>
        </div>
      </div>
    );
  };

export default Scoreboard;
