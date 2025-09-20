USE base_track;

DELIMITER $$
-- Get get_company by id
DROP PROCEDURE IF EXISTS get_company$$
CREATE PROCEDURE get_company( IN p_company_id INT )
BEGIN
    SELECT
		c.name,
        c.identifier,
        c.address,
        c.description,
        c.email,
        c.telephone,
        i.url as logo
    FROM 
		company as c
	LEFT JOIN
		image as i ON i.id = c.logo
    WHERE 
		c.id = p_company_id;
END$$
DELIMITER $$