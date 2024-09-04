const Quote = require('../models/Quote');

// Função para listar citações
const getAllQuotes = async (req, res) => {
    try {
        const quotes = await Quote.find();
        res.status(200).json(quotes);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Função para obter uma citação por ID
const getQuoteById = async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id);
        if (!quote) {
            return res.status(404).json({ msg: 'Citação não encontrada' });
        }
        res.status(200).json(quote);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Função para criar uma nova citação
const createQuote = async (req, res) => {
    const { text, character, movie } = req.body;
    if (!text || !character || !movie) {
        return res.status(422).json({ msg: 'Preencha todos os campos' });
    }
    const quote = new Quote({ text, character, movie });
    try {
        await quote.save();
        res.status(201).json({ msg: 'Citação adicionada com sucesso!' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Função para atualizar uma citação
const updateQuote = async (req, res) => {
    const { text, character, movie } = req.body;
    if (!text || !character || !movie) {
        return res.status(422).json({ msg: 'Preencha todos os campos' });
    }
    try {
        const quote = await Quote.findByIdAndUpdate(req.params.id, {
            text,
            character,
            movie,
        }, { new: true });
        if (!quote) {
            return res.status(404).json({ msg: 'Citação não encontrada' });
        }
        res.status(200).json(quote);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Função para deletar uma citação
const deleteQuote = async (req, res) => {
    try {
        const deletedQuote = await Quote.findByIdAndDelete(req.params.id);
        if (!deletedQuote) {
            return res.status(404).json({ msg: 'Citação não encontrada' });
        }
        res.status(200).json({ msg: 'Citação deletada com sucesso!' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = {
    getAllQuotes,
    getQuoteById,
    createQuote,
    updateQuote,
    deleteQuote
};
