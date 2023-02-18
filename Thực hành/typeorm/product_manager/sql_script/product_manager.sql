CREATE DATABASE `product_manager`;

use product_manager;

CREATE TABLE product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

SELECT * FROM product;

DROP DATABASE product_manager;