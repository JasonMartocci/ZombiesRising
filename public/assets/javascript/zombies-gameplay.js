Quintus.ZombiesGameplay = function(Q) {    
  //game level
  Q.Sprite.extend('Level', {
    init: function(p) {
        this._super(p, { 
          asset: '/assets/images/background.jpg',
          type: Q.SPRITE_GROUND,
          x: 90 + 1400/2,
          y: 768/2,
          w: 1400,
          h: 768,
          sunFrequency: {min: 3,max: 10}, //min and max number of seconds for sun to appear   
        });

        this.timeNextSun = this.getTimeNextSun(); //time for the next sun to appear

        //level data
        this.zombieIndex = 0; //current index from zombies array
        this.numZombies = this.p.levelData.zombies.length;
        this.levelTime = 0; //keep track of the level duration

        //save the position of each plant in a grid
        this.plantsGrid = new Array(new Array(7), new Array(7), new Array(7), new Array(7), new Array(7), new Array(7));

        this.on('touch');
        
        Q.audio.play('/assets/audio/ZombiesOnYourLawn.mp3');
    },
    step: function(dt) {
      //update level duration
      this.levelTime += dt;

      //check for level passed
      if(this.levelTime >= this.p.levelData.duration) {
        if(this.p.levelData.nextLevel) {

          var nextLevel = this.p.levelData.nextLevel;

          swal({
            title: 'LEVEL COMPLETED',
            text: "Do you wish to continue?",
            showCancelButton: true,
            html: '<img src="/assets/images/levelOne.png" alt="Level Complete">',
            confirmButtonColor: '#5CB85C',
            cancelButtonColor: '#d33',
            confirmButtonText: 'NEXT LEVEL',
            cancelButtonText: 'START OVER'
          }).then(function(isConfirm) {
            if (isConfirm) {
              Q.stageScene("level", {levelData: Q.assets[nextLevel]});
            }else{
              Q.stageScene('level', {levelData: Q.assets['/assets/data/level1.json']});
            }
          })

          Q.stage().pause();
          // Q.stage().unpause();
        }else {
          console.log('YOU WON!');
  
          swal({
            title: 'YOU WON!<br>All work and no play makes Homer a dull boy.',
            text: 'All work and no play makes Homer a dull boy',
            showCancelButton: false,
            html: '<img src="/assets/images/youWon.png" alt="You Won">',
            confirmButtonColor: '#5CB85C',
            cancelButtonColor: '#d33',
            confirmButtonText: 'PLAY AGAIN',
            cancelButtonText: 'No Thank You'
          }).then(function(isConfirm) {
            if (isConfirm) {
              Q.stageScene('level', {levelData: Q.assets['/assets/data/level1.json']});
            }else{
              Q.stageScene('level', {levelData: Q.assets['/assets/data/level1.json']});
            }
          })

          Q.stage().pause();
          // Q.stage().unpause();
        };
      }

      //create zombies at the defined times
      if(this.zombieIndex < this.numZombies) {
          
        var currentZombie = this.p.levelData.zombies[this.zombieIndex];
        if(this.levelTime >= currentZombie.time) {    
          var zombieData = Q.zombieTypes[currentZombie.type];     
          var newZombie = new Q.Zombie(
            Q._extend(zombieData, {y: currentZombie.row * 120 + 60})
          );                 
          this.stage.insert(newZombie);
          
          this.zombieIndex++;
        }
      }               

      //update sun generation timing
      this.timeNextSun -= dt;
      if(this.timeNextSun <= 0) {
        this.timeNextSun = this.getTimeNextSun();

        //create sun in the sun stage
        Q.stage(1).insert(new Q.Sun());
      }
    },
    touch: function(touch) {
      //if a plant is selected
      if(Q.state.get('currentPlant')) {
        //get plantsGrid coordinates
        var row = Math.floor((touch.y)/120);
        var col = Math.floor((touch.x - 240)/120);

        if(row >= 0 && row < this.plantsGrid.length && col >= 0 && col < this.plantsGrid[0].length) {
          if(!this.plantsGrid[row][col] && Q.state.get('sun') >= Q.state.get('currentPlant').cost) {
            Q.state.dec('sun', Q.state.get('currentPlant').cost);
            var newPlant = new Q.Plant(Q._extend({x: 240 + 60 + col*120, y: 60 + row*120}, Q.state.get('currentPlant')));
            this.stage.insert(newPlant);
            this.plantsGrid[row][col] = newPlant;
            newPlant.p.gridRow = row;
            newPlant.p.gridCol = col;
          }
        }
      }            
    },
    getTimeNextSun: function() {
      return this.p.sunFrequency.min + Math.random()*(this.p.sunFrequency.max - this.p.sunFrequency.min);
    },
  });
}