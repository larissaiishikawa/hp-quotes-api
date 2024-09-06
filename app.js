const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { swaggerUi, swaggerDocs } = require('./config/swagger');

dotenv.config();

const app = express();

app.use(express.json());

// Importar as rotas
const authRoutes = require('./routes/authRoutes');
const characterRoutes = require('./routes/characterRoutes');
const quotesRoutes = require('./routes/quotesRoutes');
const installRoutes = require('./routes/installRoutes');

// Conecte-se ao MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1);
});

// Definir as rotas
app.use('/api/auth', authRoutes);
app.use('/api/characters', characterRoutes);
app.use('/api/quotes', quotesRoutes);
app.use('/api/install', installRoutes);

// Rota para documentação Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Definir a porta
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
