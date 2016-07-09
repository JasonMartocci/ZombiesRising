// mozfullscreenerror event handler
function errorHandler() {
   alert('mozfullscreenerror');
}
document.documentElement.addEventListener('mozfullscreenerror', errorHandler, false);

// toggle full screen
function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
  $('#fullscreenToggle').hide();
  // document.location.reload();
}

// keydown event handler
document.addEventListener('keydown', function(e) {
  if (e.keyCode == 13 || e.keyCode == 70) { // F or Enter key
    toggleFullScreen();
  }
}, false);

$(document).ready(function() {
  /**
 *
 * javascript full-screen window technology - fullscreen mode
 *
 * Copyright 2013, Dhiraj kumar
 * http://www.css-jquery-design.com/
 */


// (function () {
//     var viewFullScreen = document.getElementById("view-fullscreen");
//     if (viewFullScreen) {
//         viewFullScreen.addEventListener("click", function () {
//             var docElm = document.documentElement;
//             if (docElm.requestFullscreen) {
//                 docElm.requestFullscreen();
//                 // window.location.reload();
//                 $('#view-fullscreen').hide();
//             }
//             else if (docElm.msRequestFullscreen) {
//                 docElm.msRequestFullscreen();
//                 // window.location.reload();
//                 $('#view-fullscreen').hide();
//             }
//             else if (docElm.mozRequestFullScreen) {
//                 docElm.mozRequestFullScreen();
//                 // window.location.reload();
//                 $('#view-fullscreen').hide();
//             }
//             else if (docElm.webkitRequestFullScreen) {
//                 docElm.webkitRequestFullScreen();
//                 // window.location.reload();
//                 $('#view-fullscreen').hide();
//             }
//         }, false);

//         function hideshow() {
//             document.getElementById('fullscreenButton').style.display = 'block'; 
//             this.style.display = 'none'
//         } 
//     }

//     var cancelFullScreen = document.getElementById("cancel-fullscreen");
//     if (cancelFullScreen) {
//         cancelFullScreen.addEventListener("click", function () {
//             if (document.exitFullscreen) {
//                 document.exitFullscreen();
//             }
//             else if (document.msExitFullscreen) {
//                 document.msExitFullscreen();
//             }
//             else if (document.mozCancelFullScreen) {
//                 document.mozCancelFullScreen();
//             }
//             else if (document.webkitCancelFullScreen) {
//                 document.webkitCancelFullScreen();
//             }
//         }, false);
//     }


//     var fullscreenState = document.getElementById("fullscreen-state");
//     if (fullscreenState) {
//         document.addEventListener("fullscreenchange", function () {
//             fullscreenState.innerHTML = (document.fullscreenElement)? "" : "not ";
//         }, false);
        
//         document.addEventListener("msfullscreenchange", function () {
//             fullscreenState.innerHTML = (document.msFullscreenElement)? "" : "not ";
//         }, false);
        
//         document.addEventListener("mozfullscreenchange", function () {
//             fullscreenState.innerHTML = (document.mozFullScreen)? "" : "not ";
//         }, false);
        
//         document.addEventListener("webkitfullscreenchange", function () {
//             fullscreenState.innerHTML = (document.webkitIsFullScreen)? "" : "not ";
//         }, false);
//     }

//     var marioVideo = document.getElementById("mario-video")
//         videoFullscreen = document.getElementById("video-fullscreen");

//     if (marioVideo && videoFullscreen) {
//         videoFullscreen.addEventListener("click", function (evt) {
//             if (marioVideo.requestFullscreen) {
//                 marioVideo.requestFullscreen();
//             }
//             else if (marioVideo.msRequestFullscreen) {
//                 marioVideo.msRequestFullscreen();
//             }
//             else if (marioVideo.mozRequestFullScreen) {
//                 marioVideo.mozRequestFullScreen();
//             }
//             else if (marioVideo.webkitRequestFullScreen) {
//                 marioVideo.webkitRequestFullScreen();
//                 /*
//                     *Kept here for reference: keyboard support in full screen
//                     * marioVideo.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
//                 */
//             }
//         }, false);
//     }
// })();


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