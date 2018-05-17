DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price INT,
    stock_quantity int);
    
SELECT*FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone 8", "electronics", 800, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone X", "electronics", 1000, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPad Pro", "electronics", 700, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Macbook Pro", "electronics", 1400, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dell Monitor", "electronics", 300, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sony RX100", "electronics", 500, 35)
;
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone SE", "electronics", 350, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iMac", "electronics", 1500, 65);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("JBL Speaker", "electronics", 200, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone 7", "electronics", 550, 7);

UPDATE products SET stock_quantity = 25 WHERE item_id = 9;


UPDATE products SET stock_quantity = 25 WHERE item_id = 10;