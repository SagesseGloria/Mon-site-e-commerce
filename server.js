// Importation des modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Configuration de l'environnement
dotenv.config();

// Initialisation de l'application
const app = express();
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => console.error('Erreur de connexion :', err));

// Définition des schémas et modèles
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);

// Middleware d'authentification
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Accès non autorisé' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Token invalide' });
        req.user = decoded;
        next();
    });
};

// Routes
app.get('/', (req, res) => {
    res.send('Bienvenue sur l’API E-commerce');
});

app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l’inscription' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ error: 'Mot de passe incorrect' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
});

app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.post('/products', authMiddleware, async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const product = new Product({ name, price, description });
        await product.save();
        res.json({ message: 'Produit ajouté avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l’ajout du produit' });
    }
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
