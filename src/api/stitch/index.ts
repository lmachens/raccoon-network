import {
  RemoteMongoClient,
  Stitch,
  UserPasswordAuthProviderClient,
  UserPasswordCredential
} from 'mongodb-stitch-browser-sdk';

export const stitchClient = Stitch.initializeDefaultAppClient('raccoonnetwork-aybgh');

const db = stitchClient
  .getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas')
  .db('raccoon-network');

const emailPasswordClient = stitchClient.auth.getProviderClient(
  UserPasswordAuthProviderClient.factory,
  'userpass'
);

// Register a new application user when the user submits their information
export const handleSignup = (email, password) => {
  return emailPasswordClient.registerWithEmail(email, password);
};

// Authenticate an application user based on the submitted information
export const handleLogin = (email, password) => {
  const credential = new UserPasswordCredential(email, password);
  return stitchClient.auth.loginWithCredential(credential);
};

export const handleLogout = () => {
  return stitchClient.auth.logout();
};

export const handleResendConfirmation = email => {
  return emailPasswordClient.resendConfirmationEmail(email);
};

export const handleConfirmUser = (token, tokenId) => {
  return emailPasswordClient.confirmUser(token, tokenId);
};
