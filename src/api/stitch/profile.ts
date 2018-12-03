import { appDb } from './client';

const profiles = appDb.collection('profiles');
export const getProfile = async userId => {
  const result = await profiles.find({ userId }, { limit: 1 }).asArray();
  return result ? result[0] : null;
};

export const setProfile = async (userId, { username }) => {
  console.log(userId, username);
  const existingProfiles = await profiles.find({ username }, { limit: 1 }).asArray();

  if (existingProfiles.length > 0) {
    throw new Error('An user with the username already exists');
  }
  return profiles.updateOne({ userId }, { userId, username }, { upsert: true });
};
