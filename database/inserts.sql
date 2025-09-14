USE base_track;

INSERT INTO company(id, name, identifier, address, description, email, telephone, logo) VALUES
(1, 'Test company', '208050236', 'Mi casa', 'No tengo descripción', 'jefersontorres000@gmail.com', '8410-6388', 1);

INSERT INTO image (id, url, company_id) VALUES (1,'/v1739653213/company/1/fftcbolpuc7lyvwfjley.jpg', 1);
-- INSERT INTO image (id, url, company_id) VALUES (2, '/v1739653213/company/2/r17guvohcphwxpyr0trg', 2);
UPDATE company SET logo = 1 WHERE id=1;
-- UPDATE company SET logo = 2 WHERE id=2;

INSERT INTO user (name, email, password, company_id, type) VALUES('Jefferson Torrres', 'jefersontorres000@gmail.com', '$2b$10$QQdsGAcdVIXvCQez9VxPs.80AcuKwRk5M5gqErPurdLC6qnBtYSRG', 1, 1);

-- INSERT INTO user (name, email, password, company_id, type) VALUES('María José Córdoba', 'info@caisacr.org', '$2b$10$QQdsGAcdVIXvCQez9VxPs.80AcuKwRk5M5gqErPurdLC6qnBtYSRG', 2, 1);

