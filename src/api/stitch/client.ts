import { RemoteMongoClient, Stitch } from 'mongodb-stitch-browser-sdk';

export const stitchClient = Stitch.initializeDefaultAppClient('raccoonnetwork-aybgh');
export const appDb = stitchClient
  .getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas')
  .db('app');

export const logsDb = stitchClient
  .getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas')
  .db('logs');
