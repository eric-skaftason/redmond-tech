CREATE TABLE IF NOT EXISTS file_permissions (
    file_id INT NOT NULL,
    user_id INT NOT NULL,
    access ENUM('owner', 'admin', 'rw', 'r') NOT NULL,

    PRIMARY KEY (file_id, user_id), -- ensures that file id & user id are unique ie. can't have duplicate users on one file
    FOREIGN KEY (file_id) REFERENCES files(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
