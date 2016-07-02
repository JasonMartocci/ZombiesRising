Quintus.ZombiesHeroes = function(Q) {

  var newURL = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname;
  var pathArray = window.location.pathname.split( '/' );
  var secondLevelLocation = pathArray[0];
  var newUserId = "";
  for (i = 0; i < 1; i++) {
    newUserId += pathArray[2];
  };

  Q.plantTypes = {};

  if (newUserId === "undefined") {
    $.ajax({
      url: '/api/heroes/',
      method: 'get',
      success: function(data){
        for(var i = 0; i < data.heroes.length; i++) {
          var heroesData = data.heroes;
          var heroesTypes = heroesData[i]['plantTypes'];
          var heroesAssets = {
            'asset': 'http://s3.amazonaws.com/zombiesrising/' + heroesData[i].asset,
            'cost': heroesData[i].cost,
            'energy': heroesData[i].energy,
            'isShooter': heroesData[i].isShooter,
            'shootingFrequency': heroesData[i].shootingFrequency,
            'damage': heroesData[i].damage,
            'isExploding': heroesData[i].isExploding,
            'isSunProducer': heroesData[i].isSunProducer,
            'sunFrequency': heroesData[i].sunFrequency
          };
          Q.plantTypes[heroesTypes] = heroesAssets;
        }
      }
    });
  }else{
    $.ajax({
      url: '/api/heroes/' + newUserId,
      method: 'get',
      success: function(data){
        for(var i = 0; i < data.heroes.length; i++) {
          var heroesData = data.heroes;
          var heroesTypes = heroesData[i]['plantTypes'];
          var heroesAssets = {
            'asset': 'http://s3.amazonaws.com/zombiesrising/' + heroesData[i].asset,
            'cost': heroesData[i].cost,
            'energy': heroesData[i].energy,
            'isShooter': heroesData[i].isShooter,
            'shootingFrequency': heroesData[i].shootingFrequency,
            'damage': heroesData[i].damage,
            'isExploding': heroesData[i].isExploding,
            'isSunProducer': heroesData[i].isSunProducer,
            'sunFrequency': heroesData[i].sunFrequency
          };
          Q.plantTypes[heroesTypes] = heroesAssets;
        }
      }
    });
  };

  //plant
  Q.Sprite.extend('Plant', {
    init: function(p) {
      this._super(p, {
        type: Q.SPRITE_PLANT,
      });
      this.add('2d');  

      //init timer for shooters
      if(this.p.isShooter) {
        this.p.timeToShoot = this.p.shootingFrequency; 
      }

      //init timer for sun producers
      if(this.p.isSunProducer) {
        this.p.timeToSun = this.p.sunFrequency; 
      }
    },
    step: function(dt) {   
      //shooter plants
      if(this.p.isShooter) {
        this.p.timeToShoot -= dt; 

        if(this.p.timeToShoot <= 0) {
          this.p.timeToShoot = this.p.shootingFrequency; 

          //create new bullet
          this.stage.insert(new Q.Bullet({
            x: this.p.x,
            y: this.p.y,
            damage: this.p.damage
          }));
        }
      }

      //plants that produce sun
      if(this.p.isSunProducer) {
        this.p.timeToSun -= dt;

        if(this.p.timeToSun <= 0) {
          this.p.timeToSun = this.p.sunFrequency; 

          //create new sun and add to the sun stage
          Q.stage(1).insert(new Q.Sun({
            x: this.p.x -50 + 100*Math.random(),
            y: this.p.y,
            finalY: this.p.y,
            vy: 0
          }));
        }
      }

      //check for death
      if(this.p.energy <= 0) {
        this.destroy();
      }
    },  
    takeDamage: function(damage) {
      this.p.energy -= damage/50; 
    },
    destroy: function() {

      //clear grid
      Q("Level", 0).first().plantsGrid[this.p.gridRow][this.p.gridCol] = null;
      this._super();
    }
  });

  //sun
  Q.Sprite.extend('Sun', {
    init: function(p) {
      this._super(p, { 
        asset: '/assets/images/sun.png',
        type: Q.SPRITE_SUN,
        vy: 80,
        y: -120,
        x: 300 + Math.random()*(1080 - 360),  //initial x is random     
        finalY: 60 + Math.random()*(720 - 60), //final y
        expirationTime: 3 //time in seconds before it disappears           
      });
      this.add('2d');                         
      this.on('touch');
    },    
    step: function(dt) {
      //when it reaches it's final destination, stop velocity in y
      if(this.p.y >= this.p.finalY) {
        this.p.vy = 0;

        //when reaches the end start counting time
        this.p.expirationTime -= dt;

        if(this.p.expirationTime <= 0) {
          this.destroy();
        }
      }                        
    },    
    touch: function(touch) {
      Q.state.inc('sun', 25);  
      Q.audio.play('/assets/audio/Homer_Mmmm_donuts.mp3');
      this.destroy();
    }
  });

  //Bullets
  Q.Sprite.extend('Bullet', {
    init: function(p) {
      this._super(p, {
        type: Q.SPRITE_BULLET,
        asset: '/assets/images/bullet.png',
        vx: 300
      });
      this.add('2d');  
    },
    step: function(dt) {
      //destroy if out of range
      if(this.p.x >= 1317) {
        this.destroy();
      }
    }
  });
};