const express = require('express');
const router = express.Router();
const { registerUser, loginUser, createAdmin, logoutUser } = require('../controllers/authController');
const { checkToken } = require('../middleware/auth');

// Roteamento
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/admin/register', checkToken, createAdmin);
router.post('/logout', checkToken, logoutUser); 
module.exports = router;
