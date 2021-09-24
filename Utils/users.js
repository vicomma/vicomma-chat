const users = [];// this would talk to the redis database

// Join user to chat
function userJoin(id, username, projectName) {
  const user = { id, username, projectName };
  users.push(user);

  return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
function getRoomUsers(projectName) {
  return users.filter(user => user.projectName === projectName);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  users
};
