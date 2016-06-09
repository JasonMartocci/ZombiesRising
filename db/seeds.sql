INSERT INTO  users (emailAddress,userName,password,name,role) VALUES ('test@test.com','k27goat','q1w2e3r4','Jason','admin');

INSERT INTO  users (emailAddress,userName,password,name,role) VALUES ('test2@test2.com','k27goat2','q1w2e3r42','Jason2','admin');

INSERT INTO  enemies (zombieTypes, asset, damage, vx, energy) VALUES ('levelOne','/assets/images/zombie1.png','0.5','-20','3');

INSERT INTO  enemies (zombieTypes, asset, damage, vx, energy) VALUES ('levelTwo','/assets/images/zombie2.png','1','-8','10');

INSERT INTO  enemies (zombieTypes, asset, damage, vx, energy) VALUES ('levelThree','/assets/images/zombie3.png','1.25','-10','10');

INSERT INTO  enemies (zombieTypes, asset, damage, vx, energy) VALUES ('levelFour','/assets/images/zombie4.png','1.5','-9','35');

INSERT INTO  heroes (plantTypes, asset, cost, energy, isSunProducer, isShooter, isExploding, sunFrequency, shootingFrequency, damage) VALUES ('levelOneShooter','/assets/images/levelOneShooter.png','100','10',false,true,false,'0','2','2');

INSERT INTO  heroes (plantTypes, asset, cost, energy, isSunProducer, isShooter, isExploding, sunFrequency, shootingFrequency, damage) VALUES ('levelTwoShooter','/assets/images/levelTwoShooter.png','150','20',false,true,false,'0','5','3');

INSERT INTO  heroes (plantTypes, asset, cost, energy, isSunProducer, isShooter, isExploding, sunFrequency, shootingFrequency, damage) VALUES ('levelOneBomber','/assets/images/levelOneBomber.png','50','10',false,false,true,'0','0','50');

INSERT INTO  heroes (plantTypes, asset, cost, energy, isSunProducer, isShooter, isExploding, sunFrequency, shootingFrequency, damage) VALUES ('levelOneEnergy','/assets/images/levelOneEnergy.png','75','15',true,false,false,'8','0','0');