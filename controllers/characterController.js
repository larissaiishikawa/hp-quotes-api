const Character = require('../models/Character');

// Função para listar personagens
const getAllCharacters = async (req, res) => {
    try {
        const characters = await Character.find();
        res.status(200).json(characters);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Função para obter um personagem por ID
const getCharacterById = async (req, res) => {
    try {
        const character = await Character.findById(req.params.id);
        if (!character) {
            return res.status(404).json({ msg: 'Personagem não encontrado' });
        }
        res.status(200).json(character);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Função para criar um novo personagem
const createCharacter = async (req, res) => {
    const { name, house, dob } = req.body;
    if (!name || !house || !dob) {
        return res.status(422).json({ msg: 'Preencha todos os campos' });
    }
    const character = new Character({ name, house, dob });
    try {
        await character.save();
        res.status(201).json({ msg: 'Personagem adicionado com sucesso!' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Função para atualizar um personagem
const updateCharacter = async (req, res) => {
    const { name, house, dob } = req.body;
    if (!name || !house || !dob) {
        return res.status(422).json({ msg: 'Preencha todos os campos' });
    }
    try {
        const character = await Character.findByIdAndUpdate(req.params.id, {
            name,
            house,
            dob,
        }, { new: true });
        if (!character) {
            return res.status(404).json({ msg: 'Personagem não encontrado' });
        }
        res.status(200).json(character);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Função para deletar um personagem
const deleteCharacter = async (req, res) => {
    try {
        const deletedCharacter = await Character.findByIdAndDelete(req.params.id);
        if (!deletedCharacter) {
            return res.status(404).json({ msg: 'Personagem não encontrado' });
        }
        res.status(200).json({ msg: 'Personagem deletado com sucesso!' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = {
    getAllCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter
};
