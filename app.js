const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente
dotenv.config();

// Inicializar o aplicativo Express
const app = express();

// Middlewares
app.use(express.json());

// Importar as rotas
const authRoutes = require('./routes/authRoutes');
const characterRoutes = require('./routes/characterRoutes');
const quotesRoutes = require('./routes/quotesRoutes');

// Conecte-se ao MongoDB usando o URI do .env
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Definir as rotas
app.use('/api/auth', authRoutes);
app.use('/api/characters', characterRoutes);
app.use('/api/quotes', quotesRoutes);

// Definir a porta
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
