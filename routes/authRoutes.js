const express = require('express');
const router = express.Router();
const { registerUser, loginUser, createAdmin, logoutUser } = require('../controllers/authController');
const { checkToken } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints para autenticação e autorização
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Registra um novo usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Harry Potter"
 *               email:
 *                 type: string
 *                 example: "harry.potter@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               confirmpassword:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso!
 *       422:
 *         description: Erro de validação
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Faz o login de um usuário existente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "harry.potter@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *       422:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /api/auth/admin/register:
 *   post:
 *     tags: [Auth]
 *     summary: Registra um novo administrador. Requer autenticação.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Albus Dumbledore"
 *               email:
 *                 type: string
 *                 example: "albus.dumbledore@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               confirmpassword:
 *                 type: string
 *                 example: "password123"
 *               REQisAdmin:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Administrador registrado com sucesso!
 *       422:
 *         description: Erro de validação
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/admin/register', checkToken, createAdmin);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Faz o logout do usuário autenticado. Requer autenticação.
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 *       401:
 *         description: Acesso negado
 */
router.post('/logout', checkToken, logoutUser);

module.exports = router;
