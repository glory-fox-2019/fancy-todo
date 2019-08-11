function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token
  const request = $.ajax({
    url : "http://localhost:3000/user/signinGoogle",
    type : "POST",
    headers : {
      token : id_token
    }
  })
  request.done( function(result) {
    localStorage.setItem("token", result.token)
    renderTodos()
  })
  request.fail(function(jqXHR, textStatus) {
    $("#signupButton").prop("disabled", false)
    $("#signupButton").html("Signup")
    if(jqXHR.status === 400 || jqXHR.status === 403 || jqXHR.status === 404) {
      for(let i=0;i<jqXHR.responseJSON.message.length;i++) {
        signupErrorList.append(`
          <div class="alert alert-danger" role="alert">
            ${jqXHR.responseJSON.message[i]}
          </div>`)
      }
    }
  })
}
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}