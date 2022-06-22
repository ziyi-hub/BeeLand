CREATE TABLE admins (
    id INT PRIMARY KEY AUTO_INCREMENT,
    login VARCHAR(80) NOT NULL,
    password VARCHAR(255) NOT NULL,
    UNIQUE(login)
);

CREATE TABLE plants (
    id INT PRIMARY KEY AUTO_INCREMENT,
    latin_name VARCHAR(50) NOT NULL,
    french_name VARCHAR(50) NOT NULL,
    height VARCHAR(20),
    nectar INT NOT NULL,
    pollen INT NOT NULL,
    honeydew TINYINT(1) NOT NULL,
    flowering VARCHAR(80) NOT NULL,
    color VARCHAR(50) NOT NULL,
    location VARCHAR(80) NOT NULL,
    photo VARCHAR(80) NOT NULL
);