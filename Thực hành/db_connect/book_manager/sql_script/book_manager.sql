CREATE DATABASE `book_manager`;

use book_manager;

CREATE TABLE books (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  price FLOAT(10,2) NOT NULL,
  status VARCHAR(20) NOT NULL,
  author VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

SELECT * from books;