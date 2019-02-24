CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
	item_id INTEGER(50) auto_increment,
	product_name VARCHAR(200) NOT NULL, 
	department_name VARCHAR(100) NULL, 
	price DECIMAL (10,2),
	stock_quantity INT NOT NULL, 
	PRIMARY KEY (item_id)
);

insert into products (item_id, product_name, department_name, price, stock_quantity)
values 
(01, "iPhone X", "Electronics", 899.99, 10),
(02, "Electric Piano", "Music", 89.99, 50),
(03, "Comforter", "Home", 40.00, 25),
(04, "Nintendo Switch", "Gaming", 299.99, 50),
(05, "Becoming Book", "Books", 11.26, 65),
(06, "Monthly Planner", "Stationary", 4.99, 100),
(07, "Playstation 4", "Gaming", 299.98, 25),
(08, "Computer Desk", "Home", 129.99, 100),
(09, "Wall Mirror", "Home", 49.00, 60),
(10, "Soundbar", "Electronics", 79.99, 50);
