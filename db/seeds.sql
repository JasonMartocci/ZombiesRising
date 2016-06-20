INSERT INTO  users (emailAddress,userName,password,name,role) VALUES ('test@test.com','k27goat','q1w2e3r4','Jason','admin');

INSERT INTO  users (emailAddress,userName,password,name,role) VALUES ('test2@test2.com','k27goat2','q1w2e3r42','Jason2','user');

INSERT INTO  enemies (zombieTypes, asset, damage, vx, energy, userId) VALUES ('levelOne','/assets/images/zombieOne.png','0.5','-20','3','1');

INSERT INTO  enemies (zombieTypes, asset, damage, vx, energy, userId) VALUES ('levelTwo','/assets/images/zombieTwo.png','1','-8','10','1');

INSERT INTO  enemies (zombieTypes, asset, damage, vx, energy, userId) VALUES ('levelThree','/assets/images/zombieThree.png','1.25','-10','10','1');

INSERT INTO  enemies (zombieTypes, asset, damage, vx, energy, userId) VALUES ('levelFour','/assets/images/zombieFour.png','1.5','-9','35','1');

INSERT INTO  heroes (plantTypes, asset, cost, energy, isSunProducer, isShooter, isExploding, sunFrequency, shootingFrequency, damage, userId) VALUES ('shooterOne','/assets/images/shooterOne.png','100','10',false,true,false,'0','2','2','1');

INSERT INTO  heroes (plantTypes, asset, cost, energy, isSunProducer, isShooter, isExploding, sunFrequency, shootingFrequency, damage, userId) VALUES ('shooterTwo','/assets/images/shooterTwo.png','150','20',false,true,false,'0','5','3','1');

INSERT INTO  heroes (plantTypes, asset, cost, energy, isSunProducer, isShooter, isExploding, sunFrequency, shootingFrequency, damage, userId) VALUES ('bomberOne','/assets/images/bomberOne.png','50','10',false,false,true,'0','0','50','1');

INSERT INTO  heroes (plantTypes, asset, cost, energy, isSunProducer, isShooter, isExploding, sunFrequency, shootingFrequency, damage, userId) VALUES ('energyOne','/assets/images/energyOne.png','75','15',true,false,false,'8','0','0','1');