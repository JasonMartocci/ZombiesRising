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

CREATE TABLE heroes
(
  level varchar(255) NOT NULL,
  asset varchar(255) NOT NULL,
  cost varchar(255) NOT NULL,
  energy varchar(255) NOT NULL,
  isSunProducer booleen() NOT NULL,
  isShooter booleen() NOT NULL,
  isExploding booleen() NOT NULL,
  sunFrequency varchar(255) NOT NULL,
  shootingFrequency varchar(255) NOT NULL,
  damage varchar(255) NOT NULL,
  PRIMARY KEY (type)
);
