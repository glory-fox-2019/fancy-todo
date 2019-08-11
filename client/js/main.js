const baseUrl = "http://localhost:3000";

$(document).ready(function() {

  showLoginPage();
  const token = localStorage.getItem('token');
  if (token) {
    showDashboardPage(token);
  }

  $('#btn-login-to-register').on('click', function() {
    $('#login-right').hide();
    $('#register-right').show();
    $('#login-left').hide();
    $('#register-left').show();
  })

  $('#btn-register-to-login').on('click', function() {
    $('#login-right').show();
    $('#register-right').hide();
    $('#login-left').show();
    $('#register-left').hide();
  })

  $('#btn-login').on('click', () => {
    const username = $('input[name="loginUsername"]').val();
    const password = $('input[name="loginPassword"]').val();
    $.ajax({
      method: "POST",
      url: `${baseUrl}/user`,
      data: { username, password }
    })
    .done(function(res) {
      $('#login-register').hide();
      $('#dashboard').show();
      localStorage.setItem('token', res.token);
      showDashboardPage(res.token);
    })
    .fail(function(req, status, err) {
      if (status === 'error') {
        // alert('goblok')
        console.log(req, status, err);
      }
    })
  })

  $('#logout').on('click', function() {
    signOut();
    localStorage.clear();
  })

})