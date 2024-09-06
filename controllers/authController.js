const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Função para registrar usuário
const registerUser = async (req, res) => {
    const { name, email, password, confirmpassword } = req.body;

    // Validadores
    if (!name || !email || !password || password !== confirmpassword) {
        return res.status(422).json({ msg: 'Preencha todos os campos corretamente' });
    }

    // Verifica se o usuário já existe
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(422).json({ msg: 'Email em uso' });
    }

    // Hash da senha
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Criação do usuário
    const user = new User({
        name,
        email,
        password: passwordHash,
        isAdmin: false
    });

    try {
        await user.save();
        res.status(201).json({ msg: 'Usuário criado com sucesso!' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Função para login de usuário
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(422).json({ msg: 'Credenciais inválidas' });
        }

        user.access += 1;
        await user.save();

        const secret = process.env.SECRET;
        const token = jwt.sign({ id: user._id }, secret);
        res.status(200).json({ msg: 'Autenticado com sucesso', token });
    } catch (error) {
        res.status(500).json({ msg: 'Erro no servidor' });
    }
};

// Função para criar admin
const createAdmin = async (req, res) => {
    const { name, email, password, confirmpassword, REQisAdmin } = req.body;

    // Validadores
    if (!name || !email || !password || password !== confirmpassword) {
        return res.status(422).json({ msg: 'Preencha todos os campos corretamente' });
    }

    // Verifica se o usuário já existe
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(422).json({ msg: 'Email em uso' });
    }

    // Hash da senha
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Criação do usuário
    const user = new User({
        name,
        email,
        password: passwordHash,
        isAdmin: REQisAdmin
    });

    try {
        await user.save();
        res.status(201).json({ msg: 'Usuário criado com sucesso!' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Função para logout
const logoutUser = (req, res) => {
    res.status(200).json({ msg: 'Desconectado com sucesso' });
};

// Função para mostrar a quantidade de acessos

const getAccess = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado' });
        }

        res.status(200).json({ accessCount: user.access });
    } catch (error) {
        res.status(500).json({ msg: 'Erro no servidor' });
    }
};



// Exportar funções
module.exports = { registerUser, loginUser, createAdmin, logoutUser, getAccess };
