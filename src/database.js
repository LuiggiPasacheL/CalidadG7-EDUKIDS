const mysql = require ('mysql');
const {database} = require('./keys');
const {promisify} = require('util');
const pool = mysql.createPool(database);

pool.getConnection((err, connection)=>{ //para no llamar a cada momento que ejecute el codigo y cuando se conecte tendra una salida error o coneccion
   if (err){ //definir y validamos 3 posibles errores
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('LA CONEXION CON LA BASE DE DATOS FUE CERRADA :('); //aparecera en consola
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('LA BASE DE DATOS TIENE MUCHAS CONEXIONES :('); //aparecera en consola
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('LA CONEXION CON LA BASE DE DATOS FUE RECHAZADA :('); //aparecera en consola
        }
   }
   if(connection) connection.release(); // empezara la conexión
     console.log('Base de datos está conectada Bv');
     return;
});

//promisify pool querys
pool.query = promisify(pool.query);

//exportamos pool para hacer las consultas de conexion
module.exports = pool;
