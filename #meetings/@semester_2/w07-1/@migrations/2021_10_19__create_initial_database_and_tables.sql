-- Create database
CREATE DATABASE mrello_db;

-- SELECT DATABASE
USE mrello_db;


-- #Create Tables 
-- ============================================
-- > Workspace
-- + title
-- + overview
-- + type
-- + owner_id

CREATE TABLE td_workspaces (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(256) NOT NULL,
    overview VARCHAR(512) NOT NULL,
    category VARCHAR(256) NOT NULL,
    owner_id INT NOT NULL
);

-- > Boards
-- id
-- title
-- visibility
-- theme 
-- workspace_id
CREATE TABLE td_boards(
	id INT NOT NULL auto_increment primary key,
    title VARCHAR(256) NOT NULL,
    visibility VARCHAR(256),
    theme VARCHAR(256),
    workspace_id INT NOT NULL
);

-- > List
-- id
-- title
-- board_id
CREATE TABLE td_lists(
	id INT NOT NULL auto_increment primary key,
    title VARCHAR(256) NOT NULL,
    board_id INT NOT NULL
);

-- > Card
-- id
-- title
-- overview
-- list_id
CREATE TABLE td_cards(
	id INT NOT NULL auto_increment primary key,
    title VARCHAR(256),
    overview VARCHAR(512),
    list_id INT NOT NULL
);