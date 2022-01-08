-- Въвеждаме данни
INSERT INTO nodejs_products.products
(title, category, sub_category)
VALUES
('12 rules for better life', 'books', 'psicology');

-- Селектиране на всички данни
SELECT *
FROM nodejs_products.products;

-- Селектиране и лимитиране на данни
SELECT *
FROM nodejs_products.products
LIMIT 3;

-- Селектиране на конкретни данни
SELECT *
FROM nodejs_products.products
WHERE id = 1;

-- Селектиране на конкретни данни
SELECT *
FROM nodejs_products.products;

-- изтриване на запис от таблица в база данни
DELETE 
FROM nodejs_products.products
WHERE id = 7;

-- изтриваме базирайки се на логика
DELETE 
FROM nodejs_products.products
WHERE id = 6 OR id = 5;

-- актуализация на данни
UPDATE nodejs_products.products
SET title = 'SONY'
WHERE id = 4