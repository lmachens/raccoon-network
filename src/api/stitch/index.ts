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
export const handleSignup = async (email, password) => {
  try {
    await emailPasswordClient.registerWithEmail(email, password);
    console.log('Successfully registered. Check your inbox for a confirmation email.');
  } catch (e) {
    console.error(e);
  }
};

// Authenticate an application user based on the submitted information
export const handleLogin = async (email, password) => {
  const credential = new UserPasswordCredential(email, password);

  try {
    await stitchClient.auth.loginWithCredential(credential);
    const user = stitchClient.auth.user;
    console.log(`Logged in as:`, user);
  } catch (e) {
    console.error(e);
  }
};

export const handleLogout = async () => {
  await stitchClient.auth.logout();
};

export const handleResendConfirmation = async email => {
  await emailPasswordClient.resendConfirmationEmail(email);
};
