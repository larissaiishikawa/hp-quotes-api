const express = require('express');
const router = express.Router();
const { installDatabase } = require('../controllers/installController');

/**
 * @swagger
 * tags:
 *   name: Install
 *   description: Endpoints para instalação e configuração do banco de dados
 */

/**
 * @swagger
 * /api/install:
 *   get:
 *     tags: [Install]
 *     summary: Instala e popula o banco de dados com dados iniciais.
 *     responses:
 *       200:
 *         description: Banco de dados instalado e populado com sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Banco de dados instalado e populado com sucesso!
 *       500:
 *         description: Erro ao instalar o banco de dados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Erro ao instalar o banco de dados
 */
router.get('/', installDatabase);

module.exports = router;
