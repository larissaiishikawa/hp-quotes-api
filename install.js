const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Character = require('./models/Character');
const Quote = require('./models/Quote');
const User = require('./models/User');
const bcrypt = require('bcrypt');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1);
});

const characters = [
    { name: 'Harry Potter', house: 'Gryffindor', dob: '1980-07-31' },
    { name: 'Hermione Granger', house: 'Gryffindor', dob: '1979-09-19' },
    { name: 'Ron Weasley', house: 'Gryffindor', dob: '1980-03-01' },
    { name: 'Draco Malfoy', house: 'Slytherin', dob: '1980-06-05' },
    { name: 'Luna Lovegood', house: 'Ravenclaw', dob: '1981-02-13' }
];

const quotes = [
    { text: 'It does not do to dwell on dreams and forget to live.', character: 'Albus Dumbledore', movie: 'Harry Potter and the Prisoner of Azkaban' },
    { text: 'I am what I am, an’ I’m not ashamed.', character: 'Hagrid', movie: 'Harry Potter and the Goblet of Fire' },
    { text: 'The last enemy that shall be destroyed is death.', character: 'Harry Potter', movie: 'Harry Potter and the Deathly Hallows' },
    { text: 'We are only as strong as we are united, as weak as we are divided.', character: 'Albus Dumbledore', movie: 'Harry Potter and the Goblet of Fire' },
    { text: 'To the well-organized mind, death is but the next great adventure.', character: 'Albus Dumbledore', movie: 'Harry Potter and the Sorcerer\'s Stone' }
];

const users = [
    { name: 'John Doe', email: 'john.doe@example.com', password: 'password123', isAdmin: false },
    { name: 'Jane Smith', email: 'jane.smith@example.com', password: 'password123', isAdmin: false },
    { name: 'Emily Johnson', email: 'emily.johnson@example.com', password: 'password123', isAdmin: false },
    { name: 'Admin One', email: 'admin.one@example.com', password: 'adminpassword', isAdmin: true },
    { name: 'Admin Two', email: 'admin.two@example.com', password: 'adminpassword', isAdmin: true }
];

const insertData = async () => {
    try {
        await Character.deleteMany({});
        await Quote.deleteMany({});
        await User.deleteMany({});

        const hashedUsers = await Promise.all(users.map(async (user) => {
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(user.password, salt);
            return { ...user, password: passwordHash };
        }));

        await Character.insertMany(characters);
        await Quote.insertMany(quotes);
        await User.insertMany(hashedUsers);

        console.log('Dados inseridos com sucesso!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Erro ao inserir dados:', error);
        mongoose.connection.close();
        process.exit(1);
    }
};

insertData();
