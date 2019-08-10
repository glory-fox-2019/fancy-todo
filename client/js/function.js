function signOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    showLoginPage();
  });
}

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: "POST",
    url: `${baseUrl}/user/google`,
    data: { id_token }
  })
  .done(function(res) {
    localStorage.setItem('token', res.token);
    $('#login-register').hide();
    $('#dashboard').show();
  })
  .fail(function(err) {
    console.log(err, '<<<<<<<<<<<<<<<<< error');
  })
}

function showLoginPage() {
  $('#login-register').show();
  $('#dashboard').hide();
  $('#register-right').hide();
  $('#register-left').hide();
}

function showDashboardPage() {

}