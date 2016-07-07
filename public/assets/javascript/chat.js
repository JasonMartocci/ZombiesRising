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
        // console.log('Enemies chat assets with sessionId: ' + enemiesAssets);
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
        // console.log('Heroes chat assets with sessionId: ' + heroesAssets);
        characterAssets.push(heroesAssets);        
        characterAssetsString = characterAssets.join(" ");
        $('<a class="thumb" href="#"><img width="120" height="120" src=' + heroesAssets + ' alt=' + heroesData[i].plantTypes + '><span class="characterPop"><img height="112" src=' + heroesAssets + ' alt=' + heroesData[i].plantTypes + '><h3>' + heroesData[i].plantTypes + '</h3> Cost: ' + heroesData[i].cost + '<br> Energy: ' + heroesData[i].energy + '<br> Money Maker: ' + heroesData[i].isSunProducer + '<br> Shooter: ' + heroesData[i].isShooter + '<br> Exploding: ' + heroesData[i].isExploding + '</span>').addClass('heroesImg').appendTo($('#yourHeroes'));
      }
    }
  });

  $.ajax({
    url: '/api/users/',
    method: 'get',
    success: function(data){
      var characterAssets = [];
      var characterAssetsString = '';
      for(var i = 0; i < data.users.length; i++) {
        var usersData = data.users;
        // console.log(usersData);
        var usersAssets = 'http://s3.amazonaws.com/zombiesrising/' + usersData[i].userId;
        // console.log('Users chat assets with sessionId: ' + usersAssets);
        characterAssets.push(usersAssets);        
        characterAssetsString = characterAssets.join(" ");
      }
    }
  });

  $.ajax({
    url: '/api/user/',
    method: 'get',
    success: function(data){
      var characterAssets = [];
      var characterAssetsString = '';
      for(var i = 0; i < data.users.length; i++) {
        var usersData = data.users;
        // console.log(usersData);
        var usersAssets = 'http://s3.amazonaws.com/zombiesrising/' + usersData[i].userId;
        // console.log('USER chat assets with sessionId: ' + usersAssets);
        characterAssets.push(usersAssets);        
        characterAssetsString = characterAssets.join(" ");
        $('<div><h4>Welcome ' + usersData[i].userName + '</h4>Email: ' + usersData[i].emailAddress + '<br>User Id: ' + usersData[i].userId + '<br>Role: ' + usersData[i].role + '</div>').appendTo($('#yourUserInfo'));
        $('<div><span class="st_sharethis_large" st_image="http://zombiesrising.herokuapp.com/assets/images/logo.png" st_title="Check out this game I created: http://zombiesrising.herokuapp.com/game/' + usersData[i].userId + '" st_url="http://zombiesrising.herokuapp.com/game/' + usersData[i].userId + '" displayText="ShareThis"></span><span class="st_facebook_large" st_image="http://zombiesrising.herokuapp.com/assets/images/logo.png" st_title="Check out this game I created: http://zombiesrising.herokuapp.com/game/' + usersData[i].userId + '" st_url="http://zombiesrising.herokuapp.com/game/' + usersData[i].userId + '" displayText="Facebook"></span><span class="st_twitter_large" st_image="http://zombiesrising.herokuapp.com/assets/images/logo.png" st_title="Check out this game I created: http://zombiesrising.herokuapp.com/game/' + usersData[i].userId + '" st_url="http://zombiesrising.herokuapp.com/game/' + usersData[i].userId + '" displayText="Tweet"></span><span class="st_linkedin_large" st_image="http://zombiesrising.herokuapp.com/assets/images/logo.png" st_title="Check out this game I created: http://zombiesrising.herokuapp.com/game/' + usersData[i].userId + '" st_url="http://zombiesrising.herokuapp.com/game/' + usersData[i].userId + '" displayText="LinkedIn"></span><span class="st_email_large" st_image="http://zombiesrising.herokuapp.com/assets/images/logo.png" st_title="Check out this game I created: http://zombiesrising.herokuapp.com/game/' + usersData[i].userId + '" st_url="http://zombiesrising.herokuapp.com/game/' + usersData[i].userId + '" displayText="Email"></span></div>').appendTo($('.shareYourGame'));
        $('<div><input type="hidden" id="nameInput" value="' + usersData[i].userName + '"></div>').appendTo($('.chatBoard'));
      }
    }
  });

  // Chat feature
  var rootRef = new Firebase('https://vivid-torch-7282.firebaseio.com/chat');

// // delete record when a tag is clicked
// jQuery('body').on('click', 'a', function() {
//    var $rec = $(this).closest('[data-id]');
//     var id = $rec.attr('data-id') || null;
//     if( id ) {
//        // remove any nested children
//        $rec.find('[data-id]').each(function() {
//           rootRef.child($(this).attr('data-id')).remove(); 
//        });
       
//        // remove the record
//        rootRef.child(id).remove();
//     }
//     return false;
// });

// add new records at the appropriate level when a button is clicked
jQuery('body').on('click', 'button', function () {
    var $input = $(this).prev('input');
    var title = $input.val();
    var parent = $input.closest('[data-id]').attr('data-id') || null;
    console.log('creating', parent, title);
    if (title) {
        rootRef.push({ 'title': title, 'parent': parent });
    }
    $input.val('');
    return false;
})

rootRef.on('child_added', function (snapshot) {
    var message = snapshot.val();
    console.log('child_added', message);
    displayTitleMessage(snapshot.key(), message.title, message.parent);
});

rootRef.on('child_removed', function(snapshot) {
    $('#records').find('[data-id="'+snapshot.key()+'"]').remove();
});

function displayTitleMessage(id, title, parentId) {
    var $parent = parentId ? findParent(parentId) : $('#records');
    var $el = makeListItem(title);
    console.log('displaying', id, parentId, $parent, title);
    // add a data-parent attribute, which we use to locate parent elements
    $el.appendTo($parent).attr('data-id', id);
}

function findParent(parentId) {
    return $('#records').find('[data-id="' + parentId + '"] > ul');
}

function makeListItem(title) {
    return $('#recordTemplate').clone()
    // remove the id attr
    .attr('id', null)
    // enter the <span> tag and use .text() to escape title
    .find('span').text(title)
    // navigate back to the cloned element and return it
    .end();
}

});