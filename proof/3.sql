SELECT 
	purchases.id AS 'purchase id',
    products.title AS 'product name',
    purchases.count,
    users.email AS 'buyer email'
FROM purchases
JOIN users ON purchases.buyer = users.id
JOIN products ON purchases.product = products.id
WHERE users.star;