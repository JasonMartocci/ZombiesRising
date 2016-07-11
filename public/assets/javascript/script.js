$(document).ready(function() {
  
  // DataTables for inventory management
  $('#inventory').DataTable();
  $('#enemies').DataTable();
  $('#heroes').DataTable();
  $("#register").hide();

  $("#register_btn").click(function(){
      $("#sign_in").hide();
      $("#register").show();
  });

  $("#signIn_btn").click(function(){
      $("#sign_in").show();
      $("#register").hide();
  });

  var _URL = window.URL || window.webkitURL;

  $("#heroes-file-input").change(function(e) {
      var file, img;
      if ((file = this.files[0])) {
        img = new Image();
        img.onload = function() {
          if (this.height > 125){
            swal("Oops...", "Your image is too tall, max height 125px please.", "error");
            // alert("This is to tall");
            $('#heroes-file-input').val('');
          }
        };
        img.onerror = function() {
          swal("Oops...", "Not a valid file: " + file.type, "error");
        };
        img.src = _URL.createObjectURL(file);
      }
  });

  $("#newHeroes-file-input").change(function(e) {
      var file, img;
      if ((file = this.files[0])) {
        img = new Image();
        img.onload = function() {
          if (this.height > 125){
            swal("Oops...", "Your image is too tall, max height 125px please.", "error");
            // alert("This is to tall");
            $('#newHeroes-file-input').val('');
          }
        };
        img.onerror = function() {
          swal("Oops...", "Not a valid file: " + file.type, "error");
        };
        img.src = _URL.createObjectURL(file);
      }
  });

  $("#enemies-file-input").change(function(e) {
      var file, img;
      if ((file = this.files[0])) {
        img = new Image();
        img.onload = function() {
          if (this.height > 224){
            swal("Oops...", "Your image is too tall, max height 224px please.", "error");
            // alert("This is to tall");
            $('#enemies-file-input').val('');
          }
        };
        img.onerror = function() {
          swal("Oops...", "Not a valid file: " + file.type, "error");
        };
        img.src = _URL.createObjectURL(file);
      }
  });

  $("#newEnemies-file-input").change(function(e) {
      var file, img;
      if ((file = this.files[0])) {
        img = new Image();
        img.onload = function() {
          if (this.height > 224){
            swal("Oops...", "Your image is too tall, max height 224px please.", "error");
            // alert("This is to tall");
            $('#newEnemies-file-input').val('');
          }
        };
        img.onerror = function() {
          swal("Oops...", "Not a valid file: " + file.type, "error");
        };
        img.src = _URL.createObjectURL(file);
      }
  });
});