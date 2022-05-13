CREATE DATABASE todo_app;

USE todo_app;

CREATE TABLE td_tasks(
	id INT NOT NULL AUTO_INCREMENT primary KEY,
	content VARCHAR(256) NOT NULL,
    status INT,
    priority INT
);


CREATE TABLE td_lists(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(256) NOT NULL,
    type INT NULL
);

INSERT INTO td_lists(title, type) 
VALUES	('List 1', 1),
		('List 2', 1),
		('List 3', 1),
		('List 4', 1);

SELECT * FROM td_lists;

CREATE TABLE tm_list__task(
	list_id INT,
    task_id INT,
    primary key(list_id, task_id)
);
