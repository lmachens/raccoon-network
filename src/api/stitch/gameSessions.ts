import { appDb, stitchClient } from './client';

export interface GameSession {
  gameId: string;
  userId: string;
  info: any;
  events: any[];
}

const gameSessions = appDb.collection<GameSession>('gameSessions');
export const getGameSessions = userId => {
  console.log('getGameSessions');
  return gameSessions.find({ userId }).asArray();
};

export const setGameSessionInfo = async (gameId, info) => {
  console.log('setGameSessionInfo');
  const userId = stitchClient.auth.user!.id;
  return gameSessions.updateOne(
    { gameId },
    { $set: { info }, $setOnInsert: { gameId, userId, info, events: [] } },
    { upsert: true }
  );
};

export const addGameSessionEvent = async (gameSessionId, event) => {
  console.log('addGameSessionEvent');
  return gameSessions.updateOne({ _id: gameSessionId }, { $addToSet: { events: event } });
};
