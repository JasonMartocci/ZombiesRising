$(document).ready(function(Q) {
  // Q.zombieTypes = {};

  // $.ajax({
  //   url: '/api/enemies/',
  //   method: 'get',
  //   success: function(data){
  //     for(var i = 0; i < data.enemies.length; i++) {
  //       var enemiesData = data.enemies;
  //       var enemiesTypes = enemiesData[i]['zombieTypes'];
  //       var enemiesAssets = {
  //         'asset': 'http://s3.amazonaws.com/zombiesrising/' + enemiesData[i].asset,
  //         'damage': enemiesData[i].damage,
  //         'vx': enemiesData[i].vx,
  //         'energy': enemiesData[i].energy
  //       };
  //       Q.zombieTypes[enemiesTypes] = enemiesAssets;
  //     }
  //     console.log(enemiesData);
  //   }
  // }); 

  $.ajax({
    url: '/api/enemies/',
    method: 'get',
    success: function(data){
      var characterAssets = [];
      var characterAssetsString = '';
      for(var i = 0; i < data.enemies.length; i++) {
        var enemiesData = data.enemies;
        var enemiesAssets = 'http://s3.amazonaws.com/zombiesrising/' + enemiesData[i].asset + ', ';
        console.log('Enemies assets with sessionId: ' + enemiesAssets);
        characterAssets.push(enemiesAssets);        
        characterAssetsString = characterAssets.join(" ");
      }
    }
  });

  Q.plantTypes = {};

  $.ajax({
    url: '/api/heroes/',
    method: 'get',
    success: function(data){
      for(var i = 0; i < data.heroes.length; i++) {
        var heroesData = data.heroes;
        var heroesTypes = heroesData[i]['plantTypes'];
        var heroesAssets = {
          'asset': 'http://s3.amazonaws.com/zombiesrising/' + heroesData[i].asset,
          'cost': heroesData[i].cost,
          'energy': heroesData[i].energy,
          'isShooter': heroesData[i].isShooter,
          'shootingFrequency': heroesData[i].shootingFrequency,
          'damage': heroesData[i].damage,
          'isExploding': heroesData[i].isExploding,
          'isSunProducer': heroesData[i].isSunProducer,
          'sunFrequency': heroesData[i].sunFrequency
        };
        Q.plantTypes[heroesTypes] = heroesAssets;
      }
      console.log(heroesData);
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