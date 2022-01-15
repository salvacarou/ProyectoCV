DROP DATABASE IF EXISTS notes_db;
CREATE DATABASE notes_db;
USE notes_db;

CREATE TABLE category(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
    
);

CREATE TABLE notes (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    image VARCHAR(1000) NOT NULL,
    text TEXT NOT NULL,
    deleted BIT(1) NOT NULL DEFAULT 0, --   verdadero 1, falso 0
    categoryId INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (categoryId) REFERENCES category(id)
);

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    fullName VARCHAR(30) NOT NULL,
    username VARCHAR(30) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    birthdate DATE NOT NULL,
    image VARCHAR(100) NOT NULL,
    password VARCHAR(150) NOT NULL,
    deleted BIT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE user_punct (
  id INT NOT NULL AUTO_INCREMENT,
  notesId INT NOT NULL,
  userId INT NOT NULL,
  number DECIMAL NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (notesId) REFERENCES notes(id),
  FOREIGN KEY (userId) REFERENCES users(id)
); 

CREATE TABLE note_user_fav(
  id INT NOT NULL AUTO_INCREMENT,
  notesId INT NOT NULL,
  userId INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (notesId) REFERENCES notes(id),
  FOREIGN KEY (userId) REFERENCES users(id)
); 


INSERT INTO category
VALUES
(default, "Polémico"),
(default, "Política"),
(default, "Deportes"),
(default, "Moda"),
(default, "Diseño"),
(default, "Ciencia"),
(default, "Fantástico"),
(default, "Lectura"),
(default, "Música"),
(default, "Redes"),
(default, "Otros");


INSERT INTO users(id, fullName, username, email, birthdate, image, password, deleted)
VALUES
(default,"Salvador Carou","salvi","salvadorcarou@gmail.com", "2200-02-20", "imagen.jpg", "zapato", 0),
(default,"Juana Carou","juani","juani@gmail.com", "1900-02-20", "imagenExtra.jpg", "zapatilla", 0);

INSERT INTO notes(id, name, image, text, deleted, categoryId)
VALUES
(default,"Remera Negra", "image-1634588336912.jpg", "Esta es solo una prueba para ver si anda esta porqueria", default, 1);

INSERT INTO user_punct(id, notesId, userId, number)
VALUES
(default, 1, 1, 5),
(default, 1, 2, 4);

INSERT INTO note_user_fav(id, notesId, userId)
VALUES
(default, 8, 2);
-- (default, 9, 1);

ALTER Table notes add userId INT NOT NULL


