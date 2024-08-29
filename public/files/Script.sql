-- Criação do schema, se não existir
CREATE SCHEMA IF NOT EXISTS projind2564149 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- Criação da tabela de usuários
CREATE TABLE IF NOT EXISTS projind2564149.`user` (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(191) DEFAULT NULL,
  pass VARCHAR(191) DEFAULT NULL,
  email VARCHAR(191) DEFAULT NULL,
  isAdmin TINYINT(1) DEFAULT '0',
  PRIMARY KEY (id),
  UNIQUE INDEX User_email_key (email)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Criação da tabela de produtos
CREATE TABLE IF NOT EXISTS projind2564149.`product` (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(191) NOT NULL,
  price DOUBLE NOT NULL,
  userId INT NOT NULL,
  PRIMARY KEY (id),
  INDEX Product_userId_fkey (userId),
  CONSTRAINT Product_userId_fkey FOREIGN KEY (userId) REFERENCES projind2564149.`user` (id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Criação da tabela de pedidos
CREATE TABLE IF NOT EXISTS projind2564149.`order` (
  id INT NOT NULL AUTO_INCREMENT,
  quantity INT NOT NULL,
  productId INT NOT NULL,
  userId INT NOT NULL,
  PRIMARY KEY (id),
  INDEX Order_userId_fkey (userId),
  CONSTRAINT Order_productId_fkey FOREIGN KEY (productId) REFERENCES projind2564149.`product` (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT Order_userId_fkey FOREIGN KEY (userId) REFERENCES projind2564149.`user` (id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Inserção de usuários
INSERT INTO projind2564149.`user` (name, pass, email, isAdmin) VALUES
('Alice Johnson', 'password123', 'alice.johnson@example.com', 0),
('Bob Smith', 'password123', 'bob.smith@example.com', 0),
('Charlie Brown', 'password123', 'charlie.brown@example.com', 0),
('Diana Prince', 'password123', 'diana.prince@example.com', 0),
('Edward Cullen', 'password123', 'edward.cullen@example.com', 0),
('Fiona Glenanne', 'password123', 'fiona.glenanne@example.com', 0),
('George Washington', 'password123', 'george.washington@example.com', 0),
('Hannah Montana', 'password123', 'hannah.montana@example.com', 0),
('Irene Adler', 'password123', 'irene.adler@example.com', 0),
('Jack Sparrow', 'password123', 'jack.sparrow@example.com', 0);

-- Inserção de produtos
INSERT INTO projind2564149.`product` (name, price, userId) VALUES
('Laptop', 899.99, 1),
('Smartphone', 499.99, 2),
('Headphones', 79.99, 3),
('Monitor', 199.99, 4),
('Keyboard', 49.99, 5),
('Mouse', 29.99, 6),
('Desk Chair', 159.99, 7),
('Webcam', 89.99, 8),
('Printer', 129.99, 9),
('External Hard Drive', 119.99, 10);

-- Inserção de pedidos
INSERT INTO projind2564149.`order` (quantity, productId, userId) VALUES
(2, 1, 1),
(1, 2, 2),
(3, 3, 3),
(1, 4, 4),
(5, 5, 5),
(2, 6, 6),
(1, 7, 7),
(4, 8, 8),
(3, 9, 9),
(2, 10, 10);
