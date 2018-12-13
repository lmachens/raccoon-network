import { appDb, stitchClient } from './client';
import { getProfile } from './profile';

export interface IGameSessionEvent {
  name: string;
  title: string;
  data: any;
  timestamp: Date;
  video?: any;
}

export interface IMatchInfo {
  matchId?: string;
  startedAt?: Date;
  endedAt?: Date;
  outcome?: any;
  alive?: boolean;
  champion?: string;
  gameMode?: string;
  level?: number;
  kills: number;
  deaths: number;
  assists: number;
  minionKills: number;
  [key: string]: any;
}

export interface IGameSession {
  _id?: string;
  gameId: number;
  matchId: string;
  userId: string;
  profile: {
    username: string;
    avatarSrc?: string;
  };
  info: IMatchInfo;
  events: IGameSessionEvent[];
  createdAt: Date;
  updatedAt: Date;
}

const gameSessions = appDb.collection<IGameSession>('gameSessions');
export const getGameSessions = userId => {
  console.log('getGameSessions');
  return gameSessions.find({ userId }, { sort: { createdAt: -1 } }).asArray();
};

export const getGameSession = async ({ userId, matchId }) => {
  console.log('getGameSession');
  const result = await gameSessions.find({ userId, matchId }, { limit: 1 }).asArray();
  const gameSession = result ? result[0] : null;
  return gameSession;
};

export const findGameSessions = (query, options) => {
  console.log('findGameSessions');
  return gameSessions.find(query, { ...options, sort: { createdAt: -1 } }).asArray();
};

export const setGameSessionInfo = async ({ gameId, matchId, info }) => {
  console.log('setGameSessionInfo', gameId, matchId);
  const userId = stitchClient.auth.user!.id;
  const now = new Date();
  const profile = await getProfile(userId, { projection: { username: 1, avatarSrc: 1 } });
  return gameSessions.updateOne(
    { userId, gameId, matchId },
    {
      $set: { info, updatedAt: now },
      $setOnInsert: { userId, profile, gameId, matchId, events: [], createdAt: now }
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
