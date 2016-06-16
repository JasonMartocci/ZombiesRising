window.addEventListener("load",function() {
  var Q = window.Q = Quintus({development: true})
    .include('Sprites, Scenes, 2D, UI, Input, Touch, Audio')
    .include('ZombiesEnemies, ZombiesGUI, ZombiesHeroes, ZombiesGameplay')
    .setup({ 
      width: 1317,
      height: 720,
      scaleToFit: true
      // maximize: true 
    })
    
  //enable sound  , this will find the best way to play audio according to the device 
  Q.enableSound();

  //turn off gravity
  Q.gravityY = 0;
  Q.gravityX = 0;

  //constants
  Q.SPRITE_SUN = 2;
  Q.SPRITE_ZOMBIE = 4;
  Q.SPRITE_PLANT = 8;
  Q.SPRITE_BULLET = 16;
  Q.SPRITE_GROUND = 32;
  Q.SPRITE_UI = 64;

  //enable touch
  Q.touch(Q.SPRITE_UI | Q.SPRITE_SUN | Q.SPRITE_GROUND);    

  Q.scene('level', function(stage) {
    var level = new Q.Level({levelData: stage.options['levelData']});               
    stage.insert(level);
   
    //insert side panel
    var sidePanel = new Q.SidePanel({
      plantTypes: stage.options['levelData']['availablePlants']
    });
    stage.insert(sidePanel);
  });

$.ajax({
    url: '/api/enemies',
    method: 'get',
    success: function(data){
      for(var i = 0; i < data.enemies.length; i++) {
        var enemiesData = data.enemies;
        var characterAssets = enemiesData[i].asset + ', ';
        console.log(characterAssets);
        //load assets
        Q.load(characterAssets + '/assets/audio/ZombiesOnYourLawn.mp3, /assets/images/scoreBoard.png, /assets/audio/Homer_Mmmm_donuts.mp3, /assets/images/background.png, /assets/images/buttonBg1.png, /assets/images/sun.png, /assets/images/bullet.png, /assets/data/level1.json, /assets/data/level2.json, /assets/audio/boom.mp3, /assets/audio/hit.mp3', function() {
            Q.state.reset({sun: 200, currentPlant: null});
            Q.stageScene('level', {levelData: Q.assets['/assets/data/level1.json']});  
            Q.stageScene("sun",1);                
        },
        {
          progressCallback: function(loaded,total) {
            var element = document.getElementById("loading_progress");
            element.style.width = Math.floor(loaded/total*100) + "%";
          }
        });
      }
    }
  });
$.ajax({
    url: '/api/heroes',
    method: 'get',
    success: function(data){
      for(var i = 0; i < data.heroes.length; i++) {
        var heroesData = data.heroes;
        var characterAssets = heroesData[i].asset + ', ';
        console.log(characterAssets);
        //load assets
        Q.load(characterAssets + '/assets/audio/ZombiesOnYourLawn.mp3, /assets/images/scoreBoard.png, /assets/audio/Homer_Mmmm_donuts.mp3, /assets/images/background.png, /assets/images/buttonBg1.png, /assets/images/sun.png, /assets/images/bullet.png, /assets/data/level1.json, /assets/data/level2.json, /assets/audio/boom.mp3, /assets/audio/hit.mp3');
      }
    }
  });
console.log(Q.load);
});
