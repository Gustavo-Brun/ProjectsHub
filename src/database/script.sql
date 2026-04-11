CREATE DATABASE ProjectsHub;

USE ProjectsHub;

CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20) UNIQUE,
    password VARCHAR(20)
);
