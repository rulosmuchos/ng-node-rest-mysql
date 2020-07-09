ALTER TABLE products ADD status varchar(255);
UPDATE table
SET column1 = expression1,
    column2 = expression2,
    ...
[WHERE conditions];



UPDATE products
SET status = "trash",
    column2 = expression2,
    ...
[WHERE conditions];


UPDATE products SET status = "trash" WHERE ID = ?;