Quintus.ZombiesGUI = function(Q) {
    
    //side panel that shows stats and holds buttons
    Q.UI.Container.extend('SidePanel', {
      init: function(p) {
        this._super(Q._defaults(p, {
          fill: '#555756',
          x: 145/2,
          y: 768/2,
          radius: 0,
          border: 0,
          shadow: 0,
          w: 145,
          h: 768,
        }));

        this.on('inserted');

        //update sun stats when player sun changes
        Q.state.on('change.sun', function() {
          Q('SidePanel',0).items[0].refreshStats();
        });
      },
      //this is executed after the object is inserted in the stage
      inserted: function() {  
        //now we can access the stage with this.stage
        this.stage.insert(new Q.Sprite({
          asset: '/assets/images/sun.png',
          x: 42,
          y: 40
        }));

        this.totalSun = this.stage.insert(new Q.UI.Text({
          x: 105,
          y: 40,
          label: '100'
        }));

        //start showing the correct stats
        this.refreshStats();

        //insert plant type buttons
        var x = 72, y = 120, plantObject;
        Q._each(this.p.plantTypes, function(element, index, list) {
          plantObject = Q.plantTypes[element];
          this.stage.insert(new Q.Sprite({
            asset: '/assets/images/buttonBg1.png',
            x: x,
            y: y
          }));
          this.stage.insert(new Q.PlantButton({x: x-15, y: y, asset: plantObject.asset, plant: plantObject}));
          this.stage.insert(new Q.UI.Text({x: x+20, y: y+21, label: plantObject.cost+''}));
          y += 90;
        }, this);
      },
      //you could have other game stats here
      refreshStats: function() {
        this.totalSun.p.label = Q.state.get('sun') + '';
      }
    });    
    
    Q.UI.Button.extend("PlantButton", {
      init: function(p) {
        this._super(Q._defaults(p, {
          scale: 0.6
        }), function() {

          var plantButtons = Q("PlantButton", 0).items;
          Q._each(plantButtons, function(element, index, list){
            element.trigger("unselected");
          }, this);

          this.p.opacity = 0.5;
          Q.state.set("currentPlant", this.p.plant);
        });

        this.on("unselected", function() {
          this.p.opacity = 1;
        });
      } 
    });
};