create DATABASE `product_management`;

create table Product (
	id INT AUTO_INCREMENT PRIMARY KEY,
    price INT not null,
    name VARCHAR(50) not null,
    author VARCHAR(50) NOT NULL,
    avatar VARCHAR(50) NOT null
);

SELECT * from Product;