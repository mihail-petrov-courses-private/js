-- > Users
-- id
-- email
-- full_name
-- password
-- is_active DEFAULT 1 -- soft DELETE
CREATE TABLE td_users(
	id INT NOT NULL auto_increment primary key,
    email VARCHAR(256) NOT NULL,
    full_name VARCHAR(256) NOT NULL,
    password VARCHAR(256) NOT NULL,
    is_active tinyint(1) DEFAULT 1
);