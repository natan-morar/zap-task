SELECT
        pu.id AS 'purchase id',
        pr.title AS 'product name',
        pu.count,
        email
FROM users u
         INNER JOIN purchases pu ON (u.id = pu.buyer)
         INNER JOIN products pr ON (pu.product = pr.id)
WHERE u.star = true;