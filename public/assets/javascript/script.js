$(document).ready(function() {
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
});
  function outputUpdate(vol) {
    document.querySelector('#volume').value = vol;
  }