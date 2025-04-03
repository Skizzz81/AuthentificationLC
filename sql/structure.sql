DROP DATABASE IF EXISTS AuthentificationLC;
CREATE DATABASE AuthentificationLC ;
use AuthentificationLC; 

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);



CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INT NOT NULL DEFAULT 2,
    CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);


INSERT INTO roles (role_name) VALUES ('admin'), ('guest');
INSERT INTO user (name, password, role_id) VALUES ('admin', '$2b$10$HiMvnkuNGAypgsHSo49n.ecN/MhTfjVIyNvRCtVVacW1M4lcqL8Q6', 1);
INSERT INTO user (name, password, role_id) VALUES ('guest', '$2b$10$53uiA5xF90DdNGjGGDYI2ufZkt1k48BTKAB7.EzaoU6hotxIM8Tpm', 2);