import { gamesByName } from 'api/games';
import React, { SFC } from 'react';

interface IGameProps {
  gameName: string;
}

const Game: SFC<IGameProps> = ({ gameName }) => {
  const game = gamesByName[gameName];

  if (!game) {
    return null; // todo not found
  }

  return <div>{game.name}</div>;
};

export default Game;
