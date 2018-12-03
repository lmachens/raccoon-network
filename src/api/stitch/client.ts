import { RemoteMongoClient, Stitch } from 'mongodb-stitch-browser-sdk';

export const stitchClient = Stitch.initializeDefaultAppClient('raccoonnetwork-aybgh');
export const db = stitchClient
  .getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas')
  .db('raccoon-network');
