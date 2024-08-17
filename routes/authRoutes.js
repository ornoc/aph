const express = require('express');
const { register, login, getAllUsers, getUserById } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware'); // Importa o middleware
const router = express.Router();

// Rota para registro de novo usuário
router.post('/register', register);

// Rota para login de usuário
router.post('/login', login);

// Rota para obter todos os usuários (não protegido por autenticação)
router.get('/users', getAllUsers);

// Rota para obter um usuário específico (protegido por autenticação)
router.get('/users/:id', authMiddleware, getUserById);

module.exports = router;
