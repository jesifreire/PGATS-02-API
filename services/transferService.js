const db = require('../models/db');
const userService = require('../services/userService');

function createTransfer({ from, to, amount }) {
  const sender = db.users.find(u => u.id === from);
  const recipient = db.users.find(u => u.id === to);
  if (!sender || !recipient) return { error: 'Usuário não encontrado' };

  // Regra: só pode transferir acima de 5.000 para favorecido
  const isFavorecido = sender.favorecidos.includes(to);
  if (!isFavorecido && amount >= 5000) {
    return { error: 'Transferências acima de R$ 5.000,00 só são permitidas para favorecidos.' };
  }

  const transfer = {
    id: db.transfers.length + 1,
    from,
    to,
    amount,
    date: new Date().toISOString()
  };
  db.transfers.push(transfer);
  return transfer;
}

function getTransfersByUser(userId) {
  return db.transfers.filter(t => t.from === userId || t.to === userId);
}

module.exports = {
  createTransfer,
  getTransfersByUser
};
