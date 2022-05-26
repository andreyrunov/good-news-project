require('dotenv').config();
const express = require('express');

const app = express();
const morgan = require('morgan');
const hbs = require('hbs');
const path = require('path');
const catalogRouter = require('./routes/catalogRouter');
const { checkSession } = require('./middleWares/middleWare');
const profileRouter = require('./routes/profileRouter');
const cardRouter = require('./routes/cardRouter');

const PORT = process.env.DB_PORT ?? 3000;

const session = require('express-session');
const FileStore = require('session-file-store')(session);

const authRouter = require('./routes/authRouter');
const registerRouter = require('./routes/registerRouter');
const out = require('./routes/out');

app.use(session({
  name: 'sessionID',
  store: new FileStore({}),
  secret: process.env.SESSION,
  resave: true,
  maxAge: false, // false - значение по умолчанию, можно указать в миллисекундах
  saveUninitialized: false,
}));

app.set('view engine', 'hbs');
hbs.registerPartials(`${__dirname}/views/partials`);

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(process.env.PWD, 'public')));

app.use('/', authRouter);
app.use('/auth', authRouter);
app.use('/register', registerRouter);
app.use('/catalog', catalogRouter);
app.use('/profile', profileRouter);
app.use('/about', cardRouter);

app.use(checkSession);

app.use('/out', out);

app.listen(PORT, () => {
  console.log('Server start on port', PORT);
});
