const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();
const usersCollection = db.collection('users');

async function ensureUsersCollection() {
  try {
    await db.createCollection('users');
  } catch (error) {
    if (error && error.errCode !== -501002) {
      throw error;
    }
  }
}

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

async function getUserById(openid) {
  if (!openid) {
    throw new Error('openid is required to fetch a user');
  }

  const result = await usersCollection.doc(openid).get();
  return result.data || null;
}

async function listUsers(filter = {}) {
  const query = usersCollection.where(filter);
  const { data } = await query.get();
  return data;
}

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

async function deleteUser(openid) {
  if (!openid) {
    throw new Error('openid is required to delete a user');
  }
  await usersCollection.doc(openid).remove();
  return { _id: openid };
}

const handlers = {
  ensure: async () => ({ ok: true }),
  create: async (event) => createUser(event.payload || {}),
  get: async (event) => {
    const id = event.openid || (event.payload && event.payload.openid);
    if (!id) {
      throw new Error('openid is required for get action');
    }
    return getUserById(id);
  },
  list: async (event) => listUsers(event.payload || {}),
  update: async (event) => {
    const id = event.openid || (event.payload && event.payload.openid);
    if (!id) {
      throw new Error('openid is required for update action');
    }
    const updates = event.payload || {};
    delete updates.openid;
    return updateUser(id, updates);
  },
  remove: async (event) => {
    const id = event.openid || (event.payload && event.payload.openid) || event.payload;
    if (!id) {
      throw new Error('openid is required for remove action');
    }
    return deleteUser(id);
  },
};

/**
 * 单入口云函数，便于在单分支开发流程中调用不同的用户操作。
 * @param {object} event
 * @param {string} event.action - 操作类型：ensure/create/get/list/update/remove
 * @param {object} [event.payload] - 对应操作所需的参数。
 *   - create: `{ openid, nick, avatar?, role? }`
 *   - get/remove/update: `{ openid }` 也可直接传入 `event.openid`
 *   - list: 任意集合过滤条件
 */
exports.main = async (event = {}) => {
  const action = event.action;
  const handler = handlers[action];
  if (!handler) {
    throw new Error('Unknown action, expected one of ensure/create/get/list/update/remove');
  }

  await ensureUsersCollection();
  return handler(event);
};
