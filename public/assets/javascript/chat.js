$(document).ready(function(Q) {
// Get the modal
var modal = document.getElementById('myModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById('myImg');
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
    modal.style.display = "block";
    modalImg.src = this.src;
    modalImg.alt = this.alt;
    captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
}

  $.ajax({
    url: '/api/enemies/',
    method: 'get',
    success: function(data){
      var characterAssets = [];
      var characterAssetsString = '';
      for(var i = 0; i < data.enemies.length; i++) {
        var enemiesData = data.enemies;
        var enemiesAssets = 'http://s3.amazonaws.com/zombiesrising/' + enemiesData[i].asset;
        console.log('Enemies chat assets with sessionId: ' + enemiesAssets);
        characterAssets.push(enemiesAssets);        
        characterAssetsString = characterAssets.join(" ");
        $('<img src=' + enemiesAssets + ' alt=' + enemiesData[i].zombieTypes + '>').addClass('enemiesImg').appendTo($('#yourEnemies'));
      }
    }
  });

  $.ajax({
    url: '/api/heroes/',
    method: 'get',
    success: function(data){
      var characterAssets = [];
      var characterAssetsString = '';
      for(var i = 0; i < data.heroes.length; i++) {
        var heroesData = data.heroes;
        var heroesAssets = 'http://s3.amazonaws.com/zombiesrising/' + heroesData[i].asset;
        console.log('Heroes chat assets with sessionId: ' + heroesAssets);
        characterAssets.push(heroesAssets);        
        characterAssetsString = characterAssets.join(" ");
        $('<img src=' + heroesAssets + ' alt=' + heroesData[i].plantTypes + '>').addClass('heroesImg').appendTo($('#yourHeroes'));
      }
    }
  });

  Q.userName = {};

  $.ajax({
    url: '/api/users/',
    method: 'get',
    success: function(data){
      for(var i = 0; i < data.users.length; i++) {
        var usersData = data.users;
        var usersTypes = usersData[i]['userName'];
        var usersAssets = {
          'userId': usersData[i].userId
        };
        Q.userName[usersTypes] = usersAssets;
      }
      console.log(usersData);
    }
  });

  // Chat feature
  var myDataRef = new Firebase('https://vivid-torch-7282.firebaseio.com/chat');

  // Chat box add data on keypress
  $('#messageInput').keypress(function (e) {
    if (e.keyCode == 13) {
      var name = $('#nameInput').val();
      var text = $('#messageInput').val();
      myDataRef.push({name: name, text: text});
      $('#messageInput').val('');
    }
  });

  myDataRef.on('child_added', function(snapshot) {
    var message = snapshot.val();
    displayChatMessage(message.name, message.text);
  });

  function displayChatMessage(name, text) {
    $('<div/>').addClass('chatMsg').text(text).prepend($('<em/>').text(name+': ')).prependTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
  }; 
});