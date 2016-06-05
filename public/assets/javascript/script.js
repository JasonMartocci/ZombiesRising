window.addEventListener("load",function() {
  var Q = window.Q = Quintus({development: true})
    .include('Sprites, Scenes, 2D, UI, Input, Touch, Audio')
    .include('ZombiesEnemies, ZombiesGUI, ZombiesPlants, ZombiesGameplay')
    .setup({
        width: 1080,
        height: 720,
        maximize: true,
        scaleToFit: true
    });

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

  //load assets
  Q.load('/assets/images/background.png, /assets/images/sun.png, /assets/images/zombie1.png, /assets/images/zombie2.png, /assets/images/chicken.png, /assets/images/zombie3.png, /assets/images/carnivorousplant.png, /assets/images/corn.png, /assets/images/chilli.png, /assets/images/sunflower.png, /assets/images/bullet.png, /assets/data/level1.json, /assets/data/level2.json, /assets/audio/boom.mp3, /assets/audio/collect.mp3, /assets/audio/hit.mp3', function() {
      Q.state.reset({sun: 200, currentPlant: null});
      Q.stageScene('level', {levelData: Q.assets['/assets/data/level1.json']});  
      Q.stageScene("sun",1);                
  });
});