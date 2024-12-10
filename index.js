import express from 'express';
import mongoose from 'mongoose';
import router from './Router.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import YourModel from './models/YourModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_URL = ("mongodb+srv://dima:dhKL4cuokx2t7udo@cluster0.pdz8x.mongodb.net/volunteer_help?retryWrites=true&w=majority&appName=Cluster0");
const PORT = 8080;

const app = express();

// Налаштування сесій
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: DB_URL }),
    cookie: { secure: false }
}));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Налаштування шаблонізатора
const viewsPath = path.join(__dirname, 'views');
app.set('views', viewsPath);
app.set('view engine', 'ejs');

// Логування сесій
app.use((req, res, next) => {
    console.log('Session:', req.session);
    next();
});

// Використання маршрутизатора
app.use('/api', router);

// Рендеринг головної сторінки
app.get('/', (req, res) => {
    res.render('index', { title: 'Home Page' });
});

app.get('/login', (req, res) => {
    res.render('login', { title: 'Платформа для координації волонтерської допомоги * Landing Page' });
});

// Редагування документа
app.get('/edit/:id', async (req, res) => {
    const documentId = req.params.id;
    try {
        const document = await YourModel.findById(documentId);
        if (!document) {
            return res.status(404).send('Document not found');
        }
        res.render('edit', { document, collectionName: 'yourCollectionName' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Інші сторінки
app.get('/collections', (req, res) => {
    res.render('collections', { title: 'Collections Page' });
});

app.get('/unit', (req, res) => {
    res.render('unit', { title: 'Unit Page' });
});

app.get('/unitCasual', (req, res) => {
    res.render('unitCasual', { title: 'Unit Casual Page' });
});

// Підключення до MongoDB та запуск сервера
async function startApp() {
    try {
        await mongoose.connect(DB_URL);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

startApp();

export default DB_URL;