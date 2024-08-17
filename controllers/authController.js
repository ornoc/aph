const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Função para registro de um novo usuário
exports.register = async (req, res) => {
    const { nome, sobrenome, email, senha } = req.body;

    // Validação da senha
    if (senha.length < 8) {
        return res.status(400).json({ message: 'A senha deve ter pelo menos 8 caracteres.' });
    }

    try {
        // Verificar se o usuário já existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Usuário já registrado' });
        }

        // Criptografar a senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Criar novo usuário
        const newUser = new User({ nome, sobrenome, email, senha: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ message: 'Erro no servidor', error });
    }
};

// Função para login de usuário
exports.login = async (req, res) => {
    const { email, senha } = req.body;
    console.log("Iniciando login para:", email);  // Log para iniciar o processo de login

    try {
        // Verificar se o usuário existe
        const user = await User.findOne({ email });
        if (!user) {
            console.log("Usuário não encontrado:", email);
            return res.status(400).json({ message: 'Usuário não encontrado.' });
        }

        // Verificar se a senha está correta
        const isPasswordValid = await bcrypt.compare(senha, user.senha);
        if (!isPasswordValid) {
            console.log("Senha incorreta para usuário:", email);
            return res.status(400).json({ message: 'Senha incorreta.' });
        }

        // Gerar o token JWT
       // Correção na linha onde o token é gerado
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log("Token gerado com sucesso:", token);  // Log do token gerado

        res.status(200).json({ token });
    } catch (error) {
        console.error('Erro ao tentar logar:', error);
        res.status(500).json({ message: 'Erro no servidor', error });
    }
};

// Função para obter todos os usuários
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao obter usuários:', error);
        res.status(500).json({ message: 'Erro ao obter usuários.', error });
    }
};

// Função para obter um usuário específico por ID
exports.getUserById = async (req, res) => {
    const { id } = req.params;

    // Verificar se o ID é válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID inválido.' });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Erro ao obter usuário:', error);
        res.status(500).json({ message: 'Erro ao obter usuário', error });
    }
};
