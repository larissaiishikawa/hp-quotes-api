require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Inicializa o app com express
const app = express();

// Configuração do middleware para JSON
app.use(express.json());

// Importação dos modelos
const Quote = require('./models/Quote');
const User = require('./models/User');

// Middleware para verificação de token
function checkToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: 'Acesso negado!' });
    }

    try {
        const secret = process.env.SECRET;
        jwt.verify(token, secret);
        next();
    } catch (error) {
        res.status(400).json({ msg: 'Token inválido' });
    }
}

// Rota pública
app.get('/', (req, res) => {
    res.status(200).json({ msg: "Bem-vindo à API!" });
});

// Rota privada - Exemplo de usuário autenticado
app.get("/user/:id", async (req, res) => {
    checkToken(req, res)
    const id = req.params.id;

    try {
        const user = await User.findById(id, '-password');
        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado' });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// Rota para registrar usuário
app.post('/auth/register', async (req, res) => {
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
});

// Rota para login de usuário
app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(422).json({ msg: 'Credenciais inválidas' });
        }

        const secret = process.env.SECRET;
        const token = jwt.sign({ id: user._id }, secret);
        res.status(200).json({ msg: 'Autenticado com sucesso', token });
    } catch (error) {
        res.status(500).json({ msg: 'Erro no servidor' });
    }
});

// Criar admin
app.post('/admin/register', async (req, res) => {
    checkToken(req, res)
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
});

// Logout
app.post('/auth/logout', async (req, res) => {
    try {
      checkToken(req, res)
      const user = await User.findOne({ token });
      // Deleta o token no banco de dados 
      user.delete({ token })
      res.status(200).json({ msg: 'Desconectado com sucesso', token });
    } catch (error) {
      res.status(500).json({ msg: 'Erro no servidor' });
    }
  });

// Rota para listar frases (GET)
app.get('/quotes', async (req, res) => {
    try {
        const quotes = await Quote.find();
        res.status(200).json(quotes);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// Rota para adicionar uma nova frase (POST)
app.post('/quotes', async (req, res) => {
    const { quote, character, movie } = req.body;

    if (!quote || !character || !movie) {
        return res.status(422).json({ msg: 'Preencha todos os campos' });
    }

    const newQuote = new Quote({ quote, character, movie });

    try {
        await newQuote.save();
        res.status(201).json({ msg: 'Frase adicionada com sucesso!' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// Rota para alterar uma frase (PUT)
app.put('/quotes/:id', async (req, res) => {
    const { text, character, movie } = req.body;

    if (!text || !character || !movie) {
        return res.status(422).json({ msg: 'Preencha todos os campos' });
    }

    const quote = await Quote.findByIdAndUpdate(req.params.id, {
        text,
        character,
        movie,
      });
      if (!req.params.id) {
        return res.status(404).send();
      }
      const resQuote = {
        id: quote._id,
        text: quote.text,
        character: quote.character,
        movie: quote.movie,
      };
      return res.send(resQuote);
});

// Rota para deletar uma frase (DELETE)
app.delete('/quotes/:id', async (req, res) => {
    checkToken(req, res)
    const { id } = req.params;

    try {
        const deletedQuote = await Quote.findByIdAndDelete(id);
        if (!deletedQuote) {
            return res.status(404).json({ msg: 'Frase não encontrada' });
        }
        res.status(200).json({ msg: 'Frase deletada com sucesso!' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// Rota para listar personagens (GET)
app.get('/character', async (req, res) => {
    try {
        const character = await Character.find();
        res.status(200).json(character);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// Rota para adicionar um novo personagem (POST)
app.post('/character', async (req, res) => {
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
});

// Rota para alterar um personagem (PUT)
app.put('/character/:id', async (req, res) => {
    const { name, house, movie } = req.body;

    if (!name || !house || !dob) {
        return res.status(422).json({ msg: 'Preencha todos os campos' });
    }

    const character = await Character.findByIdAndUpdate(req.params.id, {
        name,
        house,
        dob,
      });
      if (!req.params.id) {
        return res.status(404).send();
      }
      const resCharacter = {
        id: character._id,
        name: character.name,
        house: character.house,
        dob: character.dob,
      };
      return res.send(resCharacter);
});

// Rota para deletar um personagem (DELETE)
app.delete('/character/:id', async (req, res) => {
    checkToken(req, res)
    const { id } = req.params;

    try {
        const deletedCharacter = await Character.findByIdAndDelete(id);
        if (!deletedCharacter) {
            return res.status(404).json({ msg: 'Personagem não encontrado' });
        }
        res.status(200).json({ msg: 'Personagem deletado com sucesso!' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// Conexão com o banco de dados e inicialização do servidor
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.vqvcp.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(3001, () => console.log('Servidor rodando na porta 3001'));
    })
    .catch(err => console.error(err));
