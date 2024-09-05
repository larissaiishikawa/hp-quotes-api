const express = require('express');
const router = express.Router();
const {
  getAllQuotes,
  getQuoteById,
  createQuote,
  updateQuote,
  deleteQuote,
  countLettersInQuote // Adicione a função aqui
} = require('../controllers/quoteController');
const { checkToken } = require('../middleware/auth'); 

/**
 * @swagger
 * tags:
 *   name: Quotes
 *   description: Endpoints para gerenciar citações
 */

/**
 * @swagger
 * /api/quotes:
 *   get:
 *     tags: [Quotes]
 *     summary: Obtém todas as citações.
 *     responses:
 *       200:
 *         description: Lista de todas as citações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   text:
 *                     type: string
 *                     example: "It is our choices that show what we truly are, far more than our abilities."
 *                   character:
 *                     type: string
 *                     example: "Albus Dumbledore"
 *                   movie:
 *                     type: string
 *                     example: "Harry Potter and the Chamber of Secrets"
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', checkToken, getAllQuotes);

/**
 * @swagger
 * /api/quotes/{id}:
 *   get:
 *     tags: [Quotes]
 *     summary: Obtém uma citação por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalhes da citação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 text:
 *                   type: string
 *                   example: "It is our choices that show what we truly are, far more than our abilities."
 *                 character:
 *                   type: string
 *                   example: "Albus Dumbledore"
 *                 movie:
 *                   type: string
 *                   example: "Harry Potter and the Chamber of Secrets"
 *       404:
 *         description: Citação não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', checkToken, getQuoteById);

/**
 * @swagger
 * /api/quotes:
 *   post:
 *     tags: [Quotes]
 *     summary: Cria uma nova citação.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "It is our choices that show what we truly are, far more than our abilities."
 *               character:
 *                 type: string
 *                 example: "Albus Dumbledore"
 *               movie:
 *                 type: string
 *                 example: "Harry Potter and the Chamber of Secrets"
 *     responses:
 *       201:
 *         description: Citação criada com sucesso!
 *       422:
 *         description: Erro de validação
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', checkToken, createQuote);

/**
 * @swagger
 * /api/quotes/{id}:
 *   put:
 *     tags: [Quotes]
 *     summary: Atualiza uma citação existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "It is our choices that show what we truly are, far more than our abilities."
 *               character:
 *                 type: string
 *                 example: "Albus Dumbledore"
 *               movie:
 *                 type: string
 *                 example: "Harry Potter and the Chamber of Secrets"
 *     responses:
 *       200:
 *         description: Citação atualizada com sucesso!
 *       404:
 *         description: Citação não encontrada
 *       422:
 *         description: Erro de validação
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', checkToken, updateQuote);

/**
 * @swagger
 * /api/quotes/{id}:
 *   delete:
 *     tags: [Quotes]
 *     summary: Deleta uma citação existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Citação deletada com sucesso!
 *       404:
 *         description: Citação não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', checkToken, deleteQuote);

/**
 * @swagger
 * /api/quotes/{id}/letters:
 *   get:
 *     tags: [Quotes]
 *     summary: Conta o número de letras em uma citação.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contagem de letras da citação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 letterCount:
 *                   type: integer
 *                   example: 55
 *       404:
 *         description: Citação não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id/letters', checkToken, countLettersInQuote);

module.exports = router;
