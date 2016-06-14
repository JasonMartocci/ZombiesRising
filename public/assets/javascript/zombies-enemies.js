Quintus.ZombiesEnemies = function(Q) {
  $.ajax({
    url: '/api/enemies',
    method: 'get',
    success: function(data){
      // console.log(data);
    }
  });
  //types of zombies
  Q.zombieTypes = {
    zombieOne: {
      asset: '/assets/images/zombieOne.png', //image file 
      damage: 0.5, //how much damage it causes     
      vx: -20, //speed
      energy: 3, //how much damage it can take
    },
    zombieTwo: {
      asset: '/assets/images/zombieTwo.png',        
      damage: 1,            
      vx: -8,
      energy: 10,
    },
    zombieThree: {
      asset: '/assets/images/zombieThree.png', 
      damage: 1.25,   
      vx: -10,
      energy: 10,
    },
    zombieFour: {
      asset: '/assets/images/zombieFour.png', 
      damage: 1.5,    
      vx: -9,
      energy: 35,
    },
  };
  
  //zombie
  Q.Sprite.extend('Zombie', {
    init: function(p) {
      this._super(p, { 
          type: Q.SPRITE_ZOMBIE,
          collisionMask: Q.SPRITE_PLANT | Q.SPRITE_BULLET,
          x: 1223,
          // x: $(window).width()+30,
      });
      this.add('2d');

      this.p.originalVx = this.p.vx;

      this.on("bump.left",function(collision) {

        if(collision.obj.isA('Plant')) {
          //if exploding plant, take damage and destroy plant, otherwise just damage plant
          if(collision.obj.p.isExploding) {
            this.p.energy -= collision.obj.p.damage;
            Q.audio.play('/assets/audio/boom.mp3');
            collision.obj.destroy();
          }
          else {
            collision.obj.takeDamage(this.p.damage);
          }                    
        }
        else if(collision.obj.isA('Bullet')) {
          this.p.energy -= collision.obj.p.damage;
          Q.audio.play('/assets/audio/hit.mp3');
          collision.obj.destroy();
        }            
        this.p.vx = this.p.originalVx;
      });
    },
    step: function(dt) {
      if(this.p.x <= 240) {
        this.destroy();
        // console.log('The Zombies ate your brains!'); 

        swal({
          title: 'The Zombies Ate Your Brains!',
          html: '<img src="/assets/images/brains.png" alt="BRAINS">',
          showCancelButton: false,
          confirmButtonColor: '#5CB85C',
          cancelButtonColor: '#d33',
          confirmButtonText: 'RETRY',
          cancelButtonText: 'No Thank You'
        }).then(function(isConfirm) {
          if (isConfirm) {
            Q.stageScene('level', {levelData: Q.assets['/assets/data/level1.json']});
          }else{
            Q.stageScene('level', {levelData: Q.assets['/assets/data/level1.json']});
          }
        })  
        Q.stage().pause();             
      }
      //check for death
      if(this.p.energy <= 0) {
        this.destroy();
      }
    }
  });
};