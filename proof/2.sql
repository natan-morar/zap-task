SELECT users.email FROM users
JOIN purchases ON users.id = purchases.buyer
JOIN products ON purchases.product = products.id
WHERE products.title = 'iPhone 14';