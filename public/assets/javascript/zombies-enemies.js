Quintus.ZombiesEnemies = function(Q) {

  Q.zombieTypes = {};

  // $.ajax({
  //   url: '/api/enemies/',
  //   method: 'get',
  //   success: function(data){
  //     for(var i = 0; i < data.enemies.length; i++) {
  //       var enemiesData = data.enemies;
  //       var enemiesTypes = enemiesData[i]['zombieTypes'];
  //       var enemiesAssets = {
  //         'asset': 'http://s3.amazonaws.com/zombiesrising/' + enemiesData[i].asset,
  //         'damage': enemiesData[i].damage,
  //         'vx': enemiesData[i].vx,
  //         'energy': enemiesData[i].energy
  //       };
  //       Q.zombieTypes[enemiesTypes] = enemiesAssets;
  //     }
  //   }
  // });  

  $.ajax({
    url: '/api/enemies/:userId',
    method: 'get',
    success: function(data){
      for(var i = 0; i < data.enemies.length; i++) {
        var enemiesData = data.enemies;
        var enemiesTypes = enemiesData[i]['zombieTypes'];
        var enemiesAssets = {
          'asset': 'http://s3.amazonaws.com/zombiesrising/' + enemiesData[i].asset,
          'damage': enemiesData[i].damage,
          'vx': enemiesData[i].vx,
          'energy': enemiesData[i].energy
        };
        Q.zombieTypes[enemiesTypes] = enemiesAssets;
      }
    }
  });
  
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

      Q.audio.play('/assets/audio/brainzzz.mp3');
      
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