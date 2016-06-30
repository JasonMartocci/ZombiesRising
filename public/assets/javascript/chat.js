$(document).ready(function(Q) {
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
        $('<a class="thumb" href="#"><img width="120" height="120" src=' + enemiesAssets + ' alt=' + enemiesData[i].plantTypes + '><span class="characterPop"><img height="112" src=' + enemiesAssets + ' alt=' + enemiesData[i].zombieTypes + '><h3>' + enemiesData[i].zombieTypes + '</h3> Damage: ' + enemiesData[i].damage + '<br> Zombie Speed - Lower Faster: ' + enemiesData[i].vx + '<br> Energy: ' + enemiesData[i].energy + '</span>').addClass('enemiesImg').appendTo($('#yourEnemies'));
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
        $('<a class="thumb" href="#"><img width="120" height="120" src=' + heroesAssets + ' alt=' + heroesData[i].plantTypes + '><span class="characterPop"><img height="112" src=' + heroesAssets + ' alt=' + heroesData[i].plantTypes + '><h3>' + heroesData[i].plantTypes + '</h3> Cost: ' + heroesData[i].cost + '<br> Energy: ' + heroesData[i].energy + '<br> Money Maker: ' + heroesData[i].isSunProducer + '<br> Shooter: ' + heroesData[i].isShooter + '<br> Exploding: ' + heroesData[i].isExploding + '</span>').addClass('heroesImg').appendTo($('#yourHeroes'));
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