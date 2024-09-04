const express = require('express');
const router = express.Router();
const {
  getAllQuotes,
  getQuoteById,
  createQuote,
  updateQuote,
  deleteQuote
} = require('../controllers/quoteController');
const { checkToken } = require('../middleware/auth'); 

// Rotas para citações
router.get('/', checkToken, getAllQuotes);
router.get('/:id', checkToken, getQuoteById);
router.post('/', checkToken, createQuote);
router.put('/:id', checkToken, updateQuote);
router.delete('/:id', checkToken, deleteQuote);

module.exports = router;
