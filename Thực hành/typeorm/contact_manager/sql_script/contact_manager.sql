CREATE DATABASE `contact_manager`;

use `contact_manager`;

CREATE TABLE Contact (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
    address VARCHAR(255) NOT null,
    email VARCHAR(50) NOT NULL,
    phone VARCHAR(12) NOT null
);