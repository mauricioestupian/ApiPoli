# api-rest-personas

script bases de datos:
create database db_personas;
use db_personas

CREATE TABLE persona (
id int NOT NULL AUTO_INCREMENT,
identificacion varchar(50) NOT NULL,
nombre varchar(50) NOT NULL,
apellido varchar(50) NOT NULL,
email varchar(100) NOT NULL,
telefono varchar(20) DEFAULT NULL,
direccion varchar(255) DEFAULT NULL,
PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4

\*\* Archivo .env:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=db_persona
DB_PORT=3306

instalar libreria mysql2 para node
https://www.npmjs.com/package/mysql2
