const bcrypt = require('bcryptjs');
const helpers = {};

//definir 2 metodos
helpers.encryptPassword = async (password) =>{ //metodo para cifrar datos
   const salt = await bcrypt.genSalt(10); //generamos un patron para que empiece el cifrado
   const hash = await bcrypt.hash(password,salt); //pasamos los parametros para que sea cifrado
   return hash; //retorna la contra cifrado
};

helpers.matchPassword = async (password, savedPasword) => {//compara contrseñas
    try {
        return await  bcrypt.compare(password, savedPasword);
    } catch(e){
        console.log(e);
    }
}; 



module.exports = helpers; //exportarlo
