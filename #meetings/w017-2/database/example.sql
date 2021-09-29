-- Въвеждаме данни
INSERT INTO nodejs_products.products
(title, category, sub_category)
VALUES
('12 rules for better life', 'books', 'psicology');

-- Селектиране на всички данни
SELECT *
FROM nodejs_products.products;

-- Селектиране на конкретни данни
SELECT id
FROM nodejs_products.products;