Quintus.ZombiesEnemies = function(Q) {
  //types of zombies
  Q.zombieTypes = {
    levelOne: {
      asset: '/assets/images/zombie1.png', //image file 
      damage: 0.5, //how much damage it causes     
      vx: -20, //speed
      energy: 3, //how much damage it can take
    },
    levelTwo: {
      asset: '/assets/images/zombie2.png',        
      damage: 1,            
      vx: -8,
      energy: 10,
    },
    levelThree: {
      asset: '/assets/images/zombie3.png', 
      damage: 1.25,   
      vx: -10,
      energy: 10,
    },
    levelFour: {
      asset: '/assets/images/zombie4.png', 
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
        console.log('The zombies ate your brain!'); 
        Q.stageScene("endGame",1, { label: "The zombies ate your brain!" });

        Q.scene('endGame',function(stage) {
          var container = stage.insert(new Q.UI.Container({
            x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
          }));

          var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
                                                          label: "Play Again" }))         
          var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h, fill: "#FFFFFF", 
                                                           label: stage.options.label }));
          button.on("click",function() {
            Q.clearStages();
            Q.stageScene('level', {levelData: Q.assets['/assets/data/level1.json']});
          });
          container.fit(20);
        });                        
        Q.stageScene('level', {levelData: Q('Level').items[0].p.levelData});           
      }
      //check for death
      if(this.p.energy <= 0) {
        this.destroy();
      }
    }
  });
};