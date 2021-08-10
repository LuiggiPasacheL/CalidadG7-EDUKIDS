CREATE database database_kids;
USE database_kids;
/*crear tablas para los usuarios*/
/*filas y columnas para cada usuario*/

CREATE TABLE users(
      id INT(11) NOT NULL, /*CADA usario tendra un id*/
      username VARCHAR(16) NOT NULL UNIQUE, /*cada usuario tendra un username de 16 carac. max*/
      password VARCHAR(60) NOT NULL,
      name VARCHAR(30) NOT NULL,
      surname VARCHAR(30) NOT NULL,
      email VARCHAR(50) NOT NULL,
      lvl INT(3) DEFAULT 1, /* nivel */
      exp INT(11) default 0, /* experiencia */
      stars INT(1),
      img VARCHAR(255) DEFAULT 'img/avatares/nivel_1/nivel1_2.png'
);

ALTER TABLE users
      ADD PRIMARY KEY (id); 

/*autoincrementable id = id + 1*/
ALTER TABLE users 
      MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE users;