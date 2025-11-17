CREATE TABLE IF NOT EXISTS accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(24),
    `password` VARCHAR(24),

    session_token VARCHAR(255),
    session_created_at DATETIME,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);