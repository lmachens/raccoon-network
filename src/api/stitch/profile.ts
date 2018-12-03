import { appDb, stitchClient } from './client';

const profiles = appDb.collection('profiles');
export const getProfile = async userId => {
  console.log('getProfile');
  const result = await profiles.find({ userId }, { limit: 1 }).asArray();
  return result ? result[0] : null;
};

export const findProfiles = (keyword, options) => {
  console.log('findProfiles');
  return profiles
    .find(
      {
        userId: { $ne: stitchClient.auth.user!.id },
        username: new RegExp(keyword, 'i')
      },
      { ...options, projection: { userId: 1, username: 1 } }
    )
    .asArray();
};

export const setProfile = async ({ username }) => {
  console.log('setProfile');
  const existingProfiles = await profiles.find({ username }, { limit: 1 }).asArray();

  if (existingProfiles.length > 0) {
    throw new Error('An user with the username already exists');
  }
  const userId = stitchClient.auth.user!.id;
  return profiles.updateOne({ userId }, { userId, username }, { upsert: true });
};

export const getContacts = userIds => {
  console.log('getContacts');
  return profiles
    .find({ userId: { $in: userIds } }, { projection: { userId: 1, username: 1 } })
    .asArray();
};

export const addContact = async contactUserId => {
  console.log('addContact');
  const userId = stitchClient.auth.user!.id;
  return profiles.updateOne({ userId }, { $addToSet: { contactUserIds: contactUserId } });
};

export const removeContact = async contactUserId => {
  console.log('removeContact');
  const userId = stitchClient.auth.user!.id;
  return profiles.updateOne({ userId }, { $pull: { contactUserIds: contactUserId } });
};
