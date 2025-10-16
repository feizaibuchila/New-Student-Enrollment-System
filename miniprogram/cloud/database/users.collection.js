const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();
const usersCollection = db.collection('users');

/**
 * Ensure the users collection exists. Safe to call multiple times because the
 * cloud database throws a specific error if the collection already exists.
 */
async function ensureUsersCollection() {
  try {
    await db.createCollection('users');
  } catch (error) {
    // errCode -501002 indicates the collection already exists.
    if (error && error.errCode !== -501002) {
      throw error;
    }
  }
}

/**
 * Create a new user document with the provided profile information.
 * @param {Object} payload
 * @param {string} payload.openid - Required WeChat openid.
 * @param {string} payload.nick - Required nickname for display.
 * @param {string} [payload.avatar] - Optional avatar URL.
 * @param {"student"|"volunteer"} [payload.role="student"] - Optional role.
 */
async function createUser(payload) {
  if (!payload || !payload.openid || !payload.nick) {
    throw new Error('openid and nick are required to create a user');
  }

  const now = db.serverDate();
  const data = {
    _id: payload.openid,
    nick: payload.nick,
    avatar: payload.avatar || null,
    role: payload.role === 'volunteer' ? 'volunteer' : 'student',
    created_at: now,
    last_login_at: now,
  };

  await usersCollection.doc(payload.openid).set({ data });
  return data;
}

/**
 * Retrieve a user document by openid.
 * @param {string} openid
 */
async function getUserById(openid) {
  if (!openid) {
    throw new Error('openid is required to fetch a user');
  }

  const result = await usersCollection.doc(openid).get();
  return result.data || null;
}

/**
 * List users with an optional filter object.
 * @param {Object} [filter]
 */
async function listUsers(filter = {}) {
  const query = usersCollection.where(filter);
  const { data } = await query.get();
  return data;
}

/**
 * Update an existing user document by openid.
 * @param {string} openid
 * @param {Object} updates
 */
async function updateUser(openid, updates) {
  if (!openid) {
    throw new Error('openid is required to update a user');
  }
  const payload = { ...updates };
  if (payload.role && payload.role !== 'student' && payload.role !== 'volunteer') {
    throw new Error('role must be either "student" or "volunteer"');
  }
  delete payload._id;
  delete payload.created_at;
  if (Object.keys(payload).length === 0) {
    return getUserById(openid);
  }

  if (!Object.prototype.hasOwnProperty.call(payload, 'last_login_at')) {
    payload.last_login_at = db.serverDate();
  }
  await usersCollection.doc(openid).update({ data: payload });
  return getUserById(openid);
}

/**
 * Delete a user document from the collection.
 * @param {string} openid
 */
async function deleteUser(openid) {
  if (!openid) {
    throw new Error('openid is required to delete a user');
  }
  return usersCollection.doc(openid).remove();
}

module.exports = {
  ensureUsersCollection,
  createUser,
  getUserById,
  listUsers,
  updateUser,
  deleteUser,
};
