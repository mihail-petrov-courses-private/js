CREATE TABLE td_comments (
	id INT NOT NULL auto_increment primary key,
    content TEXT,
    card_id INT,
    user_id INT,
    board_id INT
)
