const transferService = require('../services/transferService');

/**
 * @swagger
 * tags:
 *   name: Transferências
 *   description: Endpoints de transferências
 */

/**
 * @swagger
 * /transfer:
 *   post:
 *     summary: Realiza uma transferência
 *     tags: [Transferências]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - from
 *               - to
 *               - amount
 *             properties:
 *               from:
 *                 type: integer
 *               to:
 *                 type: integer
 *               amount:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Transferência realizada
 *       400:
 *         description: Erro de validação
 */

/**
 * @swagger
 * /transfers:
 *   get:
 *     summary: Lista transferências de um usuário
 *     tags: [Transferências]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de transferências
 */

const transfer = (req, res) => {
  const { from, to, amount } = req.body;
  if (!from || !to || typeof amount !== 'number') {
    return res.status(400).json({ error: 'from, to e amount são obrigatórios.' });
  }
  const result = transferService.createTransfer({ from, to, amount });
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }
  res.status(201).json(result);
};

const getTransfers = (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: 'userId é obrigatório.' });
  const transfers = transferService.getTransfersByUser(Number(userId));
  res.json(transfers);
};

module.exports = { transfer, getTransfers };
