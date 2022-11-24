SELECT u.email
FROM users u
         INNER JOIN purchases pu ON (u.id = pu.buyer)
         INNER JOIN products pr ON (pu.product = pr.id)
WHERE pr.title = 'iPhone 14';