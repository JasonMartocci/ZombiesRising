$(document).ready(function() {
(function () {
    var viewFullScreen = document.getElementById("view-fullscreen");
    if (viewFullScreen) {
        viewFullScreen.addEventListener("click", function () {
            var docElm = document.documentElement;
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            }
            else if (docElm.msRequestFullscreen) {
                docElm.msRequestFullscreen();
            }
            else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            }
            else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            }
        }, false);

        function hideshow() {
            document.getElementById('fullscreenButton').style.display = 'block'; 
            this.style.display = 'none'
        } 
    }

    var cancelFullScreen = document.getElementById("cancel-fullscreen");
    if (cancelFullScreen) {
        cancelFullScreen.addEventListener("click", function () {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }, false);
    }


    var fullscreenState = document.getElementById("fullscreen-state");
    if (fullscreenState) {
        document.addEventListener("fullscreenchange", function () {
            fullscreenState.innerHTML = (document.fullscreenElement)? "" : "not ";
        }, false);
        
        document.addEventListener("msfullscreenchange", function () {
            fullscreenState.innerHTML = (document.msFullscreenElement)? "" : "not ";
        }, false);
        
        document.addEventListener("mozfullscreenchange", function () {
            fullscreenState.innerHTML = (document.mozFullScreen)? "" : "not ";
        }, false);
        
        document.addEventListener("webkitfullscreenchange", function () {
            fullscreenState.innerHTML = (document.webkitIsFullScreen)? "" : "not ";
        }, false);
    }

    var marioVideo = document.getElementById("mario-video")
        videoFullscreen = document.getElementById("video-fullscreen");

    if (marioVideo && videoFullscreen) {
        videoFullscreen.addEventListener("click", function (evt) {
            if (marioVideo.requestFullscreen) {
                marioVideo.requestFullscreen();
            }
            else if (marioVideo.msRequestFullscreen) {
                marioVideo.msRequestFullscreen();
            }
            else if (marioVideo.mozRequestFullScreen) {
                marioVideo.mozRequestFullScreen();
            }
            else if (marioVideo.webkitRequestFullScreen) {
                marioVideo.webkitRequestFullScreen();
                /*
                    *Kept here for reference: keyboard support in full screen
                    * marioVideo.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                */
            }
        }, false);
    }
})();


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
            }else{
            }
        };
        img.onerror = function() {
            alert( "not a valid file: " + file.type);
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
            }else{
            }
        };
        img.onerror = function() {
            alert( "not a valid file: " + file.type);
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
            }else{
            }
        };
        img.onerror = function() {
            alert( "not a valid file: " + file.type);
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
            }else{
            }
        };
        img.onerror = function() {
            alert( "not a valid file: " + file.type);
        };
        img.src = _URL.createObjectURL(file);
      }
  });
});