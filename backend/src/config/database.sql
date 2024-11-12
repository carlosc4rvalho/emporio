create database emporio_maziero;
use emporio_maziero;

-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

-- Tabela de Categorias
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Tabela de Grupos de Subcategorias
CREATE TABLE IF NOT EXISTS subcategory_groups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Tabela de Subcategorias
CREATE TABLE IF NOT EXISTS subcategories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    name VARCHAR(255) NOT NULL,
    group_type_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    FOREIGN KEY (group_type_id) REFERENCES subcategory_groups(id) ON DELETE CASCADE
);

-- Tabela de Produtos
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    promotional_price DECIMAL(10, 2),
    quantity INT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    deleted_at TIMESTAMP NULL
);

-- Tabela de Imagens de Produtos
CREATE TABLE IF NOT EXISTS product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Tabela de Associação Produto-Subcategoria
CREATE TABLE IF NOT EXISTS product_subcategories (
    product_id INT NOT NULL,
    subcategory_id INT NOT NULL,
    PRIMARY KEY (product_id, subcategory_id),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (subcategory_id) REFERENCES subcategories(id) ON DELETE CASCADE
);

-- Inserção de Categorias
INSERT INTO categories (name) VALUES
('Vinhos'),
('Cervejas'),
('Queijos'),
('Chocolates');

-- Inserção de Grupos de Subcategorias
INSERT INTO subcategory_groups (name) VALUES
('Tipos'),
('Países'),
('Região'),
('Harmonização');

-- Inserção de Subcategorias
INSERT INTO subcategories (name, category_id, group_type_id) VALUES
-- Tipos
('Vinho Tinto', (SELECT id FROM categories WHERE name = 'Vinhos'), (SELECT id FROM subcategory_groups WHERE name = 'Tipos')),
('Vinho Branco', (SELECT id FROM categories WHERE name = 'Vinhos'), (SELECT id FROM subcategory_groups WHERE name = 'Tipos')),
('Espumante', (SELECT id FROM categories WHERE name = 'Vinhos'), (SELECT id FROM subcategory_groups WHERE name = 'Tipos')),
('Vinho Rosé', (SELECT id FROM categories WHERE name = 'Vinhos'), (SELECT id FROM subcategory_groups WHERE name = 'Tipos')),
('Vinho Fortificado', (SELECT id FROM categories WHERE name = 'Vinhos'), (SELECT id FROM subcategory_groups WHERE name = 'Tipos')),

-- Países
('Espanha', (SELECT id FROM categories WHERE name = 'Vinhos'), (SELECT id FROM subcategory_groups WHERE name = 'Países')),
('Chile', (SELECT id FROM categories WHERE name = 'Vinhos'), (SELECT id FROM subcategory_groups WHERE name = 'Países')),
('Argentina', (SELECT id FROM categories WHERE name = 'Vinhos'), (SELECT id FROM subcategory_groups WHERE name = 'Países')),
('Brasil', (SELECT id FROM categories WHERE name = 'Vinhos'), (SELECT id FROM subcategory_groups WHERE name = 'Países')),
('Itália', (SELECT id FROM categories WHERE name = 'Vinhos'), (SELECT id FROM subcategory_groups WHERE name = 'Países')),

-- Regiões
('Abruzzo', (SELECT id FROM categories WHERE name = 'Vinhos'), (SELECT id FROM subcategory_groups WHERE name = 'Região')),
('Bordeaux', (SELECT id FROM categories WHERE name = 'Vinhos'), (SELECT id FROM subcategory_groups WHERE name = 'Região')),
('Champagne', (SELECT id FROM categories WHERE name = 'Vinhos'), (SELECT id FROM subcategory_groups WHERE name = 'Região')),
('Mendoza', (SELECT id FROM categories WHERE name = 'Vinhos'), (SELECT id FROM subcategory_groups WHERE name = 'Região')),

-- Harmonização
('Queijos', (SELECT id FROM categories WHERE name = 'Vinhos'), (SELECT id FROM subcategory_groups WHERE name = 'Harmonização')),
('Carnes Vermelhas', (SELECT id FROM categories WHERE name = 'Vinhos'), (SELECT id FROM subcategory_groups WHERE name = 'Harmonização')),
('Frutos do Mar', (SELECT id FROM categories WHERE name = 'Vinhos'), (SELECT id FROM subcategory_groups WHERE name = 'Harmonização')),
('Sobremesas', (SELECT id FROM categories WHERE name = 'Vinhos'), (SELECT id FROM subcategory_groups WHERE name = 'Harmonização'));