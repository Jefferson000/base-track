USE base_track;
-- Set default

-- Set autoincrement to 1
-- ALTER TABLE table_name AUTO_INCREMENT = 1;


-- DANGER Set autoincrement to 1
ALTER TABLE image AUTO_INCREMENT = 1;
ALTER TABLE company AUTO_INCREMENT = 1;

-- DELETE stuff
DELETE FROM table_name WHERE id> 0;

-- DELETE DANGER
DELETE FROM image WHERE id > 0;
DELETE FROM user WHERE id > 0;
DELETE FROM company WHERE id > 0;

-- SELECT
SELECT * FROM refresh_token;
SELECT * FROM user;
SELECT * FROM image;