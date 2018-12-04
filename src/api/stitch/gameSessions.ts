import { appDb, stitchClient } from './client';

export interface GameSession {
  gameId: string;
  userId: string;
  info: any;
  events: any[];
  createdAt: number;
  updatedAt: number;
}

const gameSessions = appDb.collection<GameSession>('gameSessions');
export const getGameSessions = userId => {
  console.log('getGameSessions');
  return gameSessions.find({ userId }, { sort: { createdAt: -1 } }).asArray();
};

export const setGameSessionInfo = async (gameId, info) => {
  console.log('setGameSessionInfo');
  const userId = stitchClient.auth.user!.id;
  const now = Date.now();
  return gameSessions.updateOne(
    { gameId },
    {
      $set: { info, updatedAt: now },
      $setOnInsert: { gameId, userId, events: [], createdAt: now }
    },
    { upsert: true }
  );
};

export const addGameSessionEvent = async (gameId, event) => {
  console.log('addGameSessionEvent', gameId, event);
  return gameSessions.updateOne({ gameId }, { $addToSet: { events: event } });
};

export const addGameSessionEvents = async (gameId, events) => {
  console.log('addGameSessionEvents', gameId, events);
  return gameSessions.updateOne({ gameId }, { $addToSet: { events: { $each: events } } });
};
