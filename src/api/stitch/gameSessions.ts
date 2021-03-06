import { supportedGameIds } from 'api/games';
import { getUserId } from './auth';
import { appDb } from './client';
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
  champion?: string;
  gameMode?: string;
  level?: number;
  kills: number;
  deaths: number;
  assists: number;
  minionKills: number;
  matchOutcome?: 'lose' | 'win';
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
  return gameSessions
    .find(
      { userId, gameId: { $in: supportedGameIds }, 'events.0': { $exists: true } },
      { sort: { createdAt: -1 } }
    )
    .asArray();
};

export const getGameSession = async ({ userId, matchId }) => {
  console.log('getGameSession');
  const result = await gameSessions
    .find(
      { userId, matchId, gameId: { $in: supportedGameIds }, 'events.0': { $exists: true } },
      { limit: 1 }
    )
    .asArray();
  const gameSession = result ? result[0] : null;
  return gameSession;
};

export const findGameSessions = (query, options) => {
  console.log('findGameSessions');
  return gameSessions
    .find(
      { ...query, gameId: { $in: supportedGameIds }, 'events.0': { $exists: true } },
      { ...options, sort: { createdAt: -1 } }
    )
    .asArray();
};

export const setGameSessionInfo = async ({ gameId, matchId, info }) => {
  console.log('setGameSessionInfo', gameId, matchId);
  const userId = getUserId();
  if (!userId) {
    console.error('Not logged in');
    return null;
  }
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
  const userId = getUserId();
  if (!userId) {
    console.error('Not logged in');
    return null;
  }
  return gameSessions.updateOne({ userId, matchId }, { $addToSet: { events: event } });
};

export const addGameSessionEvents = async (matchId, events) => {
  console.log('addGameSessionEvents', matchId, events);
  const userId = getUserId();
  if (!userId) {
    console.error('Not logged in');
    return null;
  }
  return gameSessions.updateOne({ userId, matchId }, { $addToSet: { events: { $each: events } } });
};
