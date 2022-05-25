require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const hbs = require('hbs');
const path = require('path');
const PORT = process.env.DB_PORT ?? 3000;

const session = require('express-session');
const FileStore = require('session-file-store')(session);

app.use(session({
  name: 'sessionID',
  store: new FileStore({}),
  secret: process.env.SESSION,
  resave: true,
  maxAge: false // false - значение по умолчанию, можно указать в миллисекундах
  saveUninitialized: true,
}))

app.set('view engine', 'hbs');
hbs.registerPartials(`${__dirname}/views/partials`);

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(process.env.PWD, 'public')));

app.listen(PORT, () => {
console.log('Server start on port', PORT);
});
