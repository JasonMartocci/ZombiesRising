Quintus.ZombiesGameplay = function(Q) {
    
  //game level
  Q.Sprite.extend('Level', {
    init: function(p) {
        this._super(p, { 
          asset: '/assets/images/background.png',
          type: Q.SPRITE_GROUND,
          x: 90 + 1024/2,
          y: 768/2,
          w: 1024,
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
        // Q.audio.play('/assets/audio/ZombiesOnYourLawn.mp3');
    },
    step: function(dt) {
      //update level duration
      this.levelTime += dt;

      //check for level passed
      if(this.p.levelData.duration < this.levelTime) {
        if(this.p.levelData.nextLevel) {
          Q.stageScene("level", {levelData: Q.assets[this.p.levelData.nextLevel]});
          // Q.stage().pause();
          // Q.stage().unpause();
          // nextLevel();
        }else {
          endGame();
          // Q.stageScene('level', {levelData: Q.assets['/assets/data/level1.json']});
          // Q.stage().pause();
          // Q.stage().unpause();
          
        } 
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

function nextLevel(){
  console.log('NEXT LEVEL');

  Q.stageScene("nextLevel",1, { label: "LEVEL COMPLETED!" });

  Q.scene('nextLevel',function(stage) {
    var container = stage.insert(new Q.UI.Container({
      x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
    }));

    var nextLevelButton = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
                                                    label: "Next Level" }))         
    var label = container.insert(new Q.UI.Text({x:10, y: -10 - nextLevelButton.p.h, fill: "#FFFFFF", 
                                                     label: stage.options.label }));
    nextLevelButton.on("click",function() {
      alert("test");
      Q.stageScene("level", {levelData: Q.assets[this.p.levelData.nextLevel] });
    });
    container.fit(20);
  });
  // pauseGame();
};

function endGame(){
  console.log('YOU WON!');
  
  Q.stageScene("endGame",1, { label: "You Have Won The Game!" });

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
  // pauseGame();
};

function pauseGame(){
  Q.stage().pause()
};