USE base_track;

DELIMITER $$
DROP PROCEDURE IF EXISTS login$$
CREATE PROCEDURE login(
	IN p_email VARCHAR(250),
	IN p_password VARCHAR(250)
)
BEGIN
    SELECT email, id, name, type, company_id FROM `user`
    WHERE password = p_password AND email = p_email AND type=1;
END $$

DELIMITER $$
DROP PROCEDURE IF EXISTS update_user_password$$
CREATE PROCEDURE update_user_password(
    IN p_user_id INT,
    IN p_password VARCHAR(255)
)
BEGIN
    DECLARE user_id INT;

	-- If the email does not exist, insert the new user
	UPDATE `user` SET password = p_password
    WHERE id = p_user_id;
    
	SELECT p_user_id;
END $$

DELIMITER $$
DROP PROCEDURE IF EXISTS get_user_by_email$$
CREATE PROCEDURE get_user_by_email(
	IN p_email VARCHAR(250)
)
BEGIN
    SELECT email, id, name, type, company_id, password FROM `user` WHERE email = p_email;
END $$

DELIMITER $$
DROP PROCEDURE IF EXISTS get_user_by_id$$
CREATE PROCEDURE get_user_by_id(
    IN p_user_id INT
)
BEGIN
    SELECT 
        u.email, 
        u.id, 
        u.name, 
        u.type, 
        u.company_id, 
        c_i.url as company_logo
    FROM 
        `user` AS u
    LEFT JOIN 
        company AS c ON u.company_id = c.id
    LEFT JOIN 
        image AS c_i ON c_i.id = c.logo
    WHERE 
        u.id = p_user_id;
END $$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS create_refresh_token$$
CREATE PROCEDURE create_refresh_token(
    IN p_token VARCHAR(250),
    IN p_user INT
)
BEGIN
    -- Insert a new record into the refresh_token table
	INSERT INTO refresh_token (token, user_id) VALUES (p_token, p_user);
END $$

DELIMITER $$
DROP PROCEDURE IF EXISTS get_refresh_token$$
CREATE PROCEDURE get_refresh_token(
    IN p_token VARCHAR(512)
)
BEGIN
    SELECT * 
    FROM refresh_token 
    WHERE token = p_token;
END $$

DELIMITER $$
DROP PROCEDURE IF EXISTS delete_refresh_token$$
CREATE PROCEDURE delete_refresh_token(IN p_token varchar(255))
BEGIN
    -- Delete lote
    DELETE FROM refresh_token WHERE token = p_token;
END $$

DELIMITER $$
DROP PROCEDURE IF EXISTS delete_refresh_token_by_user$$
CREATE PROCEDURE delete_refresh_token_by_user(
    IN p_user_id INT
)
BEGIN
    DELETE FROM refresh_token 
    WHERE user_id = p_user_id;
END $$



