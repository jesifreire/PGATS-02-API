/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Endpoints de usuários
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado
 *       409:
 *         description: Usuário já existe
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza login
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado
 *       401:
 *         description: Credenciais inválidas
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários
 */

/**
 * @swagger
 * /users/favorecido:
 *   post:
 *     summary: Marca um usuário como favorecido
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - favorecidoId
 *             properties:
 *               userId:
 *                 type: integer
 *               favorecidoId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Favorecido adicionado
 *       404:
 *         description: Usuário ou favorecido não encontrado
 */

const userService = require('../services/userService');

const register = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios.' });
  }
  const user = userService.createUser({ username, password });
  if (!user) {
    return res.status(409).json({ error: 'Usuário já existe.' });
  }
  res.status(201).json({ id: user.id, username: user.username });
};

const login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios.' });
  }
  const user = userService.validateUser(username, password);
  if (!user) {
    return res.status(401).json({ error: 'Credenciais inválidas.' });
  }
  res.json({ id: user.id, username: user.username });
};

const listUsers = (req, res) => {
  res.json(userService.getAllUsers());
};

const addFavorecido = (req, res) => {
  const { userId, favorecidoId } = req.body;
  if (!userId || !favorecidoId) {
    return res.status(400).json({ error: 'userId e favorecidoId são obrigatórios.' });
  }
  const ok = userService.addFavorecido(userId, favorecidoId);
  if (!ok) return res.status(404).json({ error: 'Usuário ou favorecido não encontrado.' });
  res.json({ message: 'Favorecido adicionado.' });
};

module.exports = { register, login, listUsers, addFavorecido };
