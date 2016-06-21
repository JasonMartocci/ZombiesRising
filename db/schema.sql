-- Schema - Structure of Zombies Rising

CREATE TABLE users
(
  userId int NOT NULL AUTO_INCREMENT,
  emailAddress varchar(255) NOT NULL,
  userName varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  name varchar(255) NOT NULL,
  role varchar(255) NOT NULL,
  date TIMESTAMP,
  PRIMARY KEY (userId)
);

CREATE TABLE enemies
(
  enemiesId int NOT NULL AUTO_INCREMENT,
  zombieTypes varchar(255) NOT NULL,
  asset varchar(255) NOT NULL,
  damage int NOT NULL,
  vx int NOT NULL,
  energy int NOT NULL,
  userId int,
  PRIMARY KEY (enemiesId),
  FOREIGN KEY (userId) REFERENCES users(userId)
);

CREATE TABLE heroes
(
  heroesId int NOT NULL AUTO_INCREMENT,
  plantTypes varchar(255) NOT NULL,
  asset varchar(255) NOT NULL,
  cost int NOT NULL,
  energy int NOT NULL,
  isSunProducer boolean NOT NULL,
  isShooter boolean NOT NULL,
  isExploding boolean NOT NULL,
  sunFrequency int NOT NULL,
  shootingFrequency int NOT NULL,
  damage int NOT NULL,
  userId int,
  PRIMARY KEY (heroesId),
  FOREIGN KEY (userId) REFERENCES users(userId)
);