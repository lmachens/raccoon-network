import { appDb, stitchClient } from './client';

export interface GameSession {
  gameId: string;
  matchId: string;
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

export const setGameSessionInfo = async ({ gameId, matchId, info }) => {
  console.log('setGameSessionInfo');
  const userId = stitchClient.auth.user!.id;
  const now = Date.now();
  return gameSessions.updateOne(
    { gameId, matchId },
    {
      $set: { info, updatedAt: now },
      $setOnInsert: { gameId, matchId, userId, events: [], createdAt: now }
    },
    { upsert: true }
  );
};

export const addGameSessionEvent = async (matchId, event) => {
  console.log('addGameSessionEvent', matchId, event);
  return gameSessions.updateOne({ matchId }, { $addToSet: { events: event } });
};

export const addGameSessionEvents = async (matchId, events) => {
  console.log('addGameSessionEvents', matchId, events);
  return gameSessions.updateOne({ matchId }, { $addToSet: { events: { $each: events } } });
};
