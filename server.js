require('dotenv').config();
const express = require('express');
const path = require('path');
const route = require('./routes');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const csrf = require('csurf');
const flash = require('connect-flash');

const {checkCsrfError, csrfMiddleware, globalMesseges} = require('./src/middlewares/middleware')
const app = express();
const port = 3000;

mongoose.connect(process.env.CONNECTIONSTRING)
.then(() => {
  app.emit('connReady');
  console.log('\n=== connection to database established ===\n');
})
.catch(e => console.log(e));

// APP RUNNING //

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

const sessionOptions = session({
  secret: 'secret tag token super secrett',
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
});
app.use(sessionOptions);
app.use(flash());

app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'html');

app.use(csrf());
// Nossos próprios middlewares
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(globalMesseges);

app.use(route);

app.on('connReady', () => {
  app.listen(port, () => {
    console.log(`\n=== server is running ===    =-port:${port}-=\n`);
  });
});