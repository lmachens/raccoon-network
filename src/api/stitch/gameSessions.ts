import { appDb, stitchClient } from './client';

export interface IEvent {
  name: string;
  data: any;
  timestamp: Date;
  video?: any;
}

export interface IGameSession {
  gameId: number;
  matchId: string;
  userId: string;
  info: any;
  events: IEvent[];
  createdAt: Date;
  updatedAt: Date;
}

const gameSessions = appDb.collection<IGameSession>('gameSessions');
export const getGameSessions = userId => {
  console.log('getGameSessions');
  return gameSessions.find({ userId }, { sort: { createdAt: -1 } }).asArray();
};

export const setGameSessionInfo = async ({ gameId, matchId, info }) => {
  console.log('setGameSessionInfo', gameId, matchId);
  const userId = stitchClient.auth.user!.id;
  const now = new Date();
  return gameSessions.updateOne(
    { userId, gameId, matchId },
    {
      $set: { info, updatedAt: now },
      $setOnInsert: { userId, gameId, matchId, events: [], createdAt: now }
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
