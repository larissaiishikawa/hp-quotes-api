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

// Rotas para personagens
router.get('/', checkToken, getAllCharacters);
router.get('/:id', checkToken, getCharacterById);
router.post('/', checkToken, createCharacter);
router.put('/:id', checkToken, updateCharacter);
router.delete('/:id', checkToken, deleteCharacter);

module.exports = router;
