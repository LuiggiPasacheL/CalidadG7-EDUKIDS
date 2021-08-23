//importaciones de modulo
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const helpers = require('handlebars-helpers')();
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session');
const session = require('express-session');
const { database } = require('./keys');

const path = require('path');
//inicializaciones

const app = express();
require('./lib/passport');

//configuraciones
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: helpers
}));
app.set('view engine', '.hbs');

//middlewares
app.use(session({
  secret: 'faztmysqlnodesession',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database),
}));

app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//Valores Globales
app.use((req, res, next) => {
  app.locals.success = req.flash('success');
  app.locals.message = req.flash('message');
  app.locals.user = req.user;
  next();
});


//Rutas: 
app.use(require('./routes/index.js'));
app.use(require('./routes/authentication.js'));
app.use('/juegos', require('./routes/juegos.js'));
app.use('/videos', require('./routes/videos.js'));

//Public
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res, next) => {
  // res.render('agregar pagina para error 404.hbs'); 
  res.send('Pagina no encontrada: ERROR 404'); //si agregan pagina borrar esta linea <-
});

//Iniciar el server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
