const db = require('../models/db');

function findUserByUsername(username) {
  return db.users.find(u => u.username === username);
}

function createUser({ username, password }) {
  if (findUserByUsername(username)) return null;
  const user = {
    id: db.users.length + 1,
    username,
    password,
    favorecidos: []
  };
  db.users.push(user);
  return user;
}

function validateUser(username, password) {
  const user = findUserByUsername(username);
  if (user && user.password === password) return user;
  return null;
}

function getAllUsers() {
  return db.users.map(u => ({ id: u.id, username: u.username, favorecidos: u.favorecidos }));
}

function addFavorecido(userId, favorecidoId) {
  const user = db.users.find(u => u.id === userId);
  if (user && !user.favorecidos.includes(favorecidoId)) {
    user.favorecidos.push(favorecidoId);
    return true;
  }
  return false;
}

module.exports = {
  findUserByUsername,
  createUser,
  validateUser,
  getAllUsers,
  addFavorecido
};
