// Estrutura de dados em memória para usuários e transferências
const db = {
  users: [], // { id, username, password, favorecidos: [userId] }
  transfers: [] // { id, from, to, amount, date }
};

module.exports = db;