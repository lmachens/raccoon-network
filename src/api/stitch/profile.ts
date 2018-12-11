import { appDb, stitchClient } from './client';

export interface IUserProfile {
  userId: string;
  username: string;
  avatarSrc?: string;
  contactUserIds?: string[];
}

const profiles = appDb.collection<IUserProfile>('profiles');
export const getProfile = async (userId, options?) => {
  console.log('getProfile');
  const result = await profiles.find({ userId }, { ...options, limit: 1 }).asArray();
  const profile = result ? result[0] : null;
  return profile;
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
  const userId = stitchClient.auth.user!.id;

  const existingProfiles = await profiles
    .find({ username, userId: { $ne: userId } }, { limit: 1 })
    .asArray();

  if (existingProfiles.length > 0) {
    throw new Error('An user with the username already exists');
  }
  return profiles.updateOne({ userId }, { $set: { userId, username } });
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
