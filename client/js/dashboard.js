$(document).ready(function() {

  $('.logout-btn').on('click', function() {
    signOut();
    localStorage.clear();
  })



})