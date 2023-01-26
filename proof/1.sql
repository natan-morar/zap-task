SELECT 
	products.title,
    products.description,
    products.price
FROM products
WHERE title LIKE '%stone%';
