const express = require('express');
const router = express.Router();
const {
  getAllCharacters,
  getCharacterById,
  createCharacter,
  updateCharacter,
  deleteCharacter,
} = require('../controllers/characterController');
const { checkToken } = require('../middleware/auth');   

/**
 * @swagger
 * tags:
 *   name: Characters
 *   description: Endpoints para gerenciar personagens
 */

/**
 * @swagger
 * /api/characters:
 *   get:
 *     tags: [Characters]
 *     summary: Obtém todos os personagens.
 *     responses:
 *       200:
 *         description: Lista de todos os personagens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Harry Potter"
 *                   house:
 *                     type: string
 *                     example: "Gryffindor"
 *                   dob:
 *                     type: string
 *                     example: "1980-07-31"
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', checkToken, getAllCharacters);

/**
 * @swagger
 * /api/characters/{id}:
 *   get:
 *     tags: [Characters]
 *     summary: Obtém um personagem por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalhes do personagem
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Hermione Granger"
 *                 house:
 *                   type: string
 *                   example: "Gryffindor"
 *                 dob:
 *                   type: string
 *                   example: "1979-09-19"
 *       404:
 *         description: Personagem não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', checkToken, getCharacterById);

/**
 * @swagger
 * /api/characters:
 *   post:
 *     tags: [Characters]
 *     summary: Cria um novo personagem.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ron Weasley"
 *               house:
 *                 type: string
 *                 example: "Gryffindor"
 *               dob:
 *                 type: string
 *                 example: "1980-03-01"
 *     responses:
 *       201:
 *         description: Personagem criado com sucesso!
 *       422:
 *         description: Erro de validação
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', checkToken, createCharacter);

/**
 * @swagger
 * /api/characters/{id}:
 *   put:
 *     tags: [Characters]
 *     summary: Atualiza um personagem existente.
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
 *               name:
 *                 type: string
 *                 example: "Ginny Weasley"
 *               house:
 *                 type: string
 *                 example: "Gryffindor"
 *               dob:
 *                 type: string
 *                 example: "1981-08-11"
 *     responses:
 *       200:
 *         description: Personagem atualizado com sucesso!
 *       404:
 *         description: Personagem não encontrado
 *       422:
 *         description: Erro de validação
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', checkToken, updateCharacter);

/**
 * @swagger
 * /api/characters/{id}:
 *   delete:
 *     tags: [Characters]
 *     summary: Deleta um personagem existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Personagem deletado com sucesso!
 *       404:
 *         description: Personagem não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', checkToken, deleteCharacter);

module.exports = router;
