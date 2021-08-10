const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');//conexion a la base de datos
const helpers = require('../lib/helpers'); //importar el modulo helpers

//crear autenticaciones

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    //console.log(req.body);
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if (validPassword) {
            done(null, user, req.flash());
        } else {
            done(null, false, req.flash('message', 'Contraseña Incorrecta :('));
        }
    } else {
        return done(null, false, req.flash('message', 'El nombre de usuario no existe'));
    }
}));

passport.use('local.signup', new LocalStrategy({ //colocamos lo que queremos recibir del signup
    usernameField: 'username', //de donde recibimos el dato del usuario
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { fullname } = req.body; // traemos al fullname para cada usuario
    const newUser = {//definimos a un nuevo usuario
        username: req.body.username,
        password: req.body.password,
        name: req.body.fullname,
        surname: req.body.fullname2,
        email: req.body.email,
    };
    newUser.password = await helpers.encryptPassword(newUser.password); // contraseña cifrada
    const result = await pool.query('INSERT INTO users SET ?', [newUser]); //insertar al nuevo usario en la tabla en la base de datos
    newUser.id = result.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id); //guardo el ID del usuario
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM users Where id = ?', [id]);
    done(null, rows[0]);
});

